import z from "zod";

export const decreaseCartProductQuantity = z.object({
  cartItemId: z.uuid(),
});

export type DecreaseCartProductQuantity = z.infer<
  typeof decreaseCartProductQuantity
>;
