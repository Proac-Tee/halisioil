"use client";
import React, { type FC, useState } from "react";
import type { ImageContent, TableProps } from "~/lib/types";
import { api } from "~/trpc/react";
import LoadingComponent from "./LoadingComponent";
import TablePagination from "./TablePagination";
import Skeleton from "./Skeleton";
import Dropdown from "./Dropdown";
import { useDropdown } from "~/hooks/useDropdown";
import BulkDeleteModal from "./BulkDeleteModal";
import dayjs from "~/utils/dayjsConfig";

const ProductTable: FC<TableProps> = ({ page, per_page }) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const products = api.product.getAllProducts.useQuery();

  const { dropdownId, setDropdownId, dropdownRef } = useDropdown();

  // Calculate pagination values
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries =
    products &&
    products.data?.slice(start, end).map((entry) => ({
      id: entry.id,
      name: entry.name,
      imagePaths: entry.imagePaths as ImageContent[],
      status: entry.status as string,
      createdAt: entry.createdAt,
    }));

  const toggleSelectAll = () => {
    if (selectedItems.size === entries?.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(entries?.map((item) => item.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(id)) {
      newSelectedItems.delete(id);
    } else {
      newSelectedItems.add(id);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleClick = (productId: string) => {
    setDropdownId((prevId) => (prevId === productId ? "" : productId));
  };

  const handleModalToggle = () => {
    const ids = Array.from(selectedItems);
    const keys: string[] = [];

    entries?.forEach((entry) => {
      if (ids.includes(entry.id)) {
        entry.imagePaths.forEach((image) => keys.push(image.key));
      }
    });

    setSelectedId(ids); // For bulk delete, pass a comma-separated list
    setSelectedKeys(keys);
    setDeleteModal(true); // Open the modal
  };

  if (products.isPending)
    return (
      <div className="mx-auto flex w-[100%] max-w-[1440px] items-center justify-center p-4">
        <LoadingComponent />
      </div>
    );

  return (
    <>
      {deleteModal && (
        <BulkDeleteModal
          ids={selectedId}
          keys={selectedKeys}
          onClose={() => setDeleteModal(false)}
          onSelected={() => setSelectedItems(new Set())}
        />
      )}

      {products && products.data && products.data.length > 0 ? (
        <section className="max-w-[1000px]">
          <section className="my-[1rem]">
            {selectedItems && selectedItems.size > 0 && (
              <button
                className="flex h-[40px] w-fit cursor-pointer items-center gap-[1rem] border-none px-[1rem] py-[0.625rem] hover:bg-gray-100 focus:outline-none"
                onClick={handleModalToggle}
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.59049 1.87502H11.4084C11.5887 1.8749 11.7458 1.8748 11.8941 1.89849C12.4802 1.99208 12.9874 2.35762 13.2615 2.88403C13.3309 3.01727 13.3805 3.16634 13.4374 3.33745L13.5304 3.61654C13.5461 3.66378 13.5507 3.67715 13.5545 3.68768C13.7004 4.09111 14.0788 4.36383 14.5076 4.3747C14.5189 4.37498 14.5327 4.37503 14.5828 4.37503H17.0828C17.4279 4.37503 17.7078 4.65485 17.7078 5.00003C17.7078 5.34521 17.4279 5.62503 17.0828 5.62503H2.91602C2.57084 5.62503 2.29102 5.34521 2.29102 5.00003C2.29102 4.65485 2.57084 4.37503 2.91602 4.37503H5.41609C5.46612 4.37503 5.47993 4.37498 5.49121 4.3747C5.92009 4.36383 6.29844 4.09113 6.44437 3.6877C6.44821 3.67709 6.45262 3.66401 6.46844 3.61654L6.56145 3.33747C6.61836 3.16637 6.66795 3.01728 6.73734 2.88403C7.01146 2.35762 7.51862 1.99208 8.1047 1.89849C8.25306 1.8748 8.41016 1.8749 8.59049 1.87502ZM7.50614 4.37503C7.54907 4.29085 7.5871 4.20337 7.61983 4.1129C7.62977 4.08543 7.63951 4.05619 7.65203 4.01861L7.7352 3.7691C7.81118 3.54118 7.82867 3.49469 7.84602 3.46137C7.9374 3.2859 8.10645 3.16405 8.30181 3.13285C8.33892 3.12693 8.38854 3.12503 8.6288 3.12503H11.37C11.6103 3.12503 11.6599 3.12693 11.697 3.13285C11.8924 3.16405 12.0614 3.2859 12.1528 3.46137C12.1702 3.49469 12.1877 3.54117 12.2636 3.7691L12.3468 4.01846L12.379 4.11292C12.4117 4.20338 12.4498 4.29085 12.4927 4.37503H7.50614Z"
                      fill="#363636"
                    />
                    <path
                      d="M4.92859 7.04179C4.90563 6.69738 4.60781 6.43679 4.2634 6.45975C3.91899 6.48271 3.6584 6.78053 3.68136 7.12494L4.06757 12.9181C4.13881 13.987 4.19636 14.8505 4.33134 15.528C4.47167 16.2324 4.71036 16.8208 5.20335 17.2821C5.69635 17.7433 6.2993 17.9423 7.01151 18.0355C7.69653 18.1251 8.56189 18.125 9.63318 18.125H10.3656C11.4369 18.125 12.3023 18.1251 12.9873 18.0355C13.6995 17.9423 14.3025 17.7433 14.7955 17.2821C15.2885 16.8208 15.5272 16.2324 15.6675 15.528C15.8025 14.8505 15.86 13.987 15.9313 12.9181L16.3175 7.12494C16.3404 6.78053 16.0799 6.48271 15.7354 6.45975C15.391 6.43679 15.0932 6.69738 15.0702 7.04179L14.687 12.7911C14.6121 13.9143 14.5587 14.6958 14.4416 15.2838C14.328 15.8542 14.1694 16.1561 13.9415 16.3692C13.7137 16.5824 13.4019 16.7206 12.8252 16.796C12.2307 16.8738 11.4474 16.875 10.3217 16.875H9.67718C8.55148 16.875 7.76814 16.8738 7.17364 16.796C6.59697 16.7206 6.28518 16.5824 6.05733 16.3692C5.82949 16.1561 5.67088 15.8542 5.55725 15.2838C5.44011 14.6958 5.38675 13.9143 5.31187 12.7911L4.92859 7.04179Z"
                      fill="#363636"
                    />
                    <path
                      d="M7.8539 8.5448C8.19737 8.51045 8.50364 8.76104 8.53799 9.10451L8.95466 13.2712C8.989 13.6146 8.73841 13.9209 8.39495 13.9553C8.05148 13.9896 7.74521 13.739 7.71086 13.3956L7.29419 9.22889C7.25985 8.88542 7.51044 8.57915 7.8539 8.5448Z"
                      fill="#363636"
                    />
                    <path
                      d="M12.1449 8.5448C12.4884 8.57915 12.739 8.88542 12.7047 9.22889L12.288 13.3956C12.2536 13.739 11.9474 13.9896 11.6039 13.9553C11.2604 13.9209 11.0098 13.6146 11.0442 13.2712L11.4609 9.10451C11.4952 8.76104 11.8015 8.51045 12.1449 8.5448Z"
                      fill="#363636"
                    />
                  </svg>
                </span>
                Delete Selected
              </button>
            )}
          </section>
          <section className="z-10 min-h-[50vh] overflow-y-hidden overflow-x-scroll pb-[6rem]">
            <div
              ref={dropdownRef}
              className="relative z-10 mb-[1rem] h-auto w-[1000px] rounded-[0.75rem] border-[1px] border-[#1C1C1C1A]"
            >
              <div className="product-table h-[40px]">
                <p className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === entries?.length}
                    onChange={toggleSelectAll}
                    className="h-[0.75rem] w-[0.75rem]"
                  />
                </p>

                <p className="truncate p-[0.75rem] text-left text-[0.75rem] font-semibold leading-[1rem] text-[#84919A]">
                  Product Name
                </p>
                <p className="truncate p-[0.75rem] text-left text-[0.75rem] font-semibold leading-[1rem] text-[#84919A]">
                  Create At
                </p>
                <p className="truncate p-[0.75rem] text-left text-[0.75rem] font-semibold leading-[1rem] text-[#84919A]">
                  Status
                </p>
                <p className="truncate p-[0.75rem] text-center text-[0.75rem] font-semibold leading-[1rem] text-[#84919A]"></p>
              </div>
              {entries?.map((data) => (
                <div key={data.id} className="relative">
                  <div className="product-table border-t-[1px] border-t-[#1C1C1C1A] text-[#252c32]">
                    <p className="flex h-[100%] w-[100%] items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(data.id)}
                        onChange={() => toggleSelectItem(data.id)}
                        className="h-[0.75rem] w-[0.75rem]"
                      />
                    </p>

                    <p className="truncate p-[0.75rem] text-left text-[0.875rem] font-[400] text-[#252c32]">
                      {data.name}
                    </p>
                    <p className="truncate p-[0.75rem] text-left text-[0.875rem] font-[400] text-[#252c32]">
                      {dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </p>

                    <p
                      className={`my-[0.5rem] h-fit truncate rounded-[5rem] px-[1rem] py-[0.2rem] text-left text-[0.875rem] font-[400] ${
                        data.status === "SOLD_OUT"
                          ? "bg-[#BC8A091A] text-[#BC8A09]"
                          : data.status === "ON_HOLD"
                            ? "bg-[#AC0F051A] text-[#AC0F05]"
                            : data.status === "AVAILABLE"
                              ? "bg-[#0D875A1A] text-[#0D875A]"
                              : data.status === "COMING_SOON"
                                ? "bg-[#0077B61A] text-[#0077B6]"
                                : ""
                      }`}
                    >
                      {data.status.charAt(0).toUpperCase() +
                        data.status.slice(1).replace("_", " ")}
                    </p>

                    <div className="relative flex justify-end">
                      <button
                        onClick={() => {
                          handleClick(data.id);
                        }}
                        className="flex cursor-pointer items-center justify-center truncate p-[0.75rem] text-center text-[0.875rem] font-[400]"
                      >
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
                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </button>
                      {dropdownId === data.id && (
                        <Dropdown
                          id={data.id}
                          imagePaths={data.imagePaths}
                          viewL="View Product"
                          updateL="Update Product"
                          deleteL="Delete Product"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="flex w-[100%] flex-wrap items-center justify-between gap-[1rem] pt-[1rem]">
            <p className="text-[0.875rem] text-[#A6A8B1]">{`${selectedItems.size} of ${products.data.length} rows selected.
 `}</p>
            <TablePagination
              totalEntries={products.data}
              hasNextPage={end < products.data.length}
              hasPrevPage={start > 0}
            />
          </section>
        </section>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default ProductTable;
