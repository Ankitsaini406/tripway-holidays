import Head from "next/head";
import { UserProvider } from "@/context/UserContext";
import ClientRootLayout from "./childLayout";
import FaceBookAnalytics from "./facebookAnalytics";
import GoogleTagManagerAndAnalytics from "./googleAnalytics";
import SplashScreen from "./SplashScreen";

const apiPoint = process.env.NODE_ENV === "development" ? process.env.API_URL : process.env.HOST_URL;

export const metadata = {
  metadataBase: new URL(apiPoint),
  keywords: [
    "Tour",
    "Group Tour",
    "Travel",
    "Adventure",
    "Explore",
    "Book One-way Tour",
    "Group Tour",
    "Multi City Tour",
  ],
  title: {
    default: "TripWay Holidays: Book One-way | Group Tour | Multi City",
    template: "TripWay Holidays - %s",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    description: "Book your next tour with TripWay Holidays and explore amazing destinations!",
    images: ["/favicon-192.png"],
    url: apiPoint,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tripwayholidays",
    creator: "@tripwayholidays",
    title: "TripWay Holidays: Book One-way | Group Tour | Multi City",
    description: "Experience Travel Like Never Before with TripWayHolidays",
    image: "/favicon-192.png",
    url: apiPoint,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" as="image" href="/favicon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />

        {/* Mobile Web App Settings */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="TripWay Holidays: Book One-way | Group Tour | Multi City"
        />

        {/* OpenGraph Metadata */}
        <meta property="og:title" content={metadata.title.default} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0]} />
        <meta property="og:url" content={apiPoint} />
        <meta property="og:site_name" content="TripWay Holidays: Book One-way | Group Tour | Multi City" />
        <meta property="og:type" content={metadata.openGraph.type} />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <meta name="twitter:url" content={metadata.twitter.url} />

        {/* Analytics */}
        <meta name="google-site-verification" content="yjWbY0fErsHYP4tVk_K97EF-4Ng_kQ2q4QR3Bc0z5oY" />
        <FaceBookAnalytics />
        <GoogleTagManagerAndAnalytics />
      </Head>
      <body className="bodyflex">
        <UserProvider>
          <SplashScreen />
          <ClientRootLayout>{children}</ClientRootLayout>
        </UserProvider>
      </body>
    </html>
  );
}
