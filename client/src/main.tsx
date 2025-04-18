import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Resumes, { loader as resumesLoader } from "./pages/Resumes/Resumes.tsx";
import EditResume, {
  loader as editResumeLoader,
} from "./pages/Resumes/EditResume.tsx";
import Letters from "./pages/Letters/Letters.tsx";
import EditLetter from "./pages/Letters/EditLetter.tsx";
import { FormDataProvider } from "./hooks/useFormData.tsx";

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
            loader: resumesLoader,
          },
          {
            path: ":id/edit",
            element: <EditResume />,
            loader: editResumeLoader,
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
    <FormDataProvider>
      <RouterProvider router={router} />
    </FormDataProvider>
  </StrictMode>
);
