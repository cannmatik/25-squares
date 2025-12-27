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
    title: '25 Squares',
    description: 'A Classic Puzzle Challenge',
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
