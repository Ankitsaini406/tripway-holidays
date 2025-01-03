import { UserProvider } from "@/context/UserContext";
import ClientRootLayout from "./childLayout";
import FaceBookAnalytics from "./facebookAnalytics";
import GoogleTagManagerAndAnalytics from "./googleAnalytics";

const localApi = process.env.API_URL;
const productionApi = process.env.HOST_URL;
const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

export const metadata = {
  metadataBase: new URL(`${apiPoint}`),
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
    default: "TripWayHoliday: Book One-way | Group Tour | Multi City",
    template: `TripWay Holidays | %s`,
  },
  openGraph: {
    description: "Book Tour Next Tripway Holidays",
    images: [""],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="/favicon.ico" />

        {/* Web App Metadata */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TripWayHolidays : Book One-way | Group Tour | Multi City" />

        {/* OpenGraph Metadata */}
        <meta property="og:title" content="TripWayHolidays : Book One-way | Group Tour | Multi City" />
        <meta
          property="og:description"
          content="Book your next tour with TripWay Holidays and explore amazing destinations!"
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content={apiPoint} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="/favicon.ico" />
        <meta name="twitter:site" content="@tripwayholidays" />
        <meta name="twitter:creator" content="@tripwayholidays" />
        <meta name="twitter:title" content="TripWay Holidays" />
        <meta
          name="twitter:description"
          content="Experience Travel Like Never Before with TripWayHolidays"
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="twitter:url" content="https://x.com/tripwayholidays" />
        <FaceBookAnalytics />
        <GoogleTagManagerAndAnalytics />
      </head>
      <body className="bodyflex">
        <UserProvider>
          <ClientRootLayout>{children}</ClientRootLayout>
        </UserProvider>
      </body>
    </html>
  );
}
