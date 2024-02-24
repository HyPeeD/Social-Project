import { auth } from "@/auth";
import Calendar from "@/app/dashboard/planner/[id]/components/calendar";
import { getPostsForPage } from "@/lib/database";

export default async function Page({ params }) {
    const session = await auth();

    const id = params.id || session.user.pages[0]?.id;
    const page = session.user.pages.find((p) => p.id === id);
    const posts = await getPostsForPage(id);
    return (
        <>
            <Calendar
                posts={posts}
                pageName={page.username}
                pageAvatar={page.avatar}
            />
        </>
    );
}
