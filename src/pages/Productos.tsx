import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Minus, Edit, Trash2, FolderPlus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const { toast } = useToast();
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([
    "Bebidas",
    "Panadería",
    "Lácteos",
    "Carnes",
    "Frutas y Verduras",
  ]);
  const [newProduct, setNewProduct] = useState({
    barcode: "",
    description: "",
    purchasePrice: "",
    salePrice: "",
    stock: "",
    existence: "",
  });
  const [editProduct, setEditProduct] = useState({
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

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const handleIncreaseExistence = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, existence: p.existence + 1 } : p
    ));
    toast({
      title: "Existencia aumentada",
      description: "Se agregó 1 unidad al producto",
    });
  };

  const handleDecreaseExistence = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId && p.existence > 0 ? { ...p, existence: p.existence - 1 } : p
    ));
    toast({
      title: "Existencia reducida",
      description: "Se removió 1 unidad del producto",
    });
  };

  const handleEditProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditProduct({
        barcode: product.barcode,
        description: product.description,
        purchasePrice: product.purchasePrice.toString(),
        salePrice: product.salePrice.toString(),
        stock: product.stock.toString(),
        existence: product.existence.toString(),
      });
      setSelectedProductId(productId);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (selectedProductId) {
      setProducts(products.map(p => 
        p.id === selectedProductId ? {
          ...p,
          barcode: editProduct.barcode,
          description: editProduct.description,
          purchasePrice: parseFloat(editProduct.purchasePrice) || 0,
          salePrice: parseFloat(editProduct.salePrice) || 0,
          stock: parseInt(editProduct.stock) || 0,
          existence: parseInt(editProduct.existence) || 0,
        } : p
      ));
      toast({
        title: "Producto actualizado",
        description: "Los cambios se guardaron correctamente",
      });
      setIsEditDialogOpen(false);
      setSelectedProductId(null);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setSelectedProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (selectedProductId) {
      setProducts(products.filter(p => p.id !== selectedProductId));
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido removido del inventario",
      });
      setIsDeleteDialogOpen(false);
      setSelectedProductId(null);
    }
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
            <Button
              onClick={() => setIsCategoryDialogOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FolderPlus className="w-5 h-5" />
              Categorías
            </Button>
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
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDecreaseExistence(product.id)}
                        >
                          <Minus className="w-4 h-4 text-warning" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleIncreaseExistence(product.id)}
                        >
                          <Plus className="w-4 h-4 text-info" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="w-4 h-4 text-warning" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
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

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar producto</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-barcode">Código de barras</Label>
              <Input
                id="edit-barcode"
                value={editProduct.barcode}
                onChange={(e) => setEditProduct({ ...editProduct, barcode: e.target.value })}
                placeholder="Código de barras"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={editProduct.description}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                placeholder="Descripción"
              />
            </div>

            <div className="space-y-2">
              <Label>Precios</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Compra"
                  type="number"
                  value={editProduct.purchasePrice}
                  onChange={(e) => setEditProduct({ ...editProduct, purchasePrice: e.target.value })}
                />
                <Input
                  placeholder="Venta"
                  type="number"
                  value={editProduct.salePrice}
                  onChange={(e) => setEditProduct({ ...editProduct, salePrice: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Stock"
                type="number"
                value={editProduct.stock}
                onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
              />
              <Input
                placeholder="Existencia actual"
                type="number"
                value={editProduct.existence}
                onChange={(e) => setEditProduct({ ...editProduct, existence: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
              CERRAR
            </Button>
            <Button onClick={handleSaveEdit} className="bg-success hover:bg-success/90">
              GUARDAR CAMBIOS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Categories Management Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gestionar Categorías</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Search Categories */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar categoría..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Add New Category */}
            <div className="flex gap-2">
              <Input
                placeholder="Nueva categoría"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
              />
              <Button
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                className="bg-success hover:bg-success/90"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Categories List */}
            <div className="border border-border rounded-lg max-h-64 overflow-y-auto">
              {filteredCategories.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  {categorySearch ? "No se encontraron categorías" : "No hay categorías"}
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-accent/50 transition-colors"
                    >
                      <span className="font-medium">{category}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteCategory(category)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCategoryDialogOpen(false)}>
              CERRAR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente del inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)}>
              CANCELAR
            </Button>
            <Button
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDeleteProduct}
            >
              ELIMINAR
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
