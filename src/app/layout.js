import { UserProvider } from "@/context/UserContext";
import ClientRootLayout from "./childLayout";

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
    default: "TripWay Holidays",
    template: `%s | TripWay Holidays`,
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TripWay Holidays" />

        {/* OpenGraph Metadata */}
        <meta property="og:title" content="TripWay Holidays" />
        <meta
          property="og:description"
          content="Book your next tour with TripWay Holidays and explore amazing destinations!"
        />
        <meta property="og:image" content="/apple-touch-icon.png" />
        <meta property="og:url" content={apiPoint} />
        <meta property="og:type" content="website" />

        {/* Add more metadata if required */}
      </head>
      <body>
        <UserProvider>
          <ClientRootLayout>{children}</ClientRootLayout>
        </UserProvider>
      </body>
    </html>
  );
}
