"use client";

import { useEffect, useState } from "react";
import {
    startOfMonth,
    endOfMonth,
    add,
    sub,
    eachDayOfInterval,
    format,
    getDay,
    isToday,
    isBefore,
    startOfDay,
    isAfter,
    setDate,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLast, PenLine } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Calendar({ posts, pageName, pageAvatar }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    const midMonth = setDate(new Date(), 15);

    useEffect(() => {
        if (isAfter(today, midMonth)) {
            setCurrentMonth(add(new Date(), { months: 1 }));
        }
    }, []);

    const area = 5 * 7;
    const firstDayOfMonth = startOfMonth(currentMonth);
    const firstDayOfWeek = getDay(firstDayOfMonth);

    const daysInMonth = eachDayOfInterval({
        start: sub(firstDayOfMonth, { days: firstDayOfWeek }),
        end: add(endOfMonth(currentMonth), { days: 5 }),
    });

    return (
        <>
            <div className="flex items-center gap-3 px-8 py-4">
                <span className="flex gap-2 items-center mr-8">
                    <img
                        src={pageAvatar}
                        className="w-10 h-10 border rounded-full"
                    />{" "}
                    {pageName}:{" "}
                </span>
                <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() =>
                        setCurrentMonth((curr) => sub(curr, { months: 1 }))
                    }>
                    <ChevronFirst />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() =>
                        setCurrentMonth((curr) => add(curr, { months: 1 }))
                    }>
                    <ChevronLast />
                </Button>
                <span>
                    {format(currentMonth, "MMMM")}{" "}
                    {format(currentMonth, "yyyy")}
                </span>
            </div>
            <div className="grid grid-cols-7 grid-rows-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                        <div
                            key={day}
                            className="relative px-4 py-2 col-span-1 flex items-center justify-start border-b border-r border-t">
                            <div>{day}</div>
                        </div>
                    )
                )}
            </div>
            <div className="grid grid-cols-7 grid-rows-5 h-[calc(100dvh-4rem-70px)]">
                {daysInMonth.slice(0, area).map((dateObj, i) => {
                    const date = format(dateObj, "yyyy-MM-dd");
                    const isDisabled = isBefore(
                        dateObj,
                        startOfDay(new Date())
                    );
                    return (
                        <Sheet key={i}>
                            <SheetTrigger asChild>
                                <div
                                    key={date}
                                    className={`relative col-span-1 row-span-1 ${
                                        isToday(date) &&
                                        "bg-slate-100 border-gray-600"
                                    } flex items-center justify-center ${
                                        isDisabled && "opacity-50"
                                    }`}>
                                    {format(dateObj, "d")}
                                    <Separator className="absolute top-full" />
                                    <Separator
                                        orientation="vertical"
                                        className="absolute right-full"
                                    />
                                </div>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>
                                        Content for{" "}
                                        {format(dateObj, "yyyy-MM-dd")} -{" "}
                                        {format(dateObj, "EEEE")}
                                    </SheetTitle>
                                    <SheetDescription asChild>
                                        <div className="w-full h-full pr-2 pt-2 flex flex-col gap-2 justify-start">
                                            {posts
                                                .filter((post) => {
                                                    const postDate = new Date(
                                                        post.date
                                                    );
                                                    return (
                                                        postDate.getDate() ===
                                                            dateObj.getDate() &&
                                                        postDate.getMonth() ===
                                                            dateObj.getMonth() &&
                                                        postDate.getFullYear() ===
                                                            dateObj.getFullYear()
                                                    );
                                                })
                                                .map((post, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-full h-12 flex shadow px-2 py-1 box-content">
                                                        <div className="flex items-center gap-2">
                                                            {post.media
                                                                .length == 0 ? (
                                                                <PenLine className="h-6 w-6 box-content p-2" />
                                                            ) : (
                                                                <img
                                                                    src={
                                                                        post
                                                                            .media[0]
                                                                    }
                                                                    className="h-6 w-6 box-content p-2 border"
                                                                />
                                                            )}
                                                            <p>
                                                                {post.caption
                                                                    .length > 20
                                                                    ? post.caption.substring(
                                                                          0,
                                                                          20
                                                                      ) + "..."
                                                                    : post.caption}
                                                            </p>
                                                        </div>
                                                        <p className="text-[12px] mt-auto ml-auto">
                                                            {format(
                                                                post.date,
                                                                "hh:mm:ss a"
                                                            )}
                                                        </p>
                                                    </div>
                                                ))}
                                        </div>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    );
                })}
            </div>
        </>
    );
}
