import { UserProvider } from "@/context/UserContext";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} closeOnClick />
        </UserProvider>
    );
}

export default MyApp;
