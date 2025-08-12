"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/actions/get-user-addresses";

export const getUseUserAddressesQueryKey = () => ["userAddresses"];

export function useUserAddresses() {
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
