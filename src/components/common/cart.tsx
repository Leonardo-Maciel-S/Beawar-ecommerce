import { ShoppingBag } from "lucide-react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingBag />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Meu Carrinho</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
