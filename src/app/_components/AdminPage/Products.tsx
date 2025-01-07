import React, { Suspense } from "react";
import ProductForm from "./ProductForm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingComponent from "~/utils/LoadingComponent";

const ProductsComponent = () => {
  const searchParams = useSearchParams();
  const active_section = searchParams.get("product_action");

  const pathname = usePathname();
  const router = useRouter();

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  // Function to render the component based on `toggled url state`
  const renderComponent = () => {
    switch (active_section) {
      case "create":
        return <ProductForm />;
      default:
        return (
          <div>
            <button
              onClick={() => updateQueryParams("product_action", "create")}
              className="flex items-center gap-[1rem] rounded-full bg-blue-500 px-[1rem] py-2 text-white"
              type="button"
            >
              Add Product
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        );
    }
  };

  return <section>{renderComponent()}</section>;
};

const Products = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ProductsComponent />
    </Suspense>
  );
};

export default Products;
