import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPageLayout from "./components/landingPage";
import TourPackes from './pages/TourPackges';
import TourDetails from './pages/TourDetails';
import About from './pages/About';
import NotFound from './Not-Found';

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