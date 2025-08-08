"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const getCart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      cart: null,
      error: "Faça login para visualizar a sacola.",
    };
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    const newCart = await db.insert(cartTable).values({
      userId: session.user.id,
    });

    return {
      cart: {
        ...newCart,
        items: [],
        totalPriceInCents: 0,
      },

      error: null,
    };
  }

  return {
    cart: {
      ...cart,
      totalPriceInCents: cart.items.reduce(
        (acc, item) => item.quantity * item.productVariant.priceInCents + acc,
        0,
      ),
    },

    error: null,
  };
};
