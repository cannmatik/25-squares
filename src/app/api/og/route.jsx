import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// SVG star path for filled star
const StarFilled = ({ color = '#FAEC3B', size = 50 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

// SVG star path for empty star
const StarEmpty = ({ color = 'rgba(255,255,255,0.2)', size = 50 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const score = searchParams.get('score') ?? '0'
        const world = searchParams.get('world') ?? '1'
        const level = searchParams.get('level') ?? '1'
        const stars = parseInt(searchParams.get('stars') ?? '0')

        // Fetch Font
        let fontData = null
        try {
            fontData = await fetch(new URL('https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf')).then((res) => res.arrayBuffer())
        } catch (e) {
            console.error('Font fetch failed:', e)
        }

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
                        backgroundColor: '#1a1a2e',
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        fontFamily: '"Press Start 2P"',
                        border: '24px solid #FAEC3B',
                        position: 'relative',
                    }}
                >
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
                        {/* Title - Like Homepage with Red Shadow */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginBottom: 30,
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: 80,
                                    color: '#FAEC3B',
                                    textShadow: '4px 5px 0 #d2003a',
                                    fontWeight: 900,
                                    lineHeight: 1,
                                }}
                            >
                                25
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: 80,
                                    color: '#FAEC3B',
                                    textShadow: '4px 5px 0 #d2003a',
                                    fontWeight: 900,
                                    lineHeight: 1,
                                }}
                            >
                                SQUARES
                            </div>
                        </div>

                        {/* Completion Badge */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#E53935',
                                color: '#FFF',
                                padding: '12px 35px',
                                borderRadius: '15px',
                                fontSize: 28,
                                marginBottom: 30,
                                boxShadow: '0 5px 15px rgba(229, 57, 53, 0.4)',
                            }}
                        >
                            LEVEL COMPLETED!
                        </div>

                        {/* World/Level Info - "World 3 Level 13" format */}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{ display: 'flex', fontSize: 36, color: '#FFF' }}>
                                World {world} Level {level}
                            </div>
                        </div>

                        {/* Score */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 25 }}>
                            <div style={{ display: 'flex', fontSize: 24, color: '#aaa' }}>SCORE</div>
                            <div style={{ display: 'flex', fontSize: 48, color: '#FAEC3B', textShadow: '2px 2px 0 #000' }}>{score}</div>
                        </div>

                        {/* Stars with SVG */}
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            {stars >= 1 ? <StarFilled size={60} /> : <StarEmpty size={60} />}
                            <div style={{ display: 'flex', transform: 'translateY(-8px)' }}>
                                {stars >= 2 ? <StarFilled size={70} /> : <StarEmpty size={70} />}
                            </div>
                            {stars >= 3 ? <StarFilled size={60} /> : <StarEmpty size={60} />}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: fontData ? [
                    {
                        name: 'Press Start 2P',
                        data: fontData,
                        style: 'normal',
                    },
                ] : [],
            }
        )
    } catch (e) {
        console.log(`OG Image Error: ${e.message}`)
        return new Response(`Failed to generate the image: ${e.message}`, {
            status: 500,
        })
    }
}
