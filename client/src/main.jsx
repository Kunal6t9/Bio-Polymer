import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExplorerPage from "./pages/ExplorerPage.jsx";
import SimulatorPage from "./pages/SimulatorPage.jsx";
import "./index.css";
import PolymerDetailPage from "./pages/PolymerDetailedPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
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
      { path: "polymer/:id", element: <PolymerDetailPage /> },
      { path: "comparison", element: <ComparisonPage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboardPage />
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
