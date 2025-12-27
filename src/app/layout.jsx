import './globals.css'
import Providers from './providers'
import { Press_Start_2P, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const pressStart2P = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-press-start',
    display: 'swap',
})

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    display: 'swap',
})

export const metadata = {
    metadataBase: new URL('https://25-squares.com'),
    title: {
        default: '25 Squares - A Classic Puzzle Challenge',
        template: '%s | 25 Squares'
    },
    description: 'Challenge your mind with 25 Squares! Navigate through a 5x5 grid, visit all squares, and beat the puzzle. A classic brain teaser game with multiple worlds, levels, and unique challenges.',
    keywords: ['puzzle game', 'brain teaser', '25 squares', 'logic game', 'grid puzzle', 'mind game', 'strategy game', 'casual game', 'free puzzle'],
    authors: [{ name: '25 Squares Team' }],
    creator: '25 Squares',
    publisher: '25 Squares',
    applicationName: '25 Squares',
    category: 'games',
    classification: 'Puzzle Game',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://25-squares.com',
        siteName: '25 Squares',
        title: '25 Squares - A Classic Puzzle Challenge',
        description: 'Challenge your mind with 25 Squares! Navigate through a 5x5 grid, visit all squares, and beat the puzzle.',
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: '25 Squares - A Classic Puzzle Challenge',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '25 Squares - A Classic Puzzle Challenge',
        description: 'Challenge your mind with 25 Squares! Navigate through a 5x5 grid, visit all squares, and beat the puzzle.',
        images: ['/opengraph-image'],
        creator: '@25squares',
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/apple-touch-icon.png',
        },
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: '25 Squares',
    },
    alternates: {
        canonical: 'https://25-squares.com',
    },
    verification: {
        google: 'your-google-verification-code', // TODO: Replace with actual code
    },
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#14141E',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${pressStart2P.variable} ${montserrat.variable}`}>
            <body>
                <Providers>{children}</Providers>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
