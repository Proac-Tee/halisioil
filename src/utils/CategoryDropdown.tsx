"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { type FC, Suspense } from "react";
import LoadingComponent from "./LoadingComponent";
import { type CategoryDropdownProps } from "~/lib/types";

const CategoryDropdownComponent: FC<CategoryDropdownProps> = ({
  id,
  viewL,
  updateL,
  deleteL,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const deleteCategoryHandler = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category_delete", id);
    params.set("case", "category_delete");
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const updateCategoryHandler = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category_update", id);
    params.set("case", "category_update");
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <section>
      <div className="absolute right-[1rem] top-[2.5rem] z-20 h-[122px] w-[240px] rounded-[0.5rem] border-[1px] border-[#F2F4F7] bg-white text-[0.875rem]">
        <ul className="relative">
          <li>
            <Link
              href={`${pathname}/${id}`}
              className="flex h-[40px] w-[100%] cursor-pointer items-center gap-[1rem] px-[1rem] py-[0.625rem] hover:bg-gray-100"
            >
              <span>
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99935 4.87516C7.27346 4.87516 5.87435 6.27427 5.87435 8.00016C5.87435 9.72605 7.27346 11.1252 8.99935 11.1252C10.7252 11.1252 12.1243 9.72605 12.1243 8.00016C12.1243 6.27427 10.7252 4.87516 8.99935 4.87516ZM7.12435 8.00016C7.12435 6.96463 7.96382 6.12516 8.99935 6.12516C10.0349 6.12516 10.8743 6.96463 10.8743 8.00016C10.8743 9.0357 10.0349 9.87516 8.99935 9.87516C7.96382 9.87516 7.12435 9.0357 7.12435 8.00016Z"
                    fill="#363636"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99935 0.708496C5.23757 0.708496 2.70376 2.96199 1.23315 4.87255L1.20663 4.907C0.874048 5.33894 0.567732 5.73676 0.359922 6.20716C0.137386 6.71089 0.0410156 7.2599 0.0410156 8.00016C0.0410156 8.74042 0.137386 9.28944 0.359922 9.79317C0.567734 10.2636 0.87405 10.6614 1.20664 11.0933L1.23316 11.1278C2.70376 13.0383 5.23757 15.2918 8.99935 15.2918C12.7611 15.2918 15.2949 13.0383 16.7655 11.1278L16.792 11.0934C17.1246 10.6614 17.431 10.2636 17.6388 9.79317C17.8613 9.28944 17.9577 8.74042 17.9577 8.00016C17.9577 7.2599 17.8613 6.71089 17.6388 6.20716C17.431 5.73676 17.1246 5.33893 16.792 4.90698L16.7655 4.87255C15.2949 2.96199 12.7611 0.708496 8.99935 0.708496ZM2.2237 5.635C3.58155 3.87093 5.79131 1.9585 8.99935 1.9585C12.2074 1.9585 14.4172 3.87093 15.775 5.63499C16.1405 6.10982 16.3546 6.39354 16.4954 6.71229C16.627 7.01018 16.7077 7.37428 16.7077 8.00016C16.7077 8.62605 16.627 8.99015 16.4954 9.28804C16.3546 9.60678 16.1405 9.8905 15.775 10.3653C14.4172 12.1294 12.2074 14.0418 8.99935 14.0418C5.79132 14.0418 3.58155 12.1294 2.2237 10.3653C1.85821 9.8905 1.64413 9.60678 1.50331 9.28804C1.37171 8.99015 1.29102 8.62605 1.29102 8.00016C1.29102 7.37428 1.37171 7.01018 1.50331 6.71229C1.64413 6.39354 1.85821 6.10982 2.2237 5.635Z"
                    fill="#363636"
                  />
                </svg>
              </span>
              {viewL}
            </Link>
          </li>
          <li>
            <button
              onClick={updateCategoryHandler}
              className="flex h-[40px] w-[100%] cursor-pointer items-center gap-[1rem] px-[1rem] py-[0.625rem] hover:bg-gray-100"
            >
              <span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1068_1505)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.95697 0.9375L10.125 0.9375C10.4357 0.9375 10.6875 1.18934 10.6875 1.5C10.6875 1.81066 10.4357 2.0625 10.125 2.0625H9C7.21633 2.0625 5.93517 2.06369 4.96018 2.19478C4.00138 2.32369 3.42334 2.56886 2.9961 2.9961C2.56886 3.42334 2.32369 4.00138 2.19478 4.96018C2.06369 5.93517 2.0625 7.21633 2.0625 9C2.0625 10.7837 2.06369 12.0648 2.19478 13.0398C2.32369 13.9986 2.56886 14.5767 2.9961 15.0039C3.42334 15.4311 4.00138 15.6763 4.96018 15.8052C5.93517 15.9363 7.21633 15.9375 9 15.9375C10.7837 15.9375 12.0648 15.9363 13.0398 15.8052C13.9986 15.6763 14.5767 15.4311 15.0039 15.0039C15.4311 14.5767 15.6763 13.9986 15.8052 13.0398C15.9363 12.0648 15.9375 10.7837 15.9375 9V7.875C15.9375 7.56434 16.1893 7.3125 16.5 7.3125C16.8107 7.3125 17.0625 7.56434 17.0625 7.875V9.04303C17.0625 10.7743 17.0625 12.1311 16.9202 13.1897C16.7745 14.2733 16.4705 15.1283 15.7994 15.7994C15.1283 16.4705 14.2733 16.7745 13.1897 16.9202C12.1311 17.0625 10.7743 17.0625 9.04303 17.0625H8.95697C7.22567 17.0625 5.8689 17.0625 4.81028 16.9202C3.72673 16.7745 2.87171 16.4705 2.2006 15.7994C1.52949 15.1283 1.22549 14.2733 1.07981 13.1897C0.937483 12.1311 0.937491 10.7743 0.9375 9.04303V8.95697C0.937491 7.22567 0.937483 5.86889 1.07981 4.81028C1.22549 3.72673 1.52949 2.87171 2.2006 2.2006C2.87171 1.5295 3.72673 1.22549 4.81028 1.07981C5.86889 0.937483 7.22567 0.937491 8.95697 0.9375ZM12.5779 1.70694C13.6038 0.681022 15.2671 0.681022 16.2931 1.70694C17.319 2.73285 17.319 4.39619 16.2931 5.4221L11.307 10.4082C11.0285 10.6867 10.8541 10.8611 10.6594 11.013C10.4302 11.1918 10.1821 11.3451 9.91961 11.4702C9.69676 11.5764 9.46271 11.6544 9.08909 11.7789L6.91069 12.505C6.50851 12.6391 6.0651 12.5344 5.76533 12.2347C5.46556 11.9349 5.36089 11.4915 5.49495 11.0893L6.22108 8.91092C6.34559 8.53729 6.42359 8.30324 6.5298 8.08039C6.65489 7.81791 6.80821 7.56984 6.98703 7.34056C7.13887 7.1459 7.31333 6.97147 7.59183 6.693L12.5779 1.70694ZM15.4976 2.50243C14.911 1.91586 13.96 1.91586 13.3734 2.50243L13.0909 2.7849C13.108 2.85679 13.1318 2.94245 13.1649 3.038C13.2724 3.34779 13.4758 3.75579 13.86 4.14C14.2442 4.5242 14.6522 4.7276 14.962 4.83508C15.0575 4.86823 15.1432 4.89205 15.2151 4.90907L15.4976 4.62661C16.0841 4.04003 16.0841 3.08901 15.4976 2.50243ZM14.3289 5.79532C13.9419 5.6289 13.4911 5.36209 13.0645 4.93549C12.6379 4.50889 12.3711 4.05812 12.2047 3.67114L8.41313 7.46269C8.10074 7.77508 7.97823 7.89897 7.87411 8.03246C7.74553 8.19731 7.6353 8.37567 7.54536 8.56439C7.47252 8.71722 7.41651 8.8822 7.2768 9.30131L6.95288 10.2731L7.72693 11.0471L8.69869 10.7232C9.1178 10.5835 9.28278 10.5275 9.43561 10.4546C9.62433 10.3647 9.80269 10.2545 9.96754 10.1259C10.101 10.0218 10.2249 9.89926 10.5373 9.58687L14.3289 5.79532Z"
                      fill="#363636"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1068_1505">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              {updateL}
            </button>
          </li>

          <li>
            <button
              className="flex h-[40px] w-[100%] cursor-pointer items-center gap-[1rem] border-none px-[1rem] py-[0.625rem] hover:bg-gray-100 focus:outline-none"
              onClick={deleteCategoryHandler}
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
              {deleteL}
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  id,
  viewL,
  updateL,
  deleteL,
}) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <CategoryDropdownComponent
        id={id}
        viewL={viewL}
        updateL={updateL}
        deleteL={deleteL}
      />
    </Suspense>
  );
};

export default CategoryDropdown;
