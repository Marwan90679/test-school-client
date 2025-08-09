import {
    createBrowserRouter,
  } from "react-router";
import Home from "../Pages/Home";
import LevelPage from "../Pages/LevelPage.";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import Quiz from "../Pages/Quiz";

  export const router = createBrowserRouter([
    {
      path: "/",
      Component:Home,
    },
    {
        path:'levelSelection',
        Component:LevelPage
    },
    {
      path:'quiz/:id',
      Component:Quiz
    },
    {
      path:'signIn',
      Component:SignIn
    },
    {
      path:'signUp'
      ,
      Component:SignUp
    }
  ]);