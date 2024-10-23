import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPageLayout from "./components/landingPage";
import './App.css';
import TourPackes from './pages/TourPackges';
import TourDetails from './pages/TourDetails';
import About from './pages/About';

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