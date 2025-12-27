import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = '25 Squares - A Classic Puzzle Challenge'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image() {
    // Fetch Font (Using GitHub Raw for stability)
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
                    backgroundColor: '#14141E',
                    fontFamily: '"Press Start 2P"',
                }}
            >
                {/* Main Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {/* 25 Number - Smaller to match homepage proportions */}
                    <div
                        style={{
                            fontSize: 120,
                            color: '#FAEC3B',
                            textShadow: '4px 5px 0px #d2003a, 6px 8px 0px rgba(0,0,0,0.5)',
                            letterSpacing: '-6px',
                            lineHeight: 1,
                            display: 'flex',
                        }}
                    >
                        25
                    </div>

                    {/* SQUARES Text */}
                    <div
                        style={{
                            fontSize: 48,
                            color: '#FAEC3B',
                            textShadow: '3px 4px 0px #d2003a, 4px 6px 0px rgba(0,0,0,0.5)',
                            letterSpacing: '4px',
                            marginTop: 10,
                            display: 'flex',
                        }}
                    >
                        SQUARES
                    </div>

                    {/* Tagline */}
                    <div
                        style={{
                            fontSize: 16,
                            color: 'rgba(255,255,255,0.5)',
                            marginTop: 40,
                            letterSpacing: '3px',
                            display: 'flex',
                        }}
                    >
                        THE CLASSIC PUZZLE GAME
                    </div>

                    {/* 5x5 Mini Grid */}
                    <div style={{
                        display: 'flex',
                        marginTop: 35,
                        gap: 6,
                    }}>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} style={{
                                width: 22,
                                height: 22,
                                background: i === 2 ? '#FAEC3B' : 'rgba(250, 236, 59, 0.2)',
                                display: 'flex',
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: fontData ? [
                {
                    name: 'Press Start 2P',
                    data: fontData,
                    style: 'normal',
                },
            ] : [],
        }
    )
}
