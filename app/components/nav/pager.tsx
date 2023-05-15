"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function PagerNav() {

    const pathname = usePathname();

    return <div>
        <div className="inline-flex rounded-md w-full shadow-sm text-center">
            <NavItem pathname={pathname} path="/feed" >Explore</NavItem>
            <NavItem pathname={pathname} path="/trending" >Trending</NavItem>
        </div>
    </div>
}


function NavItem(props: { pathname: string, children?: any, path: string }) {
    return <>

        {props.pathname !== props.path ? <Link href={props.path} className="w-full" >
            <div className={clsx("px-4 py-2 text-md w-full font-medium", {
                "disabled bg-black/20 text-gray-200/20 hover:bg-black/20 hover:text-gray-200/20": props.pathname === props.path,
                "text-blue-700 cursor-pointer bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white": props.pathname !== props.path
            })}>{props.children}</div>
        </Link> :
            <div className={clsx("px-4 py-2 text-md w-full font-medium", {
                "disabled bg-black/20 text-gray-200/20 hover:bg-black/20 hover:text-gray-200/20": props.pathname === props.path,
                "text-blue-700 cursor-pointer bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white": props.pathname !== props.path
            })}>{props.children}</div>}


    </>

}