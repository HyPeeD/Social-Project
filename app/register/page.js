import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import UserAuthForm from "@/components/auth-form";
import { ToggleTheme } from "@/components/theme-provider";

export default function Page() {
    return (
        <>
            <div className="h-dvh w-dvw grid grid-cols-5">
                <Link
                    href="login"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-20 top-8"
                    )}>
                    Login
                </Link>
                <ToggleTheme
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-8 top-8"
                    )}
                />
                <div className="hidden lg:flex flex-col justify-between relative text-white p-10 col-span-2 ">
                    <Image
                        src={"/bg-auth.png"}
                        alt={process.env.PUBLIC_APP_NAME}
                        layout="fill"
                        objectFit="cover"
                        // objectPosition="center 33%"
                        className="absolute inset-0 h-full w-full pointer-events-none z-[-1]"
                    />
                    <Link
                        href="/"
                        className="flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6">
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        {process.env.PUBLIC_APP_NAME} Inc
                    </Link>
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Using this website for managing my social
                            media has been a game-changer. It has saved me
                            countless hours, allowing me to engage with my
                            audience more effectively and efficiently.&rdquo;
                        </p>
                        <footer className="text-sm">M9lama</footer>
                    </blockquote>
                </div>
                <div className="grid items-center justify-center lg:col-span-3 col-span-full">
                    <UserAuthForm auth={"register"} />
                </div>
            </div>
        </>
    );
}
