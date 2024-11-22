import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";  //both tools from react-router-dom
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";

// retrieves data from browsers local storage, stored/archived tasks are fetched.
const taskLoader = async () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const archivedTasks = JSON.parse(localStorage.getItem("archivedTasks")) || [];
  return { tasks: storedTasks, archivedTasks };
};

//creates a router instance
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>, //acts as the parent root and will keep navbar in display 
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: taskLoader, //attached to both children to fetch data
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: taskLoader,
      },
    ],
  },
]);

//passes the configured router to render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
