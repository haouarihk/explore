"use client";
import { SessionProvider } from "next-auth/react"


export default function Context(props:{children?:any, pageProps: { session: any }}) {
    return (
      <SessionProvider session={props.pageProps?.session}>
        {props.children}
      </SessionProvider>
    )
}