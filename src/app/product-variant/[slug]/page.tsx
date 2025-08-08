import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import ProductsList from "@/components/common/products-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./_components/product-actions";
import VariantSelector from "./_components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <div className="mb-6 flex flex-col space-y-6 px-5">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full max-w-md rounded-3xl object-cover"
        />

        <VariantSelector
          variants={productVariant.product.variants}
          slugSelected={slug}
        />

        <div className="space-y-1">
          <div>
            <h3 className="text-lg font-semibold">
              {productVariant.product.name}
            </h3>
            <h3 className="text-muted-foreground text-sm">
              {productVariant.name}
            </h3>
          </div>

          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <ProductActions productVariantId={productVariant.id} />

        <p className="text-sm">{productVariant.product.description}</p>
      </div>

      <ProductsList products={likelyProducts} title="Você também pode gostar" />

      <Footer />
    </>
  );
};

export default ProductVariantPage;
