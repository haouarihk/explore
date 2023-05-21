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
    <div className="flex flex-col w-full items-center max-w-2xl gap-3">
      {s?.user && props.create}

      <PagerNav />

      {props.children}
    </div>
  )
}


export const dynamic = "force-dynamic";