import { UserProvider } from "@/context/UserContext";
import ClientRootLayout from "./childLayout";

// app/layout.js (or a parent layout file)
export const metadata = {
  title: "TripWay Holidays",
  description: "Welcome to Tripway Holidays",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ClientRootLayout>
            {children}
          </ClientRootLayout>
        </UserProvider>
      </body>
    </html>
  );
}
