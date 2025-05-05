export const metadata = {
  title: "Privacy Policy - Dolphy",
  description:
    'We respect your privacy and will not collect any personally identifiable information about you (for example, your name, address, telephone number or email address ("personal data") without your express permission. The information about you is sent to us only when you voluntarily submit via contact forms on our website.',
  authors: [{ name: "Dolphy", url: "https://dolphy.ca" }],
  openGraph: {
    title: "Privacy Policy - Dolphy",
    description:
      'We respect your privacy and will not collect any personally identifiable information about you (for example, your name, address, telephone number or email address ("personal data") without your express permission. The information about you is sent to us only when you voluntarily submit via contact forms on our website.',
    url: "https://dolphy.ca/privacy",
    siteName: "Dolphy",
    images: [
      {
        url: "https://dolphy.ca/contact.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://dolphy.ca/privacy",
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}
