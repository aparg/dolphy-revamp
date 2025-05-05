import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Lato, Plus_Jakarta_Sans } from "next/font/google";
import NewsLetter from "@/components/client/NewsLetter";
import NextTopLoader from "nextjs-toploader";
import FloatingContact from "@/components/FloatingContact";
import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import CommunityPopup from "@/components/CommunityPopup";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SessionProvider from "@/components/auth/SessionProvider";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Dolphy - Canada's Leading Pre Construction Homes Platform",
  description:
    "Looking for Pre Construction Homes near Greater Toronto Area, Canada? From Townhomes to Detached and Condos Dolphy offer early access to all best Pre Construction Homes available.",
  icons: {
    icon: "https://dolphy.ca/favicon.ico",
    shortcut: "https://dolphy.ca/favicon-16x16.png",
    apple: "https://dolphy.ca/apple-touch-icon.png",
  },
};

export const viewport = {
  initialScale: 1.0,
  width: "device-width",
  height: "device-height",
  minimumScale: 1.0,
  maximumScale: 1.0,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${lato.className}`}>
        <SessionProvider>
          <Script id="analytics" strategy="afterInteractive">
            {`
              (function() {
                const TRACKING_URL = 'https://analytics.dolphy.ca/api/track/';
                const SITE_ID = 'd0e45564-2d52-4980-89be-5c3859ba1642';
                let visitorId = localStorage.getItem('visitorId');

                function shouldTrack() {
                  return !!localStorage.getItem('visitorId');
                }

                function track(eventType, data) {
                  if (!shouldTrack()) return;
                  const commonData = {
                    visitor_id: visitorId,
                    user_agent: navigator.userAgent,
                    language: navigator.language,
                    screen_resolution: \`\${window.screen.width}x\${window.screen.height}\`,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                  };
                  fetch(TRACKING_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      site_id: SITE_ID,
                      event_type: eventType,
                      ...commonData,
                      ...data
                    })
                  });
                }

                // Track page views for identified users
                function trackPageView() {
                  if (shouldTrack()) {
                    track('Viewed Page', {
                      page_title: document.title,
                      page_url: window.location.href,
                      page_referrer: document.referrer || null
                    });
                  }
                }

                // Track initial page load
                trackPageView();

                // Track page views on route changes (for SPAs)
                let lastUrl = window.location.href;

                // Create a new MutationObserver instance
                const observer = new MutationObserver(function(mutations) {
                  if (window.location.href !== lastUrl) {
                    lastUrl = window.location.href;
                    // Wait for title to be updated
                    setTimeout(trackPageView, 100);
                  }
                });

                // Start observing the document with the configured parameters
                observer.observe(document, {
                  subtree: true,
                  childList: true
                });

                // Track form submissions
                document.addEventListener('submit', function(e) {
                  const form = e.target;
                  const formData = new FormData(form);
                  const data = {};
                  let hasEmail = false;

                  formData.forEach((value, key) => {
                    data[key] = value;
                    if (key === 'email') {
                      hasEmail = true;
                      localStorage.setItem('visitorId', btoa(value));
                      visitorId = btoa(value);
                    }
                  });

                  if (hasEmail) {
                    track('Form Submission', {
                      form_data: data,
                      form_id: form.id || 'unknown',
                      page_url: window.location.href,
                      page_referrer: document.referrer || null
                    });
                  }
                });
              })();
            `}
          </Script>
          <NextTopLoader color="red" height={3} />
          <Navbar />
          <Toaster position="top-center" />
          {children}
          <FloatingContact />
          <NewsLetter />
          <Footer />
          <CommunityPopup />
        </SessionProvider>
      </body>
    </html>
  );
}
