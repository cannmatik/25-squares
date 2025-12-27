
import ShareContent from './ShareContent'

export async function generateMetadata({ searchParams }) {
    const params = await searchParams
    const { world, level, score, stars } = params

    // Construct the OG Image URL
    const ogParams = new URLSearchParams()
    if (world) ogParams.set('world', world)
    if (level) ogParams.set('level', level)
    if (score) ogParams.set('score', score)
    if (stars) ogParams.set('stars', stars)

    // Use absolute URL for OG images - required by social platforms
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://25-squares.com'
    const ogUrl = `${baseUrl}/api/og?${ogParams.toString()}`

    return {
        title: '25 SQUARES - Can you beat my score?',
        description: `I scored ${score || 0} on World ${world || 1} Level ${level || 1}! Play now.`,
        openGraph: {
            title: '25 SQUARES - LEVEL COMPLETED',
            description: `Score: ${score} | Stars: ${stars}/3`,
            images: [
                {
                    url: ogUrl,
                    width: 1200,
                    height: 630,
                    alt: 'Level Completion',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: '25 SQUARES',
            description: `I scored ${score} on Level ${world}-${level}!`,
            images: [ogUrl],
        },
    }
}

export default async function SharePage({ searchParams }) {
    const params = await searchParams
    const { world, level, score, stars } = params

    return <ShareContent world={world} level={level} score={score} stars={stars} />
}
