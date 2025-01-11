import { Prisma } from "@prisma/client";
import { z } from "zod";
import { adminRemoveSchema, userSchema } from "~/lib/types";

import {
  createTRPCRouter,
  privateAdminProcedure,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(userSchema).mutation(async ({ ctx, input }) => {
    try {
      const newUser = await ctx.db.user.create({
        data: {
          email: input.email,
          permission: input.permission,
        },
        select: {
          id: true,
          email: true,
          permission: true,
        },
      });
      return newUser;
    } catch (error) {
      // Type guard to narrow the error type
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Check if it's a unique constraint violation (e.g., for email)
        if (error.code === "P2002") {
          throw new Error("Email already in use.");
        }
      }
      throw error;
    }
  }),

  createAdmin: privateProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const adminUser = await ctx.db.user.update({
          where: {
            email: input.email,
          },
          data: {
            email: input.email,
            permission: input.permission,
          },
          select: {
            id: true,
            email: true,
            permission: true,
          },
        });
        return adminUser;
      } catch (error) {
        throw error;
      }
    }),

  getAllUsers: privateAdminProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return users ?? null;
  }),

  getAdminUsers: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findMany({
      where: {
        permission: {
          in: ["ADMIN_USER", "SUPER_ADMIN"], // Fetch users with either of these permissions
        },
      },
      orderBy: {
        permission: "desc", // Sort by permission, with SUPER_ADMIN appearing first (assuming SUPER_ADMIN > ADMIN_USER alphabetically)
      },
      select: {
        id: true,
        email: true,
        permission: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  getSingleUser: privateProcedure
    .input(
      z.object({
        userEmail: z.string().email("Invalid email format"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userEmail } = input;
      return ctx.db.user.findFirst({
        where: {
          email: userEmail,
        },
        select: {
          id: true,
          email: true,
        },
      });
    }),

  removeAdmin: privateProcedure
    .input(adminRemoveSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const adminUser = await ctx.db.user.update({
          where: {
            id: input.id,
          },
          data: {
            id: input.id,
            permission: input.permission,
          },
          select: {
            id: true,
            email: true,
            permission: true,
          },
        });
        return adminUser;
      } catch (error) {
        throw error;
      }
    }),

  delete: privateProcedure
    .input(
      z.object({
        id: z.string().min(1, "User ID is required"), // Validate 'name' is non-empty
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return ctx.db.user.delete({
        where: {
          id,
        },
      });
    }),
});
