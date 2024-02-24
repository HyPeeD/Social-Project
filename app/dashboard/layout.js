import Sidebar from "@/app/dashboard/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { INSTAGRAM_PAGES_AUTH_URL } from "@/config";

// shadow colors [green: 11b08c, violet: cf1c96, orange: ff8900]
const colors = ["11b08c", "cf1c96", "ff8900"];
export default async function Layout({ children }) {
    const session = await auth();
    const hasStory = true;
    return (
        <div className="flex h-dvh w-dvh font-sans">
            <Sidebar />
            <ScrollArea className="h-full w-full">
                <div className="flex gap-4 h-[60px] items-center py-3 px-6 w-full">
                    <span className=" text-sm">Connected to</span>
                    {session.user.pages?.map((page) => (
                        <Avatar
                            key={page.id}
                            style={{
                                boxShadow:
                                    hasStory &&
                                    `0 0 0 1.7px #${
                                        colors[
                                            Math.floor(
                                                Math.random() * colors.length
                                            )
                                        ]
                                    }`,
                            }}
                            className={`hover:opacity-90 w-9 h-9 box-content border-transparent border-2`}>
                            <Link
                                href={`/dashboard/planner/${page.id}`}
                                className="w-full h-full">
                                <AvatarImage src={page.avatar} />
                                <AvatarFallback>
                                    {page.username.split("")[0].toUpperCase()}
                                </AvatarFallback>
                            </Link>
                        </Avatar>
                    ))}
                    {session.user.pages?.length > 0 && (
                        <Separator orientation="vertical" />
                    )}
                    <Link
                        href={INSTAGRAM_PAGES_AUTH_URL}
                        className="w-10 h-10 hover:opacity-80 flex items-center justify-center border rounded-full">
                        <Plus className="w-6 h-6" />
                    </Link>
                </div>
                <Separator />
                {children}
            </ScrollArea>
        </div>
    );
}
