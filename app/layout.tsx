import clsx from 'clsx'
import Context from './context'
import './globals.css'
// import { Inter } from 'next/font/google'
import NavControls from './components/nav/controls'
import { getServerAuth } from './components/auth'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Explore',
  description: 'Explore Content',
}

export default async function RootLayout(props: any) {
  const query = props.searchParams;
  const search: string = decodeURIComponent((query?.search as string) || "");

  const s = await getServerAuth();
  return (
    <html lang="en">
      <body className={clsx("flex items-center w-screen h-full")}>
        <Context {...props}>
          <main className="h-full flex flex-col items-center justify-between md:px-24 pt-32 w-full">
            <div className='max-w-5xl w-full h-full'>
              <div className='flex justify-between items-center p-4 fixed px-8 left-0 top-0 w-full backdrop-blur-md z-50'>
                <h1 className='font-bold text-3xl select-none'>Explore</h1>
                <NavControls defaultSearchValue={search} user={s?.user as any} />
              </div>
              {props.children}
            </div >
          </main>
        </Context>
      </body>
    </html >
  )
}


export const dynamic = "force-dynamic";