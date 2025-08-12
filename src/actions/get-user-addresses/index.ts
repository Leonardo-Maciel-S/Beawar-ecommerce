"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getUserAddresses() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return {
        success: false as const,
        error: "Usuário não autenticado",
      };
    }

    const userAddresses = await db.query.shippingAddressTable.findMany({
      where: eq(shippingAddressTable.userId, session.user.id),
      orderBy: (address, { desc }) => [desc(address.createdAt)],
    });

    return {
      success: true as const,
      data: userAddresses,
    };
  } catch (error) {
    console.error("[GET_USER_ADDRESSES]", error);

    return {
      success: false as const,
      error: "Erro ao buscar endereços",
    };
  }
}
