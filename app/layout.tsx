import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mega Pack 2500X - Adquirir Acesso',
  description: 'Desbloqueie todo o potencial do Mega Pack 2500X com acesso vitalício a 2500+ templates premium e ferramentas de IA avançadas.',
  openGraph: {
    title: 'Mega Pack 2500X - Adquirir Acesso',
    description: 'Desbloqueie todo o potencial do Mega Pack 2500X com acesso vitalício a 2500+ templates premium e ferramentas de IA avançadas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
