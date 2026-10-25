import type { Metadata } from 'next'
import { Cormorant_Garamond, Fredoka, Inter } from 'next/font/google'
import './globals.css'
import './showroom.css'
import './mobile.css'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { ScrollProgress } from '@/components/scroll-reveal'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
})

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

const display = Fredoka({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.beebear.in'),
  title: 'Bee & Bear | Baby Care Essentials',
  description: 'Explore the Bee & Bear client preview: sample diapers by size and type, baby wipes and cotton buds.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable} ${display.variable}`}>
      <body>
        <ScrollProgress />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <div className="shop-preview-bar">Client preview · Sample products &amp; prices · Test checkout only</div>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
