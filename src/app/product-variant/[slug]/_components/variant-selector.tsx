import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[];
  slugSelected: string;
}

const VariantSelector = ({ variants, slugSelected }: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          key={variant.id}
          href={`/product-variant/${variant.slug}`}
          className={`${
            slugSelected === variant.slug ? "border-primary border-2" : ""
          } rounded-xl`}
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={60}
            height={60}
            className="h-auto w-full max-w-[100px] rounded-xl object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
