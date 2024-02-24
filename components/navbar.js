import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlignCenter } from "lucide-react";
import { ToggleTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Component({ session }) {
    const routes = [
        { name: "Feauture", path: "/feauture" },
        { name: "Pricing", path: "/pricing" },
        { name: "About", path: "/about" },
    ];
    return (
        <>
            <div className="flex gap-4 items-center py-3 px-20 w-full justify-between text-lg">
                <Link href={"/"} className="flex items-center gap-2 text-xl">
                    <AlignCenter />
                    {process.env.PUBLIC_APP_NAME}
                </Link>
                <div
                    className={`grid grid-flow-col grid-cols-${routes.length} gap-20 items-center`}>
                    {routes.map((route) => (
                        <Link
                            href={route.path}
                            key={route.path}
                            className={cn(
                                buttonVariants({ variant: "link" }),
                                "text-lg"
                            )}>
                            {route.name}
                        </Link>
                    ))}
                </div>
                <div className="flex gap-4 items-center h-full">
                    {session ? (
                        <Link href={"/dashboard"}>
                            <Avatar>
                                <AvatarImage src={session.user?.image} />
                                <AvatarFallback>
                                    {(
                                        session.user?.name.split("")[0] || "U"
                                    ).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Link
                            href={"/login"}
                            className={cn(
                                buttonVariants({ variant: "default" })
                            )}>
                            Login
                        </Link>
                    )}
                    <ToggleTheme />
                </div>
            </div>
        </>
    );
}
