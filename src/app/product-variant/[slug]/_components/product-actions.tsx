"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-carts-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () =>
    setQuantity((prev) => (prev <= 1 ? prev : prev - 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-base font-medium">Quantidade</h2>
        <div className="grid w-[100px] grid-cols-3 items-center justify-center overflow-hidden rounded-lg border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDecrement}
            className="border-none"
            disabled={quantity <= 1}
          >
            <Minus />
          </Button>
          <p className="flex h-full items-center justify-center text-center">
            {quantity}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleIncrement}
            className="border-none"
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />

        <Button
          className="w-full rounded-full bg-[#5131E8] text-white"
          size="lg"
        >
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
