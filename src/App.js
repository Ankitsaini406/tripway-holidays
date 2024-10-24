import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPageLayout from "./components/landingPage";
import TourPackes from './pages/TourPackges';
import TourDetails from './pages/TourDetails';
import About from './pages/About';
import NotFound from './Not-Found';
import LoaginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPageLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: '*',
                element: <NotFound/>
            },
            {
                path: '/login',
                element: <LoaginPage/>
            },
            {
                path: '/signup',
                element: <SignUpPage />,
            },
            {
                path: "/tour",
                element: <TourPackes />,
            },
            {
                path: "/group-tour",
                element: <TourPackes />,
            },
            {
                path: "/tour/:id",
                element: <TourDetails />,
            },
            {
                path: "/about",
                element: <About />
            }
        ]
    }
])

const App = () => (
    <>
    <RouterProvider router={router} />
    </>
)

export default App;