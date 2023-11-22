import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegisterUser from "./pages/Register";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/dashboard";
import DashboardCreateStatistic from "./pages/dashboard/statistics.tsx";
import DashboardCreateTeams from "./pages/dashboard/teams.tsx";
import DashboardCreate from "./pages/dashboard/description.tsx";
import DashboardCreateAgenda from "./pages/dashboard/agenda.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../src/componets/Navbar";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./componets/RequireAuth.tsx";
import Layout from "./layouts/Layout.tsx";
import Unauthorized from "./componets/Unauthorized.tsx";

import { AuthProvider } from "./context/AuthContext.tsx";
import { DashboardProvider } from "./context/DashboardContext.tsx";
import DashboardLayout from "./layouts/Dashboard.tsx";
import ForgotPassword from "./componets/ForgotPassword.tsx";
import ResetPassword from "./componets/ResetPassword.tsx";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: 5 * 1000,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar />
          <DashboardProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route element={<RequireAuth allowedRoles={["user"]} />}>
                  <Route index element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route
                  path="/reset-password/:id/:token"
                  element={<ResetPassword />}
                />
                <Route path="*" element={<NoPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route
                  element={<RequireAuth allowedRoles={["admin", "user"]} />}
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/*" element={<DashboardLayout />}>
                    <Route path="description" element={<DashboardCreate />} />
                    <Route path="agenda" element={<DashboardCreateAgenda />} />
                    <Route
                      path="statistics"
                      element={<DashboardCreateStatistic />}
                    />
                    <Route path="teams" element={<DashboardCreateTeams />} />
                  </Route>
                </Route>
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>
            <Toaster position="top-center" reverseOrder={false} />
          </DashboardProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
