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
import CartItem from "./cart-item";

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

      <SheetContent className="rounded-l-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag />

            <span>Sacola</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-8 px-5">
          {cartIsPending && <p>Carregando...</p>}
          {cart?.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              productName={item.productVariant.product.name}
              productVariantName={item.productVariant.name}
              productVariantUrl={item.productVariant.imageUrl}
              productVariantPriceInCents={item.productVariant.priceInCents}
              initialQuantity={item.quantity}
            />
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
