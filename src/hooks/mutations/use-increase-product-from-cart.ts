"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { addCartProduct } from "@/app/actions/add-cart-product";
import { queryClient } from "@/providers/react-query";

import { getUseCartQueryKey } from "../queries/user-cart";

export const getUseIncreaseProductFormCartMutationKey = (
  productVariantId: string,
) => ["increaseCartItem", productVariantId];

export const useIncreaseProductFromCart = ({
  productVariantId,
}: {
  productVariantId: string;
}) => {
  return useMutation({
    mutationKey: getUseIncreaseProductFormCartMutationKey(productVariantId),
    mutationFn: () =>
      addCartProduct({
        productVariantId: productVariantId,
        quantity: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
