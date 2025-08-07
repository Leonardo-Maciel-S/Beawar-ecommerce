import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelect from "@/components/common/category-selector";
import ProductsList from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    with: {
      variants: true,
    },

    orderBy: [desc(productTable.createdAt)],
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductsList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategorySelect categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductsList products={newlyCreatedProducts} title="Novos produtos" />
      </div>
    </>
  );
};

export default Home;
