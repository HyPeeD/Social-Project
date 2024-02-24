import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export async function getUserById(id) {
    return await db.User.findUnique({ where: { id } });
}

export async function getUserByEmail(email) {
    return await db.User.findUnique({ where: { email } });
}

export async function getUserPages(id) {
    return await db.Page.findMany({ where: { OwnerId: id } });
}

export async function createPostForPage(id, postData) {
    const page = await db.Page.findUnique({
        where: { id },
    });

    if (!page) {
        return {
            success: false,
            message: "No page found!",
        };
    }

    const post = await db.Post.create({
        data: {
            ...postData,
            for: id,
        },
    });

    return {
        success: true,
        message: post,
    };
}

export async function getPostsForPage(id) {
    return await db.Post.findMany({
        where: { for: id },
    });
}
