import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Escritorio from "./pages/Escritorio";
import Productos from "./pages/Productos";
import Vender from "./pages/Vender";
import Caja from "./pages/Caja";
import Reportes from "./pages/Reportes";
import VentasContado from "./pages/VentasContado";
import ReporteCaja from "./pages/ReporteCaja";
import Inventario from "./pages/Inventario";
import Usuarios from "./pages/Usuarios";
import Ajustes from "./pages/Ajustes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import Perfil from "./pages/Perfil";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password";

  return (
    <div className="flex min-h-screen w-full bg-background">
      {!isAuthPage && <Sidebar />}
      <div className={isAuthPage ? "flex-1" : "flex-1 flex flex-col"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/escritorio" element={<Escritorio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/vender" element={<Vender />} />
          <Route path="/caja" element={<Caja />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/reportes/ventas-contado" element={<VentasContado />} />
          <Route path="/reportes/caja" element={<ReporteCaja />} />
          <Route path="/reportes/baja-existencia" element={<Productos />} />
          <Route path="/reportes/inventario" element={<Inventario />} />
          <Route path="/graficas" element={<Escritorio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
