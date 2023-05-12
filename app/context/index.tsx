"use client";

import { Toaster } from "react-hot-toast";

export default function Context(props: { children?: any, pageProps: { session: any } }) {
  return (<>
    <Toaster />
    {props.children}
  </>)
}