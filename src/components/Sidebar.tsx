import { Home, LayoutGrid, Package, ShoppingCart, Wallet, FileText, BarChart3, Users, Settings, Plus, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { title: "Inicio", icon: Home, path: "/" },
  { title: "Escritorio", icon: LayoutGrid, path: "/escritorio" },
  { title: "Productos", icon: Package, path: "/productos" },
  { title: "Vender", icon: ShoppingCart, path: "/vender" },
  { title: "Caja", icon: Wallet, path: "/caja" },
  { title: "Reportes", icon: FileText, path: "/reportes", hasSubmenu: true },
  { title: "Gráficas y estadísticas", icon: BarChart3, path: "/graficas" },
  { title: "Más", icon: Plus, path: "#", hasOtherSubmenu: true },
];

const reportesSubmenu = [
  { title: "Ventas al contado", path: "/reportes/ventas-contado" },
  { title: "Caja", path: "/reportes/caja" },
  { title: "Productos con baja existencia", path: "/reportes/baja-existencia" },
  { title: "Inventario", path: "/reportes/inventario" },
];

const otherSubmenu = [
  { title: "Usuarios", icon: Users, path: "/usuarios" },
  { title: "Ajustes", icon: Settings, path: "/ajustes" },
  { title: "Salir", icon: LogOut, path: "/login" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="w-60 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground">Tienda</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                    openSubmenu === item.title && "text-primary bg-muted font-medium"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </button>
                {openSubmenu === item.title && (
                  <div className="ml-8 mt-1 space-y-1">
                    {reportesSubmenu.map((subItem) => (
                      <NavLink
                        key={subItem.title}
                        to={subItem.path}
                        className={({ isActive }) =>
                          cn(
                            "block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-sm",
                            isActive && "text-primary bg-muted font-medium"
                          )
                        }
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : item.hasOtherSubmenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                    openSubmenu === item.title && "text-primary bg-muted font-medium"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </button>
                {openSubmenu === item.title && (
                  <div className="ml-8 mt-1 space-y-1">
                    {otherSubmenu.map((subItem) => (
                      subItem.title === "Salir" ? (
                        <button
                          key={subItem.title}
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-sm"
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.title}</span>
                        </button>
                      ) : (
                        <NavLink
                          key={subItem.title}
                          to={subItem.path}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-sm",
                              isActive && "text-primary bg-muted font-medium"
                            )
                          }
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.title}</span>
                        </NavLink>
                      )
                    ))}
                  </div>
                )}
              </>
            ) : (
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
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
