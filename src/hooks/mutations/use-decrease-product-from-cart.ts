"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import decreaseCartProductQuantity from "@/actions/decrease-cart-product-quantity";
import { queryClient } from "@/providers/react-query";

import { getUseCartQueryKey } from "../queries/user-cart";

export const getUseDecreaseProductFormCartMutationKey = (
  cartItemId: string,
) => ["decreaseCartItem", cartItemId];

export const useDecreaseProductFromCart = ({
  cartItemId,
}: {
  cartItemId: string;
}) => {
  return useMutation({
    mutationKey: getUseDecreaseProductFormCartMutationKey(cartItemId),
    mutationFn: () =>
      decreaseCartProductQuantity({
        cartItemId,
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
