'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "tabler-icons-react";

export default function Search(props: { defaultValue: string }) {
    const [value, setValue] = useState(props.defaultValue);

    const router = useRouter();
    return <div className="flex  items-center border-2 rounded-md border-white/20">
        <input type="text" className="input border-0 outline-0" value={value} placeholder="Search..." onChange={(k) => setValue(k.target.value)} onKeyUp={(e) => e.key == "Enter" && (window.location.href = (`?search=${encodeURIComponent(value)}`))} />
        {!!value.length && <X className="hover:fill-primary cursor-pointer" onClick={() => props.defaultValue?.length ? (window.location.href = (`?`)) : setValue("")} />}
    </div>
}