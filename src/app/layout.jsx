import './globals.css'
import Providers from './providers'
import { Press_Start_2P, Montserrat } from 'next/font/google'

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
    title: '25 Squares',
    description: 'A Classic Puzzle Challenge',
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
            </body>
        </html>
    )
}
