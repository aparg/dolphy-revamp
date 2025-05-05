import React from "react";

const NewsletterSignup = () => {
  return (
    <section className="py-16 bg-red-50 sm:py-20 lg:py-24 mt-[5rem]">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-black sm:text-4xl lg:text-5xl mb-4 text-center">
            Low rise homes for sale in Canada updated hourly
          </h2>
          <p className="text-base font-normal leading-7 text-gray-700 lg:text-lg max-w-2xl mx-auto">
            Subscribe to our free weekly newsletter for the latest
            pre-construction projects, market insights, and exclusive offers
            across Canada.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <form action="#" method="POST" className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="block w-full px-6 py-4 text-base text-gray-700 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:outline-none transition duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-4 text-base font-medium text-white transition-all duration-200 bg-primary-green border border-transparent rounded-xl hover:bg-primary-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
            >
              Subscribe Now
            </button>
          </form>

          <p className="text-sm font-normal text-center text-gray-700">
            Your email is secure and we don't send spam. See our privacy policy.
          </p>
        </div>
        {/* 
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default NewsletterSignup;
