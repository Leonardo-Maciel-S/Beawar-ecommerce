"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { getCart } from "@/app/actions/get-cart";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/user-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { data, isPending } = useCart();

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

        <div className="flex h-full flex-col gap-8 px-6 pb-5">
          <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
            {data && data.error && <p>{data.error}</p>}

            <ScrollArea className="h-full">
              <div className="flex h-full flex-col gap-8">
                {isPending && <p>Carregando...</p>}
                {data &&
                  data.cart?.items.map((item) => (
                    <CartItem
                      key={item.productVariantId}
                      id={item.id}
                      productVariantId={item.productVariantId}
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantUrl={item.productVariant.imageUrl}
                      productVariantPriceInCents={
                        item.productVariant.priceInCents
                      }
                      initialQuantity={item.quantity}
                    />
                  ))}
                {data && data.cart?.items.length === 0 && (
                  <p className="text-center">Sua sacola está vazia</p>
                )}
              </div>
            </ScrollArea>
          </div>

          {data && data.cart?.items && data.cart?.items.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between text-xs font-semibold">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(data.cart?.totalPriceInCents) ?? 0}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-semibold">
                <p>Total</p>
                <p>{formatCentsToBRL(data.cart?.totalPriceInCents) ?? 0}</p>
              </div>

              <SheetClose asChild>
                <Button className="rounded-full" asChild>
                  <Link href="../cart/identification">Finalizar Compra</Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </div>

        <div></div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
