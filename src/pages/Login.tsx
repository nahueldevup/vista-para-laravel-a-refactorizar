import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, User, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de login - en producción aquí iría la autenticación real
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Bienvenido de nuevo</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline w-4 h-4 mr-2" />
                Correo del negocio elegido al registrarse
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Correo del negocio elegido al registrarse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">
                <User className="inline w-4 h-4 mr-2" />
                Usuario (La primera vez es parzibyte)
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Usuario (La primera vez es parzibyte)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                <Lock className="inline w-4 h-4 mr-2" />
                Contraseña (la que eligió al registrarse)
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Contraseña (la que eligió al registrarse)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-success hover:bg-success/90">
              ENTRAR
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </div>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-primary"
                onClick={() => navigate("/register")}
              >
                REGISTRARME
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
