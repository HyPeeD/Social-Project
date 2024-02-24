import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db, getUserById } from "@/lib/database";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error",
    },
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                try {
                    session.user.pages = await db.Page.findMany({
                        where: {
                            OwnerId: token.sub,
                        },
                    });
                } catch (error) {
                    session.user.pages = [];
                }
            }

            return session;
        },
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
});
