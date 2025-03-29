import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Resumes from "./pages/Resumes/Resumes.tsx";
import EditResume from "./pages/Resumes/EditResume.tsx";
import Letters from "./pages/Letters/Letters.tsx";
import EditLetter from "./pages/Letters/EditLetter.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "resumes",
        children: [
          {
            index: true,
            element: <Resumes />,
          },
          {
            path: ":id/edit",
            element: <EditResume />,
          },
        ],
      },
      {
        path: "letters",
        children: [
          {
            index: true,
            element: <Letters />,
          },
          {
            path: ":id/edit",
            element: <EditLetter />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
