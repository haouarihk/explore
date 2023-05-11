export default function TweetBody(props: { children?: any }) {
    return <div className="px-6 py-5 flex flex-col gap-3 border-2 border-white/20">
        {props.children}
    </div>
}