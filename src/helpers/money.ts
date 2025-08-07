export const formatCentsToBRL = (cents: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRl",
  }).format(cents / 100);
};
