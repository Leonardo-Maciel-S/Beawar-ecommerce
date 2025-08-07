import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelect = ({ categories }: CategorySelectProps) => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            variant="outline"
            key={category.id}
            className="cursor-pointer rounded-full font-semibold"
            asChild
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
