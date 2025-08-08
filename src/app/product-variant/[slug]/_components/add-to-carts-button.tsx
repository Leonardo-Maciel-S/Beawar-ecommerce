"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { addCartProduct } from "@/app/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/providers/react-query";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addCartProduct({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
  return (
    <Button
      className="w-full rounded-full"
      variant="outline"
      size="lg"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
