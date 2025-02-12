"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import type { IProductPageSchema, ImageContent } from "~/lib/types";
import LoadingComponent from "~/utils/LoadingComponent";
import ProductCard from "~/utils/ProductCard";
import TablePagination from "~/utils/TablePagination";

const ShopComponent = ({
  products,
}: {
  products: {
    id: string;
    name: string;
    imagePaths: ImageContent[];
    productCategories: {
      categoryId: string;
      price: number;
      category: { name: string };
    }[];
    status: string;
    properties: string[];
    description: string;
    createdAt: Date;
  }[];
}) => {
  const productsLength = products?.length;

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10); // Ensure page is a number
  const per_page = 10;

  const sort_by = searchParams.get("sort_by");

  if (products) {
    if (sort_by === "Oldest First") {
      products.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else if (sort_by === "Newest First") {
      products.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
  }

  // Calculate pagination values
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = products?.slice(start, end).map((entry) => ({
    id: entry.id,
    name: entry.name,
    imagePaths: entry.imagePaths,
    productCategories: entry.productCategories,
    status: entry.status,
    properties: entry.properties,
    createdAt: entry.createdAt,
    description: entry.description,
  }));

  if (products.length === 0) {
    return (
      <div className="flex min-h-[100vh] justify-center py-[2rem] md:h-[248px]">
        <p className="text-[1rem] text-[#898989]">No data found</p>
      </div>
    );
  }

  return (
    <section className="w-[100%]">
      <div className="min-h-[70vh]">
        {entries && <ProductCard products={entries} />}
      </div>

      <section className="mt-[6rem] py-[2rem]">
        {productsLength && (
          <TablePagination
            totalEntries={products as unknown as IProductPageSchema[]}
            hasNextPage={end < productsLength}
            hasPrevPage={start > 0}
          />
        )}
      </section>
    </section>
  );
};

const Shop = ({
  products,
}: {
  products: {
    id: string;
    name: string;
    imagePaths: ImageContent[];
    productCategories: {
      categoryId: string;
      price: number;
      category: { name: string };
    }[];
    status: string;
    properties: string[];
    description: string;
    createdAt: Date;
  }[];
}) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ShopComponent products={products} />
    </Suspense>
  );
};

export default Shop;
