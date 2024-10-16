import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LandingPageLayout from "./components/landingPage";
import TourPackes from "./pages/tour";
import './App.css';

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
              element: <TourPackes />
          }
      ]
  }
])

const App = () => <RouterProvider router={router} />

export default App;