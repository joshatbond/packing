import { GeistSans } from 'geist/font/sans'

import '~/styles/globals.css'

import Header from './_components/Header'

export const metadata = {
  title: 'Packing List',
  description: 'A simple app to manage packed goods',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body>
        <Header />

        {children}
      </body>
    </html>
  )
}
