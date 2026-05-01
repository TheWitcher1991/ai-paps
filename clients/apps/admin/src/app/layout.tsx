import { Metadata } from 'next'
import { ReactNode } from 'react'

import WithProviders from '~infra/providers'
import { projectConfig } from '~infra/system'

import './globals.css'

export const metadata: Metadata = {
  title: projectConfig.long_name,
  description: projectConfig.description,
  robots: 'index, follow',
  authors: [
    {
      name: 'Ashot Svazyan',
      url: 'https://github.com/TheWitcher1991',
    },
  ],

  openGraph: {
    title: projectConfig.long_name,
    description: projectConfig.description,
    type: 'website',
  },
  twitter: {
    title: projectConfig.long_name,
    description: projectConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WithProviders>{children}</WithProviders>
      </body>
    </html>
  )
}
