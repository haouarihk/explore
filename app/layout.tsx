import clsx from 'clsx'
import Context from './context'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Explore',
  description: 'Explore Content',
}

export default function RootLayout(props: any) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "flex items-center w-screen h-full")}>
        <Context {...props}>
          {props.children}
        </Context>
      </body>
    </html>
  )
}
