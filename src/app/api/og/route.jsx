import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const title = searchParams.get('title') || '25 SQUARES'
        const score = searchParams.get('score')
        const world = searchParams.get('world')
        const level = searchParams.get('level')
        const stars = searchParams.get('stars')

        // Fetch Font
        const fontData = await fetch(
            new URL('https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff')
        ).then((res) => res.arrayBuffer())

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#14141E', // Dark background
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        fontFamily: '"Press Start 2P"',
                        border: '20px solid #FAEC3B', // Yellow border
                    }}
                >
                    {/* Logo / Title */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 60,
                            color: '#FAEC3B', // Yellow text
                            marginBottom: 40,
                            textShadow: '4px 4px 0px #000',
                        }}
                    >
                        25 SQUARES
                    </div>

                    {/* Level Info */}
                    {world && level && (
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 30,
                                color: '#fff',
                                marginBottom: 20,
                            }}
                        >
                            WORLD {world} • LEVEL {level}
                        </div>
                    )}

                    {/* Completion Status */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 40,
                            color: '#4CAF50', // Green for success
                            marginBottom: 20,
                            textShadow: '2px 2px 0px #000',
                        }}
                    >
                        LEVEL COMPLETED!
                    </div>

                    {/* Score & Stars */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {score && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 30 }}>
                                <span style={{ fontSize: 20, color: '#aaa' }}>SCORE</span>
                                <span style={{ fontSize: 40, color: '#fff' }}>{score}</span>
                            </div>
                        )}

                        {stars && (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {/* Render Stars */}
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} style={{
                                        fontSize: 50,
                                        color: i < parseInt(stars) ? '#FAEC3B' : '#333'
                                    }}>
                                        ★
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Press Start 2P',
                        data: fontData,
                        style: 'normal',
                    },
                ],
            }
        )
    } catch (e) {
        console.log(`${e.message}`)
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}
