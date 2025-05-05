"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userListings, setUserListings] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      // Fetch user's listings and saved searches
      const fetchUserData = async () => {
        try {
          // Replace with your actual API endpoints
          const listingsResponse = await fetch("/api/user/listings");
          const searchesResponse = await fetch("/api/user/saved-searches");

          if (listingsResponse.ok) {
            const listingsData = await listingsResponse.json();
            setUserListings(listingsData);
          }

          if (searchesResponse.ok) {
            const searchesData = await searchesResponse.json();
            setSavedSearches(searchesData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [session]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                User Information
              </h2>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Name:</span> {session.user.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span>{" "}
                  {session.user.email}
                </p>
                {session.user.phone && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span>{" "}
                    {session.user.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User's Bucket of Listings */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">My Listings</h2>
            <Link
              href="/listings/create"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Create New Listing
            </Link>
          </div>

          {userListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userListings.map((listing) => (
                <div
                  key={listing.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{listing.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        listing.status === "active"
                          ? "bg-green-100 text-green-800"
                          : listing.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {listing.description.substring(0, 100)}...
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm font-medium">
                      ${listing.price}
                    </span>
                    <div className="flex space-x-2">
                      <Link
                        href={`/listings/${listing.id}`}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        View
                      </Link>
                      <Link
                        href={`/listings/${listing.id}/edit`}
                        className="text-xs text-gray-600 hover:text-gray-800"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                You haven't created any listings yet.
              </p>
              <Link
                href="/listings/create"
                className="mt-2 inline-block text-blue-600 hover:text-blue-800"
              >
                Create your first listing
              </Link>
            </div>
          )}
        </div>

        {/* Saved Searches */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Saved Searches
          </h2>

          {savedSearches.length > 0 ? (
            <div className="space-y-4">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{search.name}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(search.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {search.location}
                    </p>
                    <p>
                      <span className="font-medium">Price Range:</span> $
                      {search.minPrice} - ${search.maxPrice}
                    </p>
                    {search.filters && (
                      <p>
                        <span className="font-medium">Filters:</span>{" "}
                        {search.filters}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button
                      onClick={() =>
                        router.push(`/search?${search.queryParams}`)
                      }
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Run Search
                    </button>
                    <button
                      onClick={() => {
                        /* Handle delete */
                      }}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                You haven't saved any searches yet.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Save your search criteria to quickly find properties later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
