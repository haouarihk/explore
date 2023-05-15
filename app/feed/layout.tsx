// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Explore',
  description: 'Explore Content',
}



export default async function RootLayout(props: any) {
  const query = props.searchParams;
  const search: string = decodeURIComponent((query?.search as string) || "");
  return (
    <>
      {props.create}

      {props.children}
    </>
  )
}


export const dynamic = "force-dynamic";