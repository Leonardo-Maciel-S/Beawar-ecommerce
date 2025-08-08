"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { RemoveCartProductSchema } from "./schema";

export const removeCartProduct = async (data: RemoveCartProductSchema) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  // Verifica se o produto está no carrinho
  const cartItem = await db.query.cartItemTable.findFirst({
    where: eq(cartItemTable.id, data.cartItemId),
    with: {
      cart: true,
    },
  });

  if (cartItem?.cart.userId !== session.user.id) {
    throw new Error("Essa sacola não é do usuário logado.");
  }

  if (!cartItem) {
    throw new Error("Item já deletado ou não estava no carrinho.");
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
};
