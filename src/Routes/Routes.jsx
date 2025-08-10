import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import LevelPage from "../Pages/LevelPage.";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import Quiz from "../Pages/Quiz";
import MainLayouts from "../Layouts/MainLayouts";
import Certificate from "../Pages/Certificate";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "levelSelection",
        element:<PrivateRoute><LevelPage></LevelPage></PrivateRoute>
      },

      {
        path: "signIn",
        Component: SignIn,
      },
      {
        path: "signUp",
        Component: SignUp,
      },
      {
        path:'certificates',
        element:<PrivateRoute><Certificate></Certificate></PrivateRoute>
      }
    ],
  },
  {
    path:'quiz/:id',
    element:<PrivateRoute><Quiz></Quiz></PrivateRoute>
  },
]);
