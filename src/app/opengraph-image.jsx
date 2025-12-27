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
    // Fetch Font
    // Fetch Font (Using GitHub Raw for stability)
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
                    border: '24px solid #FAEC3B',
                    position: 'relative',
                }}
            >
                {/* Decorative Background Elements */}
                <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: '#FAEC3B', opacity: 0.1, borderRadius: '50%', filter: 'blur(100px)' }} />
                <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, background: '#FAEC3B', opacity: 0.1, borderRadius: '50%', filter: 'blur(100px)' }} />

                {/* Main Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20
                }}>
                    <div
                        style={{
                            fontSize: 90,
                            color: '#FAEC3B',
                            textShadow: '6px 6px 0px #000',
                            letterSpacing: '-4px',
                            marginBottom: 20
                        }}
                    >
                        25 SQUARES
                    </div>

                    <div style={{
                        width: '200px',
                        height: '4px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '2px',
                        marginBottom: 30
                    }} />

                    <div
                        style={{
                            fontSize: 32,
                            color: '#FFF',
                            opacity: 0.9,
                            textShadow: '2px 2px 0px #000',
                            textAlign: 'center'
                        }}
                    >
                        A CLASSIC PUZZLE CHALLENGE
                    </div>

                    {/* Decorative Grid Icon */}
                    <div style={{
                        display: 'flex',
                        marginTop: 40,
                        gap: 10,
                        opacity: 0.5
                    }}>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} style={{
                                width: 20,
                                height: 20,
                                background: '#FAEC3B',
                                boxShadow: '2px 2px 0 #000'
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
            fonts: [
                {
                    name: 'Press Start 2P',
                    data: fontData,
                    style: 'normal',
                },
            ],
        }
    )
}
