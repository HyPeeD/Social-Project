"use client";

import { useRouter } from "next/navigation";
import { addAccounts } from "@/lib/actions";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const [accounts, setAccounts] = useState([]);
    const [process, setProcess] = useState("Processing..");
    const params = new URLSearchParams(
        window.location.href.split("/dashboard/add#")[1]
    );

    useEffect(() => {
        window.history.pushState({}, "", "/dashboard/add");
        addAccounts(Object.fromEntries([...params.entries()])).then((res) => {
            if (res.success) {
                setAccounts([...res.message]);
                setTimeout(() => router.push("/dashboard"), 2000);
            } else setProcess(res.message);
        });
    }, []);
    return (
        <>
            <h1>{process}</h1>
            <div className="flex flex-col gap-3">
                {accounts.map((account) => (
                    <div
                        key={JSON.parse(account).id}
                        className="bg-slate-200 text-black flex gap-3 items-center">
                        <img
                            className="w-10 h-10"
                            src={JSON.parse(account).profile_picture_url}
                            alt=""
                        />
                        <h1>{JSON.parse(account).username}</h1>
                    </div>
                ))}
            </div>
        </>
    );
}
