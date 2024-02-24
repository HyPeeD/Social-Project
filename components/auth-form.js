"use client";

import { AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { login, register } from "@/lib/actions";
import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/lib/zodSchemas";

export default function UserAuthForm({ auth, ...props }) {
    auth = z.enum(["login", "register"]).safeParse(auth?.toLowerCase());
    if (!auth.success) {
        throw new Error(auth.error);
    }

    function capitalizeFirstChar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const otherLogin = false;
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(object) {
        setError(null);
        setSuccess(null);
        setLoading(true);

        const func = auth.data === "register" ? register : login;
        const response = await func(object);
        {
            !response.success && setError(response.message);
        }
        {
            response.success && setSuccess(response.message);
        }
        setLoading(false);
    }

    const form = useForm({
        resolver: zodResolver(
            auth.data === "register" ? registerSchema : loginSchema
        ),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    return (
        <div className="space-y-6 max-w-md">
            <div className="grid space-y-2 text-center">
                <h1 className="text-4xl lg:text-3xl font-semibold tracking-tight">
                    {auth.data === "login"
                        ? "Welcome back Fella!"
                        : "Create an account ?"}
                </h1>
                <p className="text-base text-muted-foreground">
                    {auth.data === "login"
                        ? "Fill up the form below to continue ;)"
                        : "Fill up the form below to get started!"}
                </p>
            </div>
            <Form {...form}>
                <form
                    {...props}
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-5">
                    <div className="space-y-2">
                        {auth.data === "register" && (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel />
                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                disabled={loading}
                                                placeholder="Full name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel />
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            placeholder="Email"
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel />
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            autoComplete="off"
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {error && (
                        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <p>{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                            <CheckCircle className="h-4 w-4" />
                            <p>{success}</p>
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {capitalizeFirstChar(auth.data)}
                    </Button>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking {capitalizeFirstChar(auth.data)}, you agree
                        to our{" "}
                        <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </form>
            </Form>
        </div>
    );
}
