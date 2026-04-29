import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Ayush — Full-Stack AI Engineer',
  description:
    'B.Tech ECE 2026, Salesforce Domain Intern at Cognizant. I build agentic RAG systems, polished React frontends, and Salesforce platforms that ship.',
  metadataBase: new URL('https://ayush.dev'),
  openGraph: {
    title: 'Ayush — Full-Stack AI Engineer',
    description: 'Building AI products and Salesforce platforms.',
    url: 'https://ayush.dev',
    siteName: 'Ayush',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush — Full-Stack AI Engineer',
    description: 'Building AI products and Salesforce platforms.',
  },
}

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body className="bg-ink-950 text-ink-50 antialiased">
        {children}
      </body>
    </html>
  )
}
