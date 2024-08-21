import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import MovieSinglePage from "../pages/MovieSinglePage.jsx";
import SignupPage from "../pages/SignupPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        path:'',
        element:<HomePage/>
      },
      {
        path:'about',
        element:<AboutPage />
      },
      {
        path:'login',
        element:<LoginPage/>
      },
      {
        path:'name/:id',
        element:<MovieSinglePage/>,
      },
      {
        path:'sign-up',
        element:<SignupPage />
      }

    ],
  },
]);
