import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Minus, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: number;
  barcode: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  unit: string;
  existence: number;
  stock: number;
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      barcode: "1",
      description: "pan",
      purchasePrice: 20,
      salePrice: 20,
      unit: "$ 0.00",
      existence: 20,
      stock: 20,
    },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({
    barcode: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    stock: "",
    existence: "",
  });

  const handleAddProduct = () => {
    setIsAddDialogOpen(true);
  };

  const handleSaveProduct = () => {
    // Add product logic here
    setIsAddDialogOpen(false);
    setNewProduct({
      barcode: "",
      description: "",
      purchasePrice: "",
      salePrice: "",
      stock: "",
      existence: "",
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="proyecto" subtitle="Inventario" />
      
      <main className="flex-1 p-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar un producto por su descripción o código de barras"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <span>←</span>
                </Button>
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded">1</span>
                <Button variant="ghost" size="sm">
                  <span>→</span>
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Código de barras</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>P. compra</TableHead>
                  <TableHead>P. venta</TableHead>
                  <TableHead>Utilidad</TableHead>
                  <TableHead>Existencia</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Opciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.barcode}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>$ {product.purchasePrice.toFixed(2)}</TableCell>
                    <TableCell>$ {product.salePrice.toFixed(2)}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>{product.existence}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Minus className="w-4 h-4 text-warning" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Plus className="w-4 h-4 text-info" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4 text-warning" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="px-4 py-3 border-t border-border">
              <Button variant="link" className="text-primary">
                Exportar o importar productos
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg"
        onClick={handleAddProduct}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar producto</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="barcode">Código de barras</Label>
              <Input
                id="barcode"
                value={newProduct.barcode}
                onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })}
                placeholder="Código de barras (no debería repetirse)"
              />
              {!newProduct.barcode && (
                <p className="text-sm text-destructive">Introduzca el código de barras o invente uno que no exista</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                placeholder="Descripción"
              />
            </div>

            <div className="space-y-2">
              <Label>Precios</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Compra(Opcional)"
                  value={newProduct.purchasePrice}
                  onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: e.target.value })}
                />
                <Input
                  placeholder="Venta"
                  value={newProduct.salePrice}
                  onChange={(e) => setNewProduct({ ...newProduct, salePrice: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Stock(Opcional)"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
              <Input
                placeholder="Existencia actual(Opcion..."
                value={newProduct.existence}
                onChange={(e) => setNewProduct({ ...newProduct, existence: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
              CERRAR
            </Button>
            <Button onClick={handleSaveProduct} className="bg-success hover:bg-success/90">
              GUARDAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
