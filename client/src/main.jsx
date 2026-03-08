import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExplorerPage from "./pages/ExplorerPage.jsx";
import SimulatorPage from "./pages/SimulatorPage.jsx";
import EducationPage from "./pages/EducationPage.jsx";
import "./index.css";
import PolymerDetailPage from "./pages/PolymerDetailedPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import ContributorDashboardPage from "./pages/ContributorDashboardPage.jsx";
import SubmitPolymerPage from "./pages/SubmitPolymerPage.jsx";
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";
import ComparisonPage from "./pages/ComparisonPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "explorer", element: <ExplorerPage /> },
      { path: "simulator", element: <SimulatorPage /> },
      { path: "learn", element: <EducationPage /> },
      { path: "polymer/:id", element: <PolymerDetailPage /> },
      { path: "comparison", element: <ComparisonPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "contributor/dashboard",
        element: (
          <ProtectedRoute requiredRole="contributor">
            <ContributorDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "contributor/submit",
        element: (
          <ProtectedRoute requiredRole="contributor">
            <SubmitPolymerPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
