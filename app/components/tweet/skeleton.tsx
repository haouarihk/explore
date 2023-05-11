import { Heart, User } from "tabler-icons-react";

export default function Tweet(props: {}) {
    return <div className="px-6 py-5 flex flex-col gap-3 border-2 border-white/20">
        {/* tweet */}
        <div className="flex items-center gap-4">
            {/* image */}
            <User width={32} className="avatar" />

            {/* tweet content */}
            <div className="flex-col">
                {/* username */}
                <div className="flex gap-2">
                    {/* username */}
                    <div className="font-bold"></div>
                    {/* tag */}
                    <div className="font-thin">@bezzzoz</div>
                </div>

                {/* content */}
                <p className="text-lg">

                </p>
            </div>

            {/* - */}
        </div>

        {/* controls */}
        <div className="flex gap-3 px-3 items-center">
            <Heart width={20} className="hover:fill-pink-500 hover:stroke-red-500 cursor-pointer" />
        </div>
    </div>
}
