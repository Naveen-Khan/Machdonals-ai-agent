import "./globals.css";

export const metadata = {
  title: "machdonals — AI Customer Support",
  description:
    "machdonals AI-powered customer support chatbot. Order food, track deliveries, browse the menu, and get instant help 24/7.",
  keywords: [
    "McDonald's",
    "machdonals",
    "chatbot",
    "AI support",
    "order food",
    "n8n",
  ],
  openGraph: {
title: "machdonals — AI Customer Support",
    description:
      "AI-powered customer support chatbot for machdonals restaurant. Order, track, and get help instantly.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
