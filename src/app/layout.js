import { UserProvider } from "@/context/UserContext";
import ClientRootLayout from "./childLayout";

export const metadata = {
  title: "TripWay Holidays",
  description: "Book Tour Next Tripway Holidays",
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
