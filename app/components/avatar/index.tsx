import clsx from "clsx";
import Image from "next/image";

export default function Avatar(props: { user?: { name?: string | null; image?: string | null }, className?: any }) {
    return <div className={clsx("flex items-center justify-center rounded-full avatar bg-black w-[42px] h-[42px]", props.className)}>
        {props?.user?.image ?
            <Image alt={props.user.name + "-Avatar"} src={props.user.image} width={42} height={42} />
            : <p className="text-2xl">{props.user?.name?.[0] || "G"}</p>}
    </div>
}