import clsx from "clsx";
import Image from "next/image";

export default function Avatar(props: { user?: { name?: string | null; image?: string | null }, className?: any, skeleton?: boolean }) {
    return <div className={clsx("avatar flex h-[42px] w-[42px] items-center justify-center rounded-full bg-black", props.className, {
        "animation-pulse": props.skeleton
    })}>
        {!props.skeleton && <>
            {props?.user?.image ?
                <Image alt={props.user.name + "-Avatar"} src={props.user.image} width={42} height={42} loading={"lazy"} />
                : <p className="text-2xl">{props.user?.name?.[0] || "G"}</p>}
        </>}
    </div>
}