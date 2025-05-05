"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 5;

const SearchBar = ({
  width = "w-[700px]",
  className,
  padding = "py-4",
  shadow = "shadow-none",
}) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState({
    cities: [],
    projects: [],
    developers: [],
  });
  const [loading, setLoading] = React.useState(false);
  const commandRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [recentSearches, setRecentSearches] = React.useState([]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (commandRef.current && !commandRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedSearch) {
        setSearchResults({ cities: [], projects: [], developers: [] });
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://admin.dolphy.ca/api/search/?q=${encodeURIComponent(
            debouncedSearch
          )}`
        );
        const data = await response.json();
        console.log("Search API response:", data);
        console.log("Projects from API:", data.projects);

        // Transform projects to ensure they have the right properties
        const transformedData = {
          ...data,
          projects: data.projects?.map((project) => ({
            ...project,
            slug: project.slug || project.project_slug,
            city_name: project.city_name || project.city?.name,
          })),
        };
        console.log("Transformed projects:", transformedData.projects);
        setSearchResults(transformedData);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  React.useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const handleSelect = (value, item) => {
    setOpen(false);
    console.log("Selected:", value, item);

    if (value.startsWith("city-")) {
      const city = value.replace("city-", "");
      router.push(`/${city.split(",")[0].toLowerCase()}`);
    } else if (value.startsWith("project-")) {
      if (item && item.city && item.slug) {
        const citySlug = item.city.toLowerCase();
        console.log("Navigating to:", `/${citySlug}/${item.slug}`);
        router.push(`/${citySlug}/${item.slug}`);
      } else {
        console.error("Missing project data:", item);
      }
    } else if (value.startsWith("developer-")) {
      router.push(`/developers/${item.slug}`);
    }
  };

  return (
    <div
      className={cn(
        "relative bg-white overflow-hidden mx-auto rounded-xl",
        width,
        className
      )}
      ref={commandRef}
    >
      <Command
        className={cn(
          "rounded-xl border border-black focus-within:shadow-none",
          shadow
        )}
      >
        <div className="w-full">
          <CommandInput
            placeholder="search by city, project name, or developer..."
            className={cn(
              "w-full placeholder:text-center placeholder:text-xs placeholder:text-gray-500 rounded-xl cmd-input",
              padding
            )}
            onFocus={() => setOpen(true)}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </div>
        {open && (
          <CommandList
            className={cn(
              "absolute w-full bg-white rounded-xl border-x border-b top-[96%]",
              "left-0 shadow-lg mt-[7px] z-[100] max-h-[300px] overflow-y-auto",
              "min-w-[250px]"
            )}
          >
            {loading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Loading...
              </div>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>

                {searchResults.cities?.length > 0 && (
                  <CommandGroup heading="Cities" className="text-start">
                    {searchResults.cities.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={`city-${item.name}`}
                        className="flex flex-col items-start p-2"
                        onSelect={(value) => handleSelect(value, item)}
                      >
                        <div className="flex items-start gap-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {searchResults.projects?.length > 0 && (
                  <CommandGroup heading="Projects" className="text-start">
                    {searchResults.projects.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={`project-${item.project_name || item.name}`}
                        className="flex flex-col items-start p-2"
                        onSelect={(value) => handleSelect(value, item)}
                      >
                        <div className="flex items-start gap-2">
                          <span>{item.icon}</span>
                          <span>{item.project_name || item.name}</span>
                        </div>
                        {item.city_name && (
                          <span className="text-xs text-gray-500 mt-1">
                            {item.city_name}
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {searchResults.developers?.length > 0 && (
                  <CommandGroup heading="Developers" className="text-start">
                    {searchResults.developers.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={`developer-${item.name}`}
                        className="flex flex-col items-start p-2"
                        onSelect={(value) => handleSelect(value, item)}
                      >
                        <div className="flex items-start gap-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
