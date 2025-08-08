"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";

import { getCart } from "@/app/actions/get-cart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
  const { data: cart, isPending: cartIsPending } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => getCart(),
  });

  console.log(cart);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingBag />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag />

            <span>Sacola</span>
          </SheetTitle>
        </SheetHeader>

        <div className="px-5">
          {cartIsPending && <p>Carregando...</p>}
          {cart?.items.map((item) => (
            <p key={item.id}>{item.productVariant.name}</p>
          ))}
          {cart?.items.length === 0 && (
            <p className="text-center">Sua sacola está vazia</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
