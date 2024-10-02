import { createBrowserRouter } from "react-router-dom";
import { UserAuth } from "./protected routes/UserAuth.jsX";
import { OwnerAuth } from "./protected routes/OwnerAuth.jsx";
import { AdminAuth } from "./protected routes/AdminAuth.jsx";
import { lazy,Suspense } from 'react';
import Loader from "../components/Loader.jsx";
import RootLayout from "../layouts/user/RootLayout.jsx"




const PageNoteFound = lazy(() => import('../components/PageNoteFound.jsx'));
const UserLayout = lazy(() => import('../layouts/user/UserLayout.jsx'));
const ClientLayout = lazy(() => import('../layouts/client/ClientLayout.jsx'));
const ClientSecuredLayout = lazy(() => import('../layouts/client/ClientSecuredLayout.jsx'));
const AdminLayout = lazy(() => import('../layouts/admin/AdminLayout.jsx'));
const AdminSecureLayout = lazy(() => import('../layouts/admin/AdminSecureLayout.jsx'));

// root layout
const HomePage = lazy(() => import('../pages/rootpage/HomePage.jsx'));
const LoginPage = lazy(() => import('../pages/rootpage/LoginPage.jsx'));
const SignupPage = lazy(() => import('../pages/rootpage/SignupPage.jsx'));




// userPage
const MovieListPage = lazy(() => import('../pages/userpage/MovieListPage.jsx'));
const MovieSinglePage = lazy(() => import('../pages/userpage/MovieSinglePage.jsx'));
const UserProfile = lazy(() => import('../pages/userpage/UserProfile.jsx'));
const BookedMovies = lazy(() => import('../pages/userpage/BookedMovies.jsx'));
const BookSeat = lazy(() => import('../pages/userpage/BookSeat.jsx'));
const PaymentSuccessPage = lazy(() => import('../pages/userpage/PaymentSuccessPage.jsx'));
const PaymentCancelPage = lazy(() => import('../pages/userpage/PaymentCancelPage.jsx'));


// Owner
const LoginPageClient = lazy(() => import('../pages/clientPage/LoginPageClient.jsx'));
const SignupPageClient = lazy(() => import('../pages/clientPage/SignupPageClient.jsx'));
const HomePageClient = lazy(() => import('../pages/clientPage/HomePageClient.jsx'));
const CreateMoviePage = lazy(() => import('../pages/clientPage/CreateMoviePage.jsx'));
const CreateTheaterPageClient = lazy(() => import('../pages/clientPage/CreateTheaterPageClient.jsx'));
const ProfilePageClient = lazy(() => import('../pages/clientPage/ProfilePageClient.jsx'));
const TheaterDetailsPage = lazy(() => import('../pages/clientPage/TheaterDetailsPage.jsx'));
const MovieShedulePage = lazy(() => import('../pages/clientPage/MovieShedulePage.jsx'));
const TheaterList = lazy(() => import('../pages/clientPage/TheaterList.jsx'));
const MovieTime = lazy(() => import('../components/Clients/MovieTime.jsx'));
const TheaterSeat = lazy(() => import('../pages/clientPage/TheaterSeat.jsx'));

// admin
const AdminHomePage = lazy(() => import('../pages/AdminPage/AdminHomePage.jsx'));
const AdminLoginPage = lazy(() => import('../pages/AdminPage/AdminLoginPage.jsx'));
const AdminSignupPage = lazy(() => import('../pages/AdminPage/AdminSignupPage.jsx'));
const AdminProfilePage = lazy(() => import('../pages/AdminPage/AdminProfilePage.jsx'));


// admin dashboard
const AdminReviewPage = lazy(() => import('../pages/AdminPage/AdminReviewPage.jsx'));
const AdminOwnersList = lazy(() => import('../pages/AdminPage/AdminOwnersList.jsx'));
const UserListPage = lazy(() => import('../pages/AdminPage/AdminUserListPage.jsx'));
const PaymentPage = lazy(() => import('../pages/clientPage/PaymentPage.jsx'));
const AdminTheaterPayment = lazy(() => import('../pages/AdminPage/AdminTheaterPayment.jsx'));



export const router = createBrowserRouter([
  {
    path:"*",

    element:(
      <Suspense fallback={<Loader/>}>
    <PageNoteFound/>
    </Suspense>
    )
  },
  {
    path: "/",
    element:( 
      <Suspense fallback={<Loader/>}>
    <RootLayout />
    </Suspense>
    ),

    children: [
      {
        path: "",

        element: <HomePage />
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
           <Suspense fallback={<Loader/>}> 
        <UserLayout />
        </Suspense>
      </UserAuth>
    ),

    children: [
      {
        path: "movies",
        element: <MovieListPage />,
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
        path:"movie/:movieId/book-seat/:id",
        element:<BookSeat/>
      },
      {
        path: "payment/success/:movie/:theater",
        element: <PaymentSuccessPage />,
    },
    {
      path: "payment/cancel",
      element: <PaymentCancelPage />,
  },
    ],
  },
  {
    path: "owner",
    element: (
      <Suspense fallback={<Loader/>}>
    <ClientLayout />
    </Suspense> 
    ),

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
         <Suspense fallback={<Loader/>}>
        <ClientSecuredLayout />
        </Suspense>
      </OwnerAuth>
    ),

    children: [
      {
        path: "",
        element: <HomePageClient />,
      },
     
      {
        path:"create-movie/:id",
        element:<CreateMoviePage/>
      },
      {
        path:"theater-detail",
        element:<TheaterDetailsPage/>,

        children:[{
          path:"theater-showTime/:movieId",
          element:<MovieTime/>
        }]
      },
      {
        path:"profile",
        element:<ProfilePageClient/>
      },
      {
        path:"create-theater",
        element:<CreateTheaterPageClient/>
      },
      {
        path:"movie-shedule/:theaterId",
        element:<MovieShedulePage />
      },
      {
        path:"theater-list",
        element:<TheaterList />
      },
      {
        path:"theater-seat/:theaterId",
        element:<TheaterSeat/>
      },
      {
        path:"theater-payment",
        element:<PaymentPage/>
      }
    ],
  },
  {
    path:"admin",
    element:(
      <Suspense fallback={<Loader/>}>
       <AdminLayout/>
       </Suspense>
    ),

    children:[
      {
        path:"login",
        element:<AdminLoginPage />
      },
      {
        path:"signup",
        element:<AdminSignupPage />
      },
    
    ]
  },
  {
    path:"admins",
    element:(
      <AdminAuth>
         <Suspense fallback={<Loader/>}>
      <AdminSecureLayout/>
      </Suspense>
      </AdminAuth>
    ),

    children:[
      {
        path:'',
        element:<AdminHomePage />
      },
      {
        path: "users",
        element: <UserListPage />,
      },
      {
        path: "owners",
        element: <AdminOwnersList />,
      },
      {
        path: "review",
        element: <AdminReviewPage />,
      },
     
 
      {
        path:"profile",
        element:<AdminProfilePage />
      },
      {
        path:"payment",
        element:<AdminTheaterPayment />
      }
    ]

  },
 


 
  

]);

