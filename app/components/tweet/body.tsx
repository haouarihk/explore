import clsx from "clsx";

export default function TweetBody(props: { children?: any, className?: any }) {
    return <div className={clsx("px-6 py-5 flex flex-col gap-[15px] border-2 border-white/20", props.className)}>
        {props.children}
    </div>
}