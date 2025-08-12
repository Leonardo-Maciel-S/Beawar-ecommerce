"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { createAddress } from "@/actions/create-address";
import { createAddressSchema } from "@/actions/create-address/schema";
import { queryClient } from "@/providers/react-query";

export const getUseCreateAddressMutationKey = () => ["createAddress"];

export function useCreateAddress() {
  return useMutation({
    mutationKey: getUseCreateAddressMutationKey(),
    mutationFn: async (data: z.infer<typeof createAddressSchema>) => {
      return await createAddress(data);
    },
    onSuccess: () => {
      toast.success("Endereço cadastrado com sucesso!");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao cadastrar endereço",
      );
    },
  });
}
