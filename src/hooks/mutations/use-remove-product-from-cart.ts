import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeCartProduct } from "@/app/actions/remove-cart-product";
import { queryClient } from "@/providers/react-query";

import { getUseCartQueryKey } from "../queries/user-cart";

export const REMOVE_PRODUCT_FROM_CART_MUTATION_KEY = (cartItemId: string) =>
  ["removeCartItem", cartItemId] as const;

export const useRemoveProductFromCart = ({
  cartItemId,
}: {
  cartItemId: string;
}) => {
  return useMutation({
    mutationKey: REMOVE_PRODUCT_FROM_CART_MUTATION_KEY(cartItemId),
    mutationFn: () =>
      removeCartProduct({
        cartItemId: cartItemId,
      }),
    onSuccess: () => {
      toast.success("Produto removido com sucesso.");
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
      });
    },

    onError: () => {
      toast.error("Erro inesperado, tente novamente.");
    },
  });
};
