"use client";
import { StorageItem as ST } from "@prisma/client";
import clsx from "clsx";
import { useState } from "react";
import { TruckLoading, Send } from "tabler-icons-react";
import { useAuth } from "../../components/auth/client";
import Avatar from "../../components/avatar";
import { className } from "../../components/tweet/body";
import { Dropper, StorageViewer } from "../../components/tweet/storage";
import { useSearchParams } from "next/navigation";

type StorageItem = Partial<Omit<ST, "data"> & { data: string; id: string }>;


export default async function CreateTweet(props: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    const searchParams = useSearchParams();
    const search = searchParams.get("search") as string;
    const s = useAuth();
    const authenticated = !!s?.user?.email;
    const [files, setFiles] = useState<StorageItem[]>([]);
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(false);

    const theresContent = content.length || files.length

    const submit = async () => {
        setLoading(true);
        await fetch("/api/v1/tweets", {
            method: "POST",
            body: JSON.stringify({
                content,
                files: files.map(f => {
                    const { id: _id, ...file } = f;
                    file.data = file.data?.split(",")[1];
                    file.size = "" + file.size
                    return file;
                })
            })
        });
        setContent("")
        setFiles([]);
        setLoading(false);
    }

    return <Dropper className={className} files={files} setFiles={setFiles}>
        {/* @ts-ignore */}
        <div className="relative flex">
            <div className="pt-2">
                <Avatar user={s?.user as any} />
            </div>
            <textarea disabled={loading} value={content} onChange={(e) => setContent(e.target.value)} name="content" id="content" className='w-full resize-none bg-transparent p-4 text-white outline-none' cols={10} rows={1} placeholder="What are you thinking about..." />
        </div>

        <StorageViewer id={"new"} files={files} setFiles={setFiles} editting />

        <div className='flex w-full justify-between'>
            <div>

            </div>

            {loading ?
                <TruckLoading />
                : <button className={clsx('stroke-white/40', {
                    "stroke-white/5": !theresContent,
                    "hover:stroke-white": theresContent
                })} onClick={theresContent ? submit : undefined}><Send className="stroke-white/40 hover:stroke-white" /></button>}
        </div>
    </Dropper>



}