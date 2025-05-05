"use client";

import { useState } from "react";
import { preconCityList } from "@/data/preconCityList";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchableCitySelect({ value, onValueChange }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value === "All" ? "All Cities" : value}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[410px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value="All"
              onSelect={() => {
                onValueChange("All");
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === "All" ? "opacity-100" : "opacity-0"
                )}
              />
              All Cities
            </CommandItem>
            {preconCityList.map((city) => (
              <CommandItem
                key={city.city_name_cap}
                value={city.city_name_cap}
                onSelect={() => {
                  onValueChange(city.city_name_cap);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === city.city_name_cap ? "opacity-100" : "opacity-0"
                  )}
                />
                {city.city_name_cap}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
