import ResaleCityGrid from "@/components/resale/ResaleCityGrid";
export default function NotFound() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Listing Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the listing you're looking for.
          </p>
          <a
            href="/"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
      <ResaleCityGrid />
    </>
  );
}
