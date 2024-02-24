import { auth } from "@/auth";
import { getPostsForPage } from "@/lib/database";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function Page({ params }) {
    const session = await auth();

    const id = params.id || session.user.pages[0]?.id;
    const page = session.user.pages.find((p) => p.id === id);
    const posts = await getPostsForPage(id);
    return (
        <>
            <div className="px-8 py-4">
                <Button variant="outline" href={`/dashboard/create/${id}`}>
                    <Plus className={"mr-3 h-4 w-4"} />
                    Create a new post
                </Button>
            </div>
        </>
    );
}
