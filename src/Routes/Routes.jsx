import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import LevelPage from "../Pages/LevelPage.";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import Quiz from "../Pages/Quiz";
import MainLayouts from "../Layouts/MainLayouts";
import Certificate from "../Pages/Certificate";

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
        Component: LevelPage,
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
        Component:Certificate
      }
    ],
  },
  {
    path:'quiz/:id',
    Component:Quiz
  },
]);
