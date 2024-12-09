import { UserProvider } from "@/context/UserContext";
import ClientRootLayout from "./childLayout";

const localApi = process.env.API_URL;
const productionApi = process.env.HOST_URL;
const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

export const metadata = {

  metadataBase: new URL(`${apiPoint}`),
  keywords: ["Tour", "Group Tour", "Travel", "Adventure", "Explore", "Book One-way Tour", "Group Tour", "Multiple City Tour"],

  title: {
    default: "TripWay Holidays",
    template: `%s | TripWay Holidays`
  },
  openGraph: {
    description: "Book Tour Next Tripway Holidays",
    images: [''],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {/* Pass metadata as a prop */}
          <ClientRootLayout>
            {children}
          </ClientRootLayout>
        </UserProvider>
      </body>
    </html>
  );
}
