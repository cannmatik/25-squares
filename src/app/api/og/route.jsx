import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const score = searchParams.get('score') ?? '0'
        const world = searchParams.get('world') ?? '1'
        const level = searchParams.get('level') ?? '1'
        const stars = parseInt(searchParams.get('stars') ?? '0')

        // Fetch Font & Logo
        // We use a backup font or load generic if fetch fails, but 'Press Start 2P' is iconic for this app.
        const fontData = await fetch(new URL('https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf')).then((res) => res.arrayBuffer())

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
                        backgroundColor: '#1a1a2e', // Deep Navy
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        fontFamily: '"Press Start 2P"',
                        border: '24px solid #FAEC3B', // Thicker Yellow border
                        position: 'relative',
                    }}
                >
                    {/* Decorative Background Elements */}
                    <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: '#FAEC3B', opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} />
                    <div style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, background: '#FAEC3B', opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} />

                    {/* Main Container */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '30px',
                        border: '2px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        width: '900px',
                    }}>
                        {/* Title */}
                        <div
                            style={{
                                fontSize: 70,
                                color: '#FAEC3B',
                                textShadow: '4px 4px 0px #000',
                                marginBottom: 40,
                                letterSpacing: '-2px'
                            }}
                        >
                            25 SQUARES
                        </div>

                        {/* Completion Badge */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#4CAF50',
                                color: '#FFF',
                                padding: '10px 30px',
                                borderRadius: '15px',
                                fontSize: 32,
                                marginBottom: 40,
                                boxShadow: '0 5px 15px rgba(76, 175, 80, 0.4)',
                                transform: 'rotate(-2deg)'
                            }}
                        >
                            LEVEL COMPLETED!
                        </div>

                        {/* Info Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', marginBottom: 20 }}>
                            {/* World/Level Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ fontSize: 24, color: '#aaa', marginBottom: 10 }}>LOCATION</div>
                                <div style={{ fontSize: 40, color: '#fff' }}>W{world} • L{level}</div>
                            </div>

                            <div style={{ width: 2, height: 80, background: 'rgba(255,255,255,0.2)' }} />

                            {/* Score Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ fontSize: 24, color: '#aaa', marginBottom: 10 }}>SCORE</div>
                                <div style={{ fontSize: 50, color: '#FAEC3B', textShadow: '2px 2px 0 #000' }}>{score}</div>
                            </div>
                        </div>

                        {/* Stars */}
                        <div style={{ display: 'flex', gap: '20px', marginTop: 30 }}>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} style={{
                                    fontSize: 60,
                                    color: i < stars ? '#FAEC3B' : 'rgba(255,255,255,0.1)',
                                    transform: i === 1 ? 'translateY(-10px)' : 'none', // Middle star slightly higher
                                    filter: i < stars ? 'drop-shadow(0 0 10px rgba(250, 236, 59, 0.5))' : 'none'
                                }}>
                                    ★
                                </div>
                            ))}
                        </div>
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

