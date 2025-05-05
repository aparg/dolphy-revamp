import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Login | Dolphy",
  description: "Login to your Dolphy account",
};

export default async function LoginPage() {
  const session = await getServerSession();

  // If the user is already logged in, redirect to the home page
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 items-center">
          {/* Right side - Login Form */}
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
              <h1 className="text-3xl font-extrabold text-gray-900">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Access your saved searches, favorite properties, and more
              </p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
