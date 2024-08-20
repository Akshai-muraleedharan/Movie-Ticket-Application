import { createBrowserRouter } from "react-router-dom";
import RootLayout from '../layouts/RootLayout.jsx'


export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />
    },
  ]);