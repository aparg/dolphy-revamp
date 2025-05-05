"use client";

import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-EXF0Z8ZNFH"
        onError={(err) => {
          console.error("Error loading Google Analytics script", err);
        }}
        onLoad={() => {
          console.log("Google Analytics script loaded successfully");
        }}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EXF0Z8ZNFH');
          `,
        }}
        onError={(err) => {
          console.error("Error executing Google Analytics inline script", err);
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
