import Image from "next/image";

export default function Avatar(props: { user?: { name?: string | null; image?: string | null } }) {
    return <div className="flex items-center justify-center avatar rounded-md bg-black w-[42px] h-[42px]">
        {props?.user?.image ?
            <Image alt={props.user.name + "-Avatar"} src={props.user.image} width={42} height={42} />
            : <p className="text-2xl">{props.user?.name?.[0] || "G"}</p>}
    </div>
}