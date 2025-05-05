import Link from "next/link";

export const metadata = {
  title: "Unauthorized | HomeBaba",
  description: "You are not authorized to access this page",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Unauthorized Access
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            You are not authorized to access this page or your session has
            expired.
          </p>
        </div>

        <div className="mt-6">
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in to continue
          </Link>
        </div>

        <div className="mt-4">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
