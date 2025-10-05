import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Filter, Printer } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReporteCaja() {
  const [reportType, setReportType] = useState("usuario");
  const [selectedUser, setSelectedUser] = useState("parzibyte - #1");

  const ventasContado = 260.0;
  const ingresos = 0.0;
  const egresos = 0.0;
  const totalCaja = ventasContado + ingresos - egresos;

  return (
    <div className="flex-1 flex flex-col">
      <Header title="proyecto" subtitle="Reporte de caja" />

      <main className="flex-1 p-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <Button variant="link" className="mb-6 text-primary">
            <Filter className="w-4 h-4 mr-2" />
            FILTRAR
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Tipo de reporte
                </Label>
                <RadioGroup value={reportType} onValueChange={setReportType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="font-normal">
                      General
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="usuario" id="usuario" />
                    <Label htmlFor="usuario" className="font-normal">
                      Por usuario
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {reportType === "usuario" && (
                <div>
                  <Label htmlFor="user-select" className="text-sm text-primary mb-2 block">
                    Seleccione un usuario
                  </Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger id="user-select">
                      <SelectValue placeholder="Seleccionar usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parzibyte - #1">parzibyte - #1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-3 pt-4">
                <div className="text-2xl font-semibold">
                  $ {ventasContado.toFixed(2)}{" "}
                  <span className="text-base text-muted-foreground">
                    Ventas al contado
                  </span>
                </div>
                <div className="text-2xl font-semibold text-success">
                  +$ {ingresos.toFixed(2)}{" "}
                  <span className="text-base text-muted-foreground">Ingresos</span>
                </div>
                <div className="text-2xl font-semibold text-destructive">
                  -$ {egresos.toFixed(2)}{" "}
                  <span className="text-base text-muted-foreground">Egresos</span>
                </div>
                <div className="text-2xl font-semibold pt-2 border-t">
                  $ {totalCaja.toFixed(2)}{" "}
                  <span className="text-base text-muted-foreground">
                    Total en caja
                  </span>
                </div>
              </div>

              <Button className="bg-success hover:bg-success/90">
                <Printer className="w-4 h-4 mr-2" />
                IMPRIMIR
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
