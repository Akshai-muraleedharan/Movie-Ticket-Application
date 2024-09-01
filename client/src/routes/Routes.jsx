import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/rootpage/HomePage.jsx";
import AboutPage from "../pages/rootpage/AboutPage.jsx";
import MovieListPage from "../pages/userpage/MovieListPage.jsx";
import UserProfile from "../pages/userpage/UserProfile.jsx";
import BookedMovies from "../pages/userpage/BookedMovies.jsx";
import { UserAuth } from "./protected routes/UserAuth.jsX";
import MovieSinglePage from "../pages/userpage/MovieSinglePage.jsx";
import LoginPageClient from "../pages/clientPage/LoginPageClient.jsx";
import SignupPageClient from "../pages/clientPage/SignupPageClient.jsx";
import HomePageClient from "../pages/clientPage/HomePageClient.jsx";
import { OwnerAuth } from "./protected routes/OwnerAuth.jsx";
import CreateMoviePage from "../pages/clientPage/CreateMoviePage.jsx";
import CreateTheaterPageClient from "../pages/clientPage/CreateTheaterPageClient.jsx";
import ProfilePageClient from "../pages/clientPage/ProfilePageClient.jsx";
import BookSeat from "../pages/userpage/BookSeat.jsx";
import RootLayout from "../layouts/user/RootLayout.jsx";
import UserLayout from "../layouts/user/UserLayout.jsx";
import ClientLayout from "../layouts/client/ClientLayout.jsx";
import ClientSecuredLayout from "../layouts/client/ClientSecuredLayout.jsx";
import AdminLayout from "../layouts/admin/AdminLayout.jsx";
import LoginPage from "../pages/rootpage/LoginPage.jsx";
import SignupPage from "../pages/rootpage/SignupPage.jsx";
import AdminLoginPage from "../pages/AdminPage/AdminLoginPage.jsx";
import AdminSecureLayout from "../layouts/admin/AdminSecureLayout.jsx";
import { AdminAuth } from "./protected routes/AdminAuth.jsx";
import AdminHomePage from "../pages/AdminPage/AdminHomePage.jsx";
import AdminDashboard from "../pages/AdminPage/AdminDashboard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "sign-up",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "user",
    element: (
      <UserAuth>
        <UserLayout />
      </UserAuth>
    ),

    children: [
      {
        path: "movies",
        element: <MovieListPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },

      {
        path: "single-page/:id",
        element: <MovieSinglePage />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "booked-movies",
        element: <BookedMovies />,
      },
      {
        path:"book-seat/:id",
        element:<BookSeat/>
      }
    ],
  },
  {
    path: "client",
    element: <ClientLayout />,

    children: [
      {
        path: "login",
        element: <LoginPageClient />,
      },
      {
        path: "signup",
        element: <SignupPageClient />,
      },
    ],
  },
  {
    path: "clients",
    element: (
      <OwnerAuth>
        <ClientSecuredLayout />
      </OwnerAuth>
    ),

    children: [
      {
        path: "",
        element: <HomePageClient />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path:"create-movie",
        element:<CreateMoviePage/>
      },
      {
        path:"create-theater",
        element:<CreateTheaterPageClient />
      },
      {
        path:"profile",
        element:<ProfilePageClient/>
      }
    ],
  },
  {
    path:"admin",
    element:<AdminLayout/>,

    children:[
      {
        path:"login",
        element:<AdminLoginPage />
      }
    ]
  },
  {
    path:"admins",
    element:(
      <AdminAuth>
      <AdminSecureLayout/>
      </AdminAuth>
    ),

    children:[
      {
        path:'',
        element:<AdminHomePage />
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path:"dashbord",
        element:<AdminDashboard />
      }
    ]

  }
]);
