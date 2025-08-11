"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseProductFromCart } from "@/hooks/mutations/use-decrease-product-from-cart";
import { useIncreaseProductFromCart } from "@/hooks/mutations/use-increase-product-from-cart";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productVariantId: string;
  productName: string;
  productVariantName: string;
  productVariantUrl: string;
  productVariantPriceInCents: number;
  initialQuantity: number;
}

const CartItem = ({
  id,
  productVariantId,
  productName,
  productVariantName,
  productVariantUrl,
  productVariantPriceInCents,
  initialQuantity,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const removeCartProductItem = useRemoveProductFromCart({ cartItemId: id });

  const decreaseCartItem = useDecreaseProductFromCart({
    cartItemId: id,
  });

  const increaseCartItem = useIncreaseProductFromCart({
    productVariantId: productVariantId,
  });

  const handleDecrement = () => {
    decreaseCartItem.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido com sucesso.");
      },
    });

    if (quantity >= 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    increaseCartItem.mutate(undefined, {
      onSuccess: () => {
        toast.error("Produto adicionado");
      },
    });

    setQuantity((prev) => prev + 1);
  };

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
              disabled={increaseCartItem.isPending}
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
