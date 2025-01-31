import React from "react";
import Shop from "../_components/ShopPage/Shop";
import MobileSortButton from "~/utils/MobileSortButton";
import { api } from "~/trpc/server";
import { type ImageContent } from "~/lib/types";
import ShopPageNav from "../_components/ShopPage/ShopPageNav";
import MobileShopPageNav from "../_components/ShopPage/MobileShopPageNav";

async function fetchAllProducts() {
  // Fetch products from the API
  const products = await api.product.getAllProducts();

  // Convert Decimal fields (like price) to numbers
  return products.map((product) => ({
    ...product,
    price: product.price.toNumber(), // Convert Decimal to number
  })) as unknown as {
    id: string;
    name: string;
    imagePaths: ImageContent[];
    status: string;
    properties: string[];
    description: string;
    createdAt: Date;
    price: number;
  }[];
}

const ShopPage = async () => {
  const data = await fetchAllProducts();

  return (
    <section className="h-full min-h-[100vh] w-full">
      <MobileSortButton />

      <section className="flex justify-start gap-[1rem] py-[2rem]">
        <div>
          <ShopPageNav />
          <MobileShopPageNav />
        </div>
        <Shop products={data} />
      </section>
    </section>
  );
};

export default ShopPage;
