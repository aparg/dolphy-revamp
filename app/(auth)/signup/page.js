import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sign Up | HomeBaba",
  description: "Create your HomeBaba account",
};

export default async function SignupPage() {
  const session = await getServerSession();

  // If the user is already logged in, redirect to the home page
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 items-center">
          {/* Signup Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Link href="/" className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    dolphy
                  </span>
                  <Image
                    src="/canadaleaf.svg"
                    alt="Maple Leaf Icon for Logo"
                    width={20}
                    height={20}
                    className="ml-1"
                  />
                </Link>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Create your account to get started
              </p>
            </div>

            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
