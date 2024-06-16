import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAllUsers, getUserById, insertUser } from "../models/user";
import { type userInsert } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
    get: publicProcedure.query(() => {
        return getAllUsers();
    }),

    getOne: publicProcedure
    .input(z.object({id: z.string().uuid()}))
    .query(({input}) => {
        return getUserById(input.id);
    }),

    insertNewUser: publicProcedure.input(z.object({
        firstName: z.string(), 
        middleName: z.string().optional(), 
        lastName: z.string(),
        email: z.string().email(),
        dateOfBirth: z.string().date(),
        passcodeHash: z.string()
    })).mutation(async ({input}) => {
        return await insertUser(input as userInsert);
    })
});
