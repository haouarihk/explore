
"use client";


import { StorageItem as ST } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { File, PaperBag, X } from "tabler-icons-react";
import { formatSize } from "../utils";

type StorageItem = Partial<Omit<ST, "data"> & { data: string; id: string }>;

interface Props {
    id: string;
    files?: StorageItem[],
    setFiles?: any,
    editting?: boolean,
}

export function StorageViewer({ id, files: _files, setFiles, editting }: Props) {
    const files = _files || [];

    const deleteFile = useCallback((id: string) => {
        setFiles((files: any) => {
            const i = files.findIndex((f: any) => f.id == id);
            files.splice(i, 1);
            return [...files];
        })
    }, [setFiles])

    const videos = useMemo(() =>
        files.filter(f => f.type == "video").map(file => <StorageItemViewer key={file.id} file={file} onDelete={deleteFile} editting={editting} />)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [files])

    const images = files.filter(f => f.type == "image");


    const others = files.filter(f => f.type != "image" && f.type != "video")

    return <>
        {!!videos.length && <div className="flex flex-wrap w-full gap-3">
            {videos}
        </div>}
        {!!images?.length && <div className="flex flex-wrap w-full gap-3">
            {
                images.map(file => <StorageItemViewer key={file.id} file={file} onDelete={deleteFile} editting={editting} />)
            }
        </div>}
        {!!others?.length && <div className="flex flex-col w-full gap-3">
            {
                others.map(file => <StorageItemViewer
                    key={file.id}
                    file={file}
                    onDelete={deleteFile} editting={editting} />)
            }
        </div>}
    </>
}


export function StorageItemViewer(props: { file: StorageItem, onDelete?: any, editting?: boolean }) {
    const extension = props.file.name?.split(".").reverse()[0];
    const cutName = props.file.name?.slice(0, 16) || ""
    const extended = !(extension && cutName.endsWith(extension));
    const [blob, setBlob] = useState<Blob | null>();
    const [media, setMedia] = useState<string>();

    const [loading, setLoading] = useState(false);

    const b64 = props.file.data

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (!b64) return;
            const blob = await b64toBlob(b64, props.file.mimeType);
            setBlob(blob);
            const media = URL.createObjectURL(blob);
            setMedia(media);
            setLoading(false);
        })()
    }, [b64, props.file.mimeType])

    if (props.file.type?.includes("image")) {
        // show image
        return <div className="relative aspect-square w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-full w-full" alt={`file-${props.file.name}`} loading="lazy"
                /* @ts-ignore */
                src={b64 ? media : `/api/v1/storage/${props.file.id}`}
            />
            {props.editting && <button onClick={() => props.onDelete(props.file.id)} className="absolute top-2 right-2 fill-white p-2 bg-white/40">
                <X />
            </button >}
        </div>
    } else if (props.file.type?.includes("video")) {

        // show video
        return <div className="relative aspect-video w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <video className="h-full w-full" src={b64 ? media : `/api/v1/storage/${props.file.id}`} controls />
            {props.editting && <button onClick={props.onDelete} className="absolute top-2 right-2 fill-white p-2 bg-white/40">
                <X />
            </button >}
        </div>
    } else {
        // show generic file
        return <Link href={`/api/v1/storage/${props.file.id}`} className="p-3 flex gap-3 flex-shrink-0 justify-between items-center hover:bg-gray-300/25" target="_blank">
            <div className="flex gap-2 items-center">
                <File />
                {cutName + (extended ? "..." + extension : "")}
            </div>
            <div className="text-white/30">
                {formatSize((+(props.file.size || "0")) || 0)}
            </div>
            {props.editting && <button onClick={props.onDelete}>
                <X />
            </button >}
        </Link>;
    }
}

export function Dropper(props: { children?: any; files: StorageItem[], setFiles: (files: StorageItem[]) => void, className?: string }) {
    const drop = useRef<HTMLDivElement>(null);
    const [dropping, setDropping] = useState(false);

    const handleDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setDropping(false);
        console.log(e)
        const { files: _files }: DataTransfer = e.dataTransfer;
        const files: File[] = [];
        for (let i = 0; i < _files.length; i++) {
            const item = _files.item(i)
            if (item)
                files.push(item)
        }

        if (files && files.length) {
            console.log("files", files);
            const files2 = await Promise.all(files.map(async (file: File) => ({
                name: file.name,
                type: file.type.split("/")[0],
                mimeType: file.type,
                size: file.size,
                data: await getBase64(file),
                id: crypto.randomUUID()
            })))

            props.setFiles([...props.files, ...files2] as any);
        }
    };


    return (
        <div
            ref={drop}
            className={clsx('FilesDragAndDrop relative', props.className)}
            onDragEnter={() => setDropping(true)}
            onDrop={handleDrop}
        >
            {props.children}

            {dropping && <div className="w-full h-full absolute top-0 left-0 bg-black/20 p-4 z-50"
                onDragEnter={() => setDropping(true)}
                onDragLeave={() => setDropping(false)}
                onDragEnd={() => setDropping(false)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="w-full h-full border-2 border-dashed border-white pointer-events-none" onDragEnter={() => setDropping(true)}></div>
            </div>}
        </div>
    );
}


export function getBase64(file: File): Promise<string | null> {
    return new Promise((s, r) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            s(reader.result as any);
        };
        reader.onerror = function (error) {
            r(error);
        };
    });
}

export function getBase64FromBuffer(buffer: Buffer): string {
    return buffer.toString('base64');
}


export const b64toBlob = (base64: string, type = 'application/octet-stream') =>
    fetch(`data:${type};base64,${base64.includes(",") ? base64.split(",")[1] : base64}`).then(res => res.blob())