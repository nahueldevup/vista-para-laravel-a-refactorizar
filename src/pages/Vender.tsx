import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, X, Trash2, Check } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CartItem {
  id: number;
  barcode: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export default function Vender() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      barcode: "1",
      description: "pan",
      quantity: 1,
      price: 20,
      total: 20,
    },
  ]);
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [amountReceived, setAmountReceived] = useState("20000");
  const [customerType, setCustomerType] = useState("display");

  const total = cartItems.reduce((sum, item) => sum + item.total, 0);
  const payment = parseFloat(amountReceived) || 0;
  const change = payment - total;

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCancelSale = () => {
    setIsCancelDialogOpen(true);
  };

  const confirmCancelSale = () => {
    setCartItems([]);
    setIsCancelDialogOpen(false);
    setShowButtons(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header title="proyecto" subtitle="Vender" />
      
      <main className="flex-1 p-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Escanear código o escribir el nombre del producto y presionar Enter"
                className="pl-10"
              />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border mb-6">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">
                Total de la venta: $ {total.toFixed(2)}
              </h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Código de barras</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Opciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.barcode}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        className="w-20"
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          setCartItems(
                            cartItems.map((i) =>
                              i.id === item.id
                                ? { ...i, quantity: newQuantity, total: newQuantity * i.price }
                                : i
                            )
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>$ {item.price.toFixed(2)}</TableCell>
                    <TableCell>$ {item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <ShoppingCart className="w-4 h-4 text-success" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <X className="w-4 h-4 text-warning" />
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
          </div>

          {/* Action Buttons */}
          {!showButtons && cartItems.length > 0 && (
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleCancelSale}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Cancelar venta
              </Button>
              <Button
                size="lg"
                onClick={handleCheckout}
                className="bg-success hover:bg-success/90 text-success-foreground"
              >
                Al contado
              </Button>
            </div>
          )}

          {showButtons && (
            <div className="fixed bottom-8 right-8 flex gap-4">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full w-14 h-14 shadow-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleCancelSale}
              >
                <Trash2 className="w-6 h-6" />
              </Button>
              <Button
                size="lg"
                className="rounded-full w-14 h-14 shadow-lg bg-primary"
                onClick={() => setShowButtons(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              <Button
                size="lg"
                className="rounded-full w-14 h-14 shadow-lg bg-success hover:bg-success/90"
                onClick={handleCheckout}
              >
                <Check className="w-6 h-6" />
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Terminar venta al contado</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Cantidad recibida</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                  className="pl-8"
                />
              </div>
              <p className="text-xs text-info">¿Con cuánto paga el cliente?</p>
            </div>

            <div className="space-y-2">
              <Label>Tipo de cliente</Label>
              <RadioGroup value={customerType} onValueChange={setCustomerType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="display" id="display" />
                  <Label htmlFor="display">Mostrador</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="search" id="search" />
                  <Label htmlFor="search">Buscar o crear nuevo</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-semibold">$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pago:</span>
                <span className="font-semibold">$ {payment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Cambio:</span>
                <span>$ {change.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCheckoutOpen(false)}>
              CERRAR
            </Button>
            <Button className="bg-success hover:bg-success/90">
              TERMINAR VENTA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar venta actual?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Realmente desea vaciar la lista de productos?
              <br />
              <strong>Esta acción no se puede revertir</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="ghost" onClick={() => setIsCancelDialogOpen(false)}>
              CERRAR
            </Button>
            <Button
              className="bg-success hover:bg-success/90"
              onClick={confirmCancelSale}
            >
              SÍ, VACIAR
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
