import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Store, Lock } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de registro - en producción aquí iría el registro real
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Registra tu negocio</CardTitle>
          <CardDescription className="text-center">
            Crea una cuenta para comenzar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="inline w-4 h-4 mr-2" />
                Tu correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">
                <Store className="inline w-4 h-4 mr-2" />
                Nombre de tu negocio
              </Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Nombre de tu negocio"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                <Lock className="inline w-4 h-4 mr-2" />
                Escribe una contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Escribe una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                <Lock className="inline w-4 h-4 mr-2" />
                Confirma tu contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-success hover:bg-success/90">
              REGISTRARME
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-primary"
                onClick={() => navigate("/login")}
              >
                YA TENGO UNA CUENTA
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
