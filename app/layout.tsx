import clsx from 'clsx'
import Context from './context'
import './globals.css'
// import { Inter } from 'next/font/google'
import NavControls from './components/nav/controls'
import { getServerAuth } from './components/auth'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Explore',
  description: 'Explore Content',
}



export default async function RootLayout(props: any) {
  const s = undefined||await getServerAuth();
  return (
    <html lang="en">
      <header>
        <script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-autovideo@1/autovideo.js"></script>
      </header>
      <body className={clsx("flex h-full items-center")}>
        <Context {...props}>
          <main className="flex h-full w-full flex-col items-center justify-between pt-32 md:px-24">
            <div className='h-full w-full max-w-5xl'>
              <div className='fixed left-0 top-0 z-50 flex w-full items-center justify-between gap-3 border-b-2 border-white/10 p-4 px-8 backdrop-blur-md'>
                <h1 className='select-none text-base font-bold md:text-3xl'>Explore</h1>
                <NavControls user={s?.user as any} />
              </div>
            </div >
            <div className="flex w-full flex-col items-center">
              {props.children}
            </div>
          </main>
        </Context>
      </body>
    </html>
  )
}


export const dynamic = "force-dynamic";