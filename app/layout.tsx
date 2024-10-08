import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from './lib/utils'
import { Providers } from './lib/rq/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
 title: 'Create Next App',
 description: 'Generated by create next app',
}

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode
}>) {
 return (
  <html lang='en'>
   <body
    style={{ '--accent-hsl': 'var(--blue-hsl)' }}
    className={cn(inter.className, 'relative')}>
    <Providers>{children}</Providers>
   </body>
  </html>
 )
}
