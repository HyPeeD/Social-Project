"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { defaultRoute } from "@/routes";
import axios from "axios";
import {
    registerSchema,
    facebookTokenSchema,
    loginSchema,
    instagramTokenSchema,
} from "@/lib/zodSchemas";
import { db, getUserByEmail } from "@/lib/database";
import { auth, signOut } from "@/auth";

export async function logout() {
    await signOut();
}

export async function addAccounts(object) {
    const facebookValidation = facebookTokenSchema.safeParse(object);
    if (!facebookValidation.success) {
        return {
            success: false,
            message: "Invalid Facebook token data.",
        };
    }

    const session = await auth();
    const {
        access_token,
        long_lived_token,
        expires_in,
        data_access_expiration_time,
    } = facebookValidation.data;

    try {
        const { data } = await axios.get(
            `https://graph.facebook.com/v19.0/me/accounts?fields=instagram_business_account{id,name,username,profile_picture_url}&access_token=${access_token}`
        );

        const instagramValidation = instagramTokenSchema.safeParse(data.data);
        if (!instagramValidation.success) {
            return {
                success: false,
                message: `Invalid Instagram data: ${instagramValidation.error}`,
            };
        }

        await db.Page.deleteMany({
            where: { OwnerId: session.user.id },
        });

        for (const page of data.data) {
            await db.Page.upsert({
                where: { id: page.instagram_business_account.id },
                update: {
                    username: page.instagram_business_account.username,
                    avatar: page.instagram_business_account.profile_picture_url,
                },
                create: {
                    id: page.instagram_business_account.id,
                    username: page.instagram_business_account.username,
                    avatar: page.instagram_business_account.profile_picture_url,
                    OwnerId: session.user.id,
                },
            });
        }

        await db.User.update({
            where: {
                id: session.user.id,
            },
            data: {
                refresh_token: long_lived_token,
            },
        });

        return {
            success: true,
            message: data.data.map((page) =>
                JSON.stringify(page.instagram_business_account)
            ),
        };
    } catch (err) {
        return {
            success: false,
            message: `An error occurred: ${err.message}`,
        };
    }
}

export async function register(object) {
    const validation = registerSchema.safeParse(object);

    if (!validation.success) {
        return {
            success: false,
            message: "Please provide a valid form name, email and password.",
        };
    }

    const email = validation.data.email;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            success: false,
            message: "Email is already in use.",
        };
    }

    try {
        const name = validation.data.name;
        const password = await bcrypt.hash(validation.data.password, 10);
        await db.User.create({
            data: {
                name,
                email,
                password,
            },
        });

        await login({ email, password: validation.data.password });

        return {
            success: true,
            message: "Successfully registered!",
        };
    } catch (err) {
        console.log("Registration", err);
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
}

export async function login(object, callbackUrl) {
    const validatedFields = loginSchema.safeParse(object);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Please provide a valid form email and password.",
        };
    }
    try {
        await signIn("credentials", {
            ...object,
            redirectTo: callbackUrl || defaultRoute,
        });

        return {
            success: true,
            message: "Successfully logged in!",
        };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        success: false,
                        message:
                            "The password that you've entered is incorrect!",
                    };
                default:
                    return {
                        success: false,
                        message: "Something went wrong!",
                    };
            }
        }

        throw error;
    }
}
