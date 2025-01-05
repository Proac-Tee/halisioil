import { privateAdminProcedure, privateProcedure } from "./../trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter } from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        pricePaid: z
          .number()
          .min(0, "Price paid must be greater than or equal to 0"),
        status: z.string().optional().default("pending"),
        userId: z.string(),
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newOrder = await ctx.db.order.create({
          data: {
            pricePaid: input.pricePaid,
            status: input.status,
            user: {
              connect: { id: input.userId }, // Connect to the existing user
            },
            product: {
              connect: { id: input.productId }, // Connect to the existing product
            },
          },
        });

        return newOrder;
      } catch (error) {
        // Error handling for Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new Error("Unique constraint violation.");
          }
        }
        throw error; // Rethrow unexpected errors
      }
    }),

  getAllOrders: privateAdminProcedure.query(async ({ ctx }) => {
    const order = await ctx.db.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return order ?? null;
  }),

  getAllOrdersByAUser: privateProcedure
    .input(
      z.object({
        userId: z.string().min(1, "Order ID is required"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      return ctx.db.order.findMany({
        where: {
          userId: userId,
        },
      });
    }),
});
