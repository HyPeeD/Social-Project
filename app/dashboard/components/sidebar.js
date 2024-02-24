"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
    Home,
    FilePlus,
    Search,
    Image,
    CalendarDays,
    LayoutDashboard,
    Inbox,
    Trash2,
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
    LogOut,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

export default function Page() {
    const pathname = usePathname();
    const [collapse, setCollapse] = useState(
        localStorage.getItem("dashboard-sidebar-collapse") == "true"
            ? true
            : false
    );
    return (
        <>
            <TooltipProvider>
                <aside
                    className={`relative flex flex-col gap-3 ${
                        collapse ? "w-[70px]" : "w-[300px]"
                    }`}>
                    <Separator
                        className="absolute inset-0 left-full"
                        orientation="vertical"
                    />
                    <div
                        className={`flex pt-2 px-3 ${
                            collapse && "justify-center"
                        }`}>
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-full"
                            onClick={() => {
                                setCollapse(!collapse);
                                localStorage.setItem(
                                    "dashboard-sidebar-collapse",
                                    !collapse
                                );
                            }}>
                            {collapse ? <PanelLeftOpen /> : <PanelLeftClose />}
                        </Button>
                    </div>
                    <Separator />
                    <SidebarItem
                        links={[
                            {
                                title: "Home",
                                icon: Home,
                                variant: "default",
                                href: "/dashboard",
                            },
                        ].map((link) =>
                            pathname === link.href
                                ? { ...link, variant: "default" }
                                : { ...link, variant: "ghost" }
                        )}
                        collapse={collapse}
                    />
                    <SidebarItem
                        links={[
                            {
                                title: "Create",
                                icon: FilePlus,
                                variant: "ghost",
                                href: "/dashboard/create",
                            },
                            {
                                title: "Search",
                                icon: Search,
                                variant: "ghost",
                                href: "/dashboard/search",
                            },
                        ].map((link) =>
                            pathname.startsWith(link.href)
                                ? { ...link, variant: "default" }
                                : { ...link, variant: "ghost" }
                        )}
                        collapse={collapse}
                    />
                    <Separator />
                    <SidebarItem
                        links={[
                            {
                                title: "Inbox",
                                icon: Inbox,
                                variant: "secondary",
                                href: "/dashboard/inbox",
                            },
                            {
                                title: "Planner",
                                icon: CalendarDays,
                                variant: "secondary",
                                href: "/dashboard/planner",
                            },
                            {
                                title: "Media",
                                icon: Image,
                                variant: "ghost",
                                href: "/dashboard/media",
                            },
                            {
                                title: "Analytics",
                                icon: LayoutDashboard,
                                variant: "ghost",
                                href: "/dashboard/analytics",
                            },
                            {
                                title: "Trash",
                                icon: Trash2,
                                variant: "ghost",
                                href: "/dashboard/trash",
                            },
                        ].map((link) =>
                            pathname.startsWith(link.href)
                                ? { ...link, variant: "default" }
                                : { ...link }
                        )}
                        collapse={collapse}
                    />

                    <div
                        className={`flex flex-col pb-4 mt-auto px-3 ${
                            collapse && "justify-center"
                        }`}>
                        <Dialog>
                            {collapse ? (
                                <>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={"/dashboard/settings"}
                                                className={cn(
                                                    buttonVariants({
                                                        variant: "ghost",
                                                        size: "icon",
                                                    }),
                                                    "h-9 w-9"
                                                )}>
                                                <Settings className="h-4 w-4" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            className="flex items-center gap-4 dark:bg-white dark:text-black bg-black text-white">
                                            Settings
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="justify-center"
                                                    variant="ghost"
                                                    size="icon">
                                                    <LogOut className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            className="flex items-center gap-4 dark:bg-white dark:text-black bg-black text-white">
                                            LogOut
                                        </TooltipContent>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={"/dashboard/settings"}
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                            }),
                                            "justify-start"
                                        )}>
                                        <Settings className="mr-3 h-4 w-4" />
                                        Settings
                                    </Link>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="justify-start"
                                            variant="ghost">
                                            <LogOut className="mr-3 h-4 w-4" />
                                            LogOut
                                        </Button>
                                    </DialogTrigger>
                                </>
                            )}
                            <DialogContent className="grid gap-6">
                                <DialogHeader className="grid gap-2">
                                    <DialogTitle>Log out pop up!</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to log out?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="justify-center">
                                    <Button
                                        onClick={() => logout()}
                                        variant="default"
                                        className="w-full h-full">
                                        <LogOut className="mr-3 h-4 w-4" />
                                        Yes
                                    </Button>
                                    <DialogClose asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full h-full">
                                            <X className="mr-3 h-4 w-4" />
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </aside>
            </TooltipProvider>
        </>
    );
}

function SidebarItem({ links = [], collapse = false }) {
    return (
        <nav className={`grid gap-2 px-3 ${collapse && "mx-auto"}`}>
            {links.map((link, index) =>
                collapse ? (
                    <Tooltip key={index} delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Link
                                href={link.href || "#"}
                                className={cn(
                                    buttonVariants({
                                        variant: link.variant,
                                        size: "icon",
                                    }),
                                    "relative h-9 w-9"
                                )}>
                                <link.icon className="h-4 w-4" />
                                {link.variant == "secondary" && (
                                    <span className="absolute -right-[2px] -top-[2px] w-2 h-2 rounded bg-green-400"></span>
                                )}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent
                            side="right"
                            className="flex items-center gap-4 dark:bg-white dark:text-black bg-black text-white">
                            {link.title}
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <Link
                        key={index}
                        href={link.href || "#"}
                        className={cn(
                            buttonVariants({
                                variant: link.variant,
                            }),
                            "justify-start"
                        )}>
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.title}
                        {link.variant == "secondary" && (
                            <span className="ml-auto w-2 h-2 rounded bg-green-400"></span>
                        )}
                    </Link>
                )
            )}
        </nav>
    );
}
