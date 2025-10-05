import { Home, LayoutGrid, Package, ShoppingCart, Wallet, FileText, BarChart3, Users, Settings, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Inicio", icon: Home, path: "/" },
  { title: "Escritorio", icon: LayoutGrid, path: "/escritorio" },
  { title: "Productos", icon: Package, path: "/productos" },
  { title: "Vender", icon: ShoppingCart, path: "/vender" },
  { title: "Caja", icon: Wallet, path: "/caja" },
  { title: "Reportes", icon: FileText, path: "/reportes" },
  { title: "Gráficas y estadísticas", icon: BarChart3, path: "/graficas" },
  { title: "Más", icon: Plus, path: "#", hasSubmenu: true },
];

const submenuItems = [
  { title: "Usuarios", icon: Users, path: "/usuarios" },
  { title: "Ajustes", icon: Settings, path: "/ajustes" },
];

export function Sidebar() {
  return (
    <aside className="w-60 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground">Tienda</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div key={item.title}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                  isActive && "text-primary bg-muted font-medium"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </NavLink>
            {item.hasSubmenu && (
              <div className="ml-8 mt-1">
                {submenuItems.map((subItem) => (
                  <NavLink
                    key={subItem.title}
                    to={subItem.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                        isActive && "text-primary bg-muted font-medium"
                      )
                    }
                  >
                    <subItem.icon className="w-4 h-4" />
                    <span>{subItem.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
