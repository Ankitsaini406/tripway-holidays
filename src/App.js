import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPageLayout from "./components/landingPage";
import './App.css';
import TourPackes from './pages/TourPackges';
import TourDetails from './pages/TourDetails';

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
                path: "/tour/:id",
                element: <TourDetails />,
            }
        ]
    }
])

const App = () => <RouterProvider router={router} />

export default App;