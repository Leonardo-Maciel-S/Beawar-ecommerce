import Image from "next/image";
import React from "react";

const brands = [
  {
    imageURl: "/nike.png",
    name: "Nike",
  },
  {
    imageURl: "/adidas.png",
    name: "Adidas",
  },

  {
    imageURl: "/puma.png",
    name: "Puma",
  },

  {
    imageURl: "/new-balance.png",
    name: "New Balance",
  },
];

const Brands = () => {
  return (
    <div className="space-y-6 pb-5">
      <h3 className="px-5 text-base font-semibold">Marcas parceiras</h3>

      <div className="flex items-center gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="flex size-20 items-center justify-center rounded-2xl border-[1.6px] border-[#F1F1F1]">
              <Image
                src={brand.imageURl}
                alt={brand.name}
                width={45}
                height={45}
              />
            </div>

            <h3 className="truncate text-sm font-medium">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
