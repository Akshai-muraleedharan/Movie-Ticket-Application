import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import UserLayout from "../layouts/UserLayout.jsx";
import MovieListPage from "../pages/userpage/MovieListPage.jsx";
import UserProfile from "../pages/userpage/UserProfile.jsx";
import BookedMovies from "../pages/userpage/BookedMovies.jsx";
import { UserAuth } from "./protected routes/UserAuth.jsX";
import MovieSinglePage from "../pages/userpage/MovieSinglePage.jsx";

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
        path:'sign-up',
        element:<SignupPage />
      }

    ],
  },
  {
    path: "user",
    element:(
      <UserAuth>
      <UserLayout/>
      </UserAuth>
    ),

    children:[
      {
        path:'movies',
        element:<MovieListPage/>
      },
      {
        path:'about',
       element: <AboutPage/>
      },

      {
        path:'single-page/:id',
        element:<MovieSinglePage/>
      },
      {
        path:'profile',
        element:<UserProfile/>
      },
      {
        path:'booked-movies',
        element:<BookedMovies/>
      }
    ]
  }
]);
