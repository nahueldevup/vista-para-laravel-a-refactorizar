import { Header } from "@/components/Header";

export default function Ajustes() {
  return (
    <div className="flex-1 flex flex-col">
      <Header title="proyecto" subtitle="Ajustes" />
      
      <main className="flex-1 p-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Ajustes</h2>
            <p className="text-muted-foreground">Configuración del sistema</p>
          </div>
        </div>
      </main>
    </div>
  );
}
