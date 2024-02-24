import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(5, {
            message: "Full name must be at least 4 characters.",
        })
        .includes(" ", {
            message: "Full name must contain a space.",
        })
        .trim(),
    email: z
        .string()
        .email({
            message: "Email must be a valid email address.",
        })
        .trim(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email({
            message: "Email must be a valid email address.",
        })
        .trim(),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export const facebookTokenSchema = z.object({
    access_token: z.string(),
    long_lived_token: z.string(),
    expires_in: z.string(),
    data_access_expiration_time: z.string(),
});

export const instagramTokenSchema = z.array(
    z.object({
        instagram_business_account: z.object({
            id: z.string(),
            username: z.string(),
            name: z.string(),
            profile_picture_url: z.string().url(),
        }),
        id: z.string(),
    })
);
