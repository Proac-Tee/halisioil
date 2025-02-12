import type Stripe from "stripe";
import { z } from "zod";

// Define the enum for product status
export const ProductStatusEnum = z.enum([
  "AVAILABLE",
  "SOLD_OUT",
  "ON_HOLD",
  "COMING_SOON",
]);

export const userPermissionEnum = z.enum([
  "NORMAL_USER",
  "ADMIN_USER",
  "SUPER_ADMIN",
]);

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  imagePaths: z
    .array(
      z.object({
        key: z.string().min(1, "Image key is required"),
        url: z.string().min(1, "Image url is required"),
        size: z.number().min(0, "Image size is required"),
        name: z.string().min(1, "Image name is required"),
      }),
    )
    .min(1, "At least one image is required"),
  status: ProductStatusEnum.optional().default("AVAILABLE"),
  properties: z.array(z.string()).optional(),
  categories: z.array(
    z.object({
      categoryId: z.string().min(1, "At least one category is required"),
      price: z
        .number()
        .min(0.01, "Price is required, must be a positive number"),
    }),
  ),
});

export const adminProductSchema = z.object({
  id: z.string().min(1, "Product id is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  imagePaths: z
    .array(
      z.object({
        key: z.string().min(1, "Image key is required"),
        url: z.string().min(1, "Image url is required"),
        size: z.number().min(0, "Image size is required"),
        name: z.string().min(1, "Image name is required"),
      }),
    )
    .min(1, "At least one image is required"),
  status: ProductStatusEnum.optional().default("AVAILABLE"),
  properties: z.array(z.string()).optional(),
  categories: z.array(
    z.object({
      categoryId: z.string().min(1, "At least one category is required"),
      price: z
        .number()
        .min(0.01, "Price is required, must be a positive number"),
    }),
  ),
});

export const updateProductSchema = z.object({
  id: z.string().min(1, "Product id is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  status: ProductStatusEnum.optional().default("AVAILABLE"),
  properties: z.array(z.string()).optional(),
  categories: z.array(
    z.object({
      categoryId: z.string().min(1, "At least one category is required"),
      price: z
        .number()
        .min(0.01, "Price is required, must be a positive number"),
    }),
  ),
});

export const clientProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  categories: z.array(
    z.object({
      categoryId: z.string().min(1, "At least one category is required"),
      price: z
        .number()
        .min(0.01, "Price is required, must be a positive number"),
    }),
  ),
  status: ProductStatusEnum.optional().default("AVAILABLE"),
  properties: z.array(z.string()).optional(),
});

export const orderSchema = z.object({
  userId: z.string().nullable().optional(), // `userId` is optional and can be null
  stripe_Session: z.object({}).passthrough().optional(), // Allow any object for now
});

export const addressSchema = z.object({
  // Address fields
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"), // Ensure the category name is provided
  productIds: z.array(z.string()).optional(), // Optionally pass an array of product IDs to associate
});

export const productCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"), // Ensure the category name is provided
  productIds: z.array(z.string()).optional(), // Optionally pass an array of product IDs to associate
});

export const categoryUpdateSchema = z.object({
  id: z.string().min(1, "Category id is required"),
  name: z.string().min(1, "Category name is required"), // Ensure the category name is provided
});

export const categoryUpdateFormSchema = z.object({
  name: z.string().min(1, "Category name is required"), // Ensure the category name is provided
});

export const userSchema = z.object({
  email: z.string().email("Must enter a valid email"),
  permission: userPermissionEnum.optional().default("NORMAL_USER"),
});

export const adminRemoveSchema = z.object({
  id: z.string().min(1, "User id is required"),
  permission: userPermissionEnum.default("NORMAL_USER"),
});

export const adminUpdateSchema = z.object({
  permission: userPermissionEnum.default("NORMAL_USER"),
});

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters" })
    .max(500, { message: "Message must not exceed 500 characters" }),
});

export type IProductSchema = z.infer<typeof productSchema>;
export type IProductPageSchema = z.infer<typeof adminProductSchema>;
export type IProductUpdateSchema = z.infer<typeof updateProductSchema>;
export type IClientProductSchema = z.infer<typeof clientProductSchema>;
export type IOrderSchema = z.infer<typeof orderSchema>;
export type ICategorySchema = z.infer<typeof categorySchema>;
export type ICategoryUpdateSchema = z.infer<typeof categoryUpdateFormSchema>;
export type IUserSchema = z.infer<typeof userSchema>;
export type IAdminUpdateSchema = z.infer<typeof adminUpdateSchema>;

export type IContactSchema = z.infer<typeof contactSchema>;

export type TImage = {
  id: number;
  link: string;
};

export type TablePaginationProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalEntries:
    | IProductSchema[]
    | IProductPageSchema[]
    | ICategorySchema[]
    | IUserSchema[]
    | IOrderSchema[];
};

export type TableProps = {
  page: number | string;
  per_page: number;
};

export type ImageContent = {
  id: string;
  key: string;
  url: string;
};

export type CategoryDropdownProps = {
  id: string;
  updateL: string;
  deleteL: string;
};

export type AdminTableDropdownProps = {
  id: string;
  updateL: string;
  deleteL: string;
};

export type DashboardProps = {
  id: string;
  imagePaths: ImageContent[];
  viewL: string;
  updateL: string;
  deleteL: string;
};

export type BannerProps = {
  prev: string;
  next: string;
  head: string;
};

// Export the updated IProductCardSchema
export type IProductCardSchema = {
  status: string;
  name: string;
  imagePaths: {
    name: string;
    key: string;
    url: string;
    size: number;
  }[];
  id: string;
  properties?: string[];
  productCategories: {
    category: {
      name: string;
      id: number;
    };
    categoryId: string;
    price: number;
  }[];
};

export type ChectOutItem = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  image?: string;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type Order = {
  id: string;
  userId: string | null; // Allow userId to be null
  status: string;
  createdAt: Date;
  stripe_Session: Stripe.Checkout.Session | null; // Allow stripe_Session to be null
};
