import { RouterProvider, createBrowserRouter  } from 'react-router-dom';
import Home from "./pages/Home";
import LandingPageLayout from "./components/landingPage";
import './App.css';
import TourPackes from './pages/TourPackges';

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
          }
      ]
  }
])

const App = () => <RouterProvider router={router} />

export default App;