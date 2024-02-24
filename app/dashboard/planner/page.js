import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { INSTAGRAM_PAGES_AUTH_URL } from "@/config";

export default async function Page() {
    const session = await auth();

    if (session.user.pages.length === 0) {
        return (
            <div className="grid justify-center items-center h-dvh">
                <Link
                    href={INSTAGRAM_PAGES_AUTH_URL}
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                        }),
                        "justify-start"
                    )}>
                    <Plus className="mr-3 h-4 w-4" />
                    Add a new page
                </Link>
            </div>
        );
    }
    redirect(`/dashboard/planner/${session.user.pages[0].id}`);
}
