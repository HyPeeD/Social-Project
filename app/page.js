import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { Icons } from "@/components/icons";
import { AlignCenter, ChevronsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Page() {
    const session = await auth();
    return (
        <>
            <div className="w-dvh font-sans h-full bg-gradient-to-r dark:from-zinc-800 dark:to-zinc-900 from-zinc-200 via-slate-100 to-zinc-300">
                <Navbar session={session} />

                <div className="grid grid-cols-1 lg:grid-cols-5 grid-rows-1 h-[300px]">
                    <div className="lg:col-span-1"></div>
                    <div className="flex flex-col items-center justify-end col-span-1 lg:col-span-3">
                        <h1 className="text-xl font-extrabold tracking-wide">
                            <AlignCenter />
                        </h1>
                        <h1 className="text-7xl font-bold tracking-wide">
                            Control your
                        </h1>
                        <h1 className="text-7xl font-bold tracking-wide relative">
                            <Icons.excl className="absolute -top-full left-full -translate-y-12 h-auto dark:fill-zinc-100 fill-zinc-900 w-[120px]" />
                            Socials With {process.env.PUBLIC_APP_NAME}
                            <Icons.arrow className="absolute -bottom-24 left-20 h-auto transform scale-x-[-1] -rotate-[80deg] dark:fill-zinc-100 fill-zinc-900 w-[100px]" />
                        </h1>
                    </div>
                    <div className="lg:col-span-1"></div>
                </div>
                <div className="flex items-center justify-center gap-3 h-[150px] relative">
                    <Button className="rounded-full w-36 h-auto text-lg">
                        <ChevronsUp className="mr-2" />
                        Free Trial
                    </Button>
                    <Button
                        className="rounded-full w-40 h-auto text-lg"
                        variant="ghost">
                        Watch Tutorial
                    </Button>
                </div>
            </div>
        </>
    );
}
