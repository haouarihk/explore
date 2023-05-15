// import { Inter } from 'next/font/google'

import { getServerAuth } from "../components/auth";
import PagerNav from "../components/nav/pager";

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Explore',
  description: 'Explore Content',
}



export default async function RootLayout(props: any) {
  const s = await getServerAuth();
  return (
    <>
      {s.user && props.create}

      <PagerNav />

      {props.children}
    </>
  )
}


export const dynamic = "force-dynamic";