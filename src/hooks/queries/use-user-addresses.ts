"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/actions/get-user-addresses";
import { shippingAddressTable } from "@/db/schema";

export const getUseUserAddressesQueryKey = () => ["userAddresses"];

export function useUserAddresses(params: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) {
  return useQuery({
    queryKey: getUseUserAddressesQueryKey(),
    queryFn: async () => {
      const response = await getUserAddresses();

      if (!response.success) {
        throw new Error(response.error);
      }

      return response.data;
    },
  });
}
