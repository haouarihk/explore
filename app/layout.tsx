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
  const s = await getServerAuth();
  return (
    <html lang="en">
      <body className={clsx("flex items-center h-full")}>
        <Context {...props}>
          <main className="h-full flex flex-col items-center justify-between md:px-24 pt-32 w-full">
            <div className='max-w-5xl w-full h-full'>
              <div className='flex justify-between items-center p-4 fixed px-8 left-0 gap-3 top-0 w-full backdrop-blur-md border-b-2 border-white/10 z-50'>
                <h1 className='font-bold text-md md:text-3xl select-none'>Explore</h1>
                <NavControls user={s?.user as any} />
              </div>
            </div >
            <div className="w-fit">
              {props.children}
            </div>
          </main>
        </Context>
      </body>
    </html >
  )
}


export const dynamic = "force-dynamic";