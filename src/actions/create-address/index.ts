"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { createAddressSchema } from "./schema";

export type CreateAddressData = z.infer<typeof createAddressSchema>;

export async function createAddress(data: CreateAddressData) {
  try {
    // Valida os dados com o schema
    createAddressSchema.parse(data);

    // Verifica se o usuário está autenticado
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    // Cria o endereço no banco de dados
    const [newAddress] = await db
      .insert(shippingAddressTable)
      .values({
        userId: session.user.id,
        email: data.email,
        fullName: data.fullName,
        cpf: data.cpf,
        phone: data.phone,
        cep: data.cep,
        address: data.address,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      })
      .returning();

    return {
      success: true,
      data: newAddress,
    };
  } catch (error) {
    console.error("[CREATE_ADDRESS]", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro ao criar endereço",
    };
  }
}
