"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { formatCentsToBRL } from "@/helpers/money";

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

  const handleDecrement = () =>
    setQuantity((prev) => (prev <= 1 ? prev : prev - 1));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  return (
    <div className="flex items-center gap-6">
      <Image
        src={productVariantUrl}
        alt={productName}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-[86px] rounded-xl"
      />

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{productName}</h3>
            <p className="text-sm">{productVariantName}</p>
          </div>

          <Button variant={"outline"} className="mr-5 self-end">
            <Trash2 size={25} />
          </Button>
        </div>
        <div className="flex items-end justify-between">
          <div className="grid grid-cols-3 items-center justify-center overflow-hidden rounded-lg border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecrement}
              className="border-none"
              disabled={quantity <= 1}
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

          <p className="text-lg font-semibold">
            {formatCentsToBRL(productVariantPriceInCents * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
