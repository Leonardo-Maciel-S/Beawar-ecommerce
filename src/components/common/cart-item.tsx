"use client";

import { useMutation } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import decreaseCartProductQuantity from "@/app/actions/decrease-cart-product-quantity";
import { removeCartProduct } from "@/app/actions/remove-cart-product";
import { formatCentsToBRL } from "@/helpers/money";
import { queryClient } from "@/providers/react-query";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantUrl: string;
  productVariantPriceInCents: number;
  initialQuantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantUrl,
  productVariantPriceInCents,
  initialQuantity,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const removeCartProductItem = useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: () =>
      removeCartProduct({
        cartItemId: id,
      }),
    onSuccess: () => {
      toast.success("Produto removido com sucesso.");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: () => {
      toast.error("Erro inesperado, tente novamente.");
    },
  });

  const decreaseCartItem = useMutation({
    mutationKey: ["decreaseCartItem"],
    mutationFn: () =>
      decreaseCartProductQuantity({
        cartItemId: id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);

    decreaseCartItem.mutate();
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);

  return (
    <div className="flex items-center gap-4">
      <Image
        src={productVariantUrl}
        alt={productName}
        width={78}
        height={78}
        className="rounded-xl"
      />

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold">{productName}</p>
            <p className="text-muted-foreground medium text-xs">
              {productVariantName}
            </p>
          </div>

          <Button
            variant={"outline"}
            disabled={removeCartProductItem.isPending}
            onClick={() => removeCartProductItem.mutate()}
          >
            <Trash2 size={25} />
          </Button>
        </div>
        <div className="flex items-end justify-between">
          <div className="grid w-[100px] grid-cols-3 items-center justify-center overflow-hidden rounded-lg border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecrement}
              className="border-none"
              disabled={decreaseCartItem.isPending}
            >
              <Minus />
            </Button>
            <p className="flex h-full items-center justify-center text-center font-medium">
              {quantity}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleIncrement}
              className="border-none"
            >
              <Plus size={30} />
            </Button>
          </div>

          <p className="text-bases font-semibold">
            {formatCentsToBRL(productVariantPriceInCents * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
