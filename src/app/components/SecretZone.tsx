import { useEffect, useRef, useState } from 'react';

const TARGET_TEXT = "글자와기록사이";
const SOURCE_PHRASE = "디자인세상을기록하다의미를담다";
const CHARS = SOURCE_PHRASE.split('');

interface Particle {
    id: number;
    x: number;
    y: number;
    originX: number;
    originY: number;
    char: string;
    vx: number;
    vy: number;
    swayOffset: number;
    swaySpeed: number;
    fallSpeed: number;
    landed: boolean;
}

export function SecretZone() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    const stateRef = useRef<'IDLE' | 'FALLING' | 'WAITING' | 'CENTERING' | 'INTERACTIVE'>('IDLE');
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animationRef = useRef<number>();

    const layoutOffsetRef = useRef(0);
    const centeringProgressRef = useRef(0);
    const timeRef = useRef(0);

    // Density tuning: 3 is a sweet spot for 10px font 
    const SAMPLE_GAP = 3;

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!container || !canvas || !ctx) return;

        const init = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // 1. Calculate Font Size (90% Width for safety margin)
            const baseFont = 200;
            ctx.font = `bold ${baseFont}px "Pretendard", sans-serif`;
            const measure = ctx.measureText(TARGET_TEXT);
            const targetWidth = width * 0.90;
            const fontSize = Math.floor(baseFont * (targetWidth / measure.width));

            // 2. Generate Target Points
            ctx.font = `bold ${fontSize}px "Pretendard", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'black';

            ctx.clearRect(0, 0, width, height);
            ctx.fillText(TARGET_TEXT, width / 2, height / 2);

            const imageData = ctx.getImageData(0, 0, width * dpr, height * dpr);
            const data = imageData.data;
            const points: Particle[] = [];
            const cols = width * dpr;

            let pIndex = 0;
            for (let y = 0; y < height * dpr; y += SAMPLE_GAP * dpr) {
                for (let x = 0; x < width * dpr; x += SAMPLE_GAP * dpr) {
                    const i = (y * cols + x) * 4;
                    if (data[i + 3] > 128) {
                        points.push({
                            id: pIndex++,
                            x: Math.random() * width,
                            y: -Math.random() * 800 - 100, // Rain from high up
                            originX: x / dpr,
                            originY: y / dpr,
                            char: CHARS[Math.floor(Math.random() * CHARS.length)],
                            vx: 0,
                            vy: 0,
                            swayOffset: Math.random() * Math.PI * 2,
                            swaySpeed: 0.02 + Math.random() * 0.03,
                            fallSpeed: 3 + Math.random() * 3, // Faster fall for snappy feel
                            landed: false
                        });
                    }
                }
            }

            particlesRef.current = points;
            ctx.clearRect(0, 0, width, height);
        };

        init();
        window.addEventListener('resize', init);

        const loop = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            ctx.clearRect(0, 0, width, height);

            timeRef.current++;
            const particles = particlesRef.current;
            const state = stateRef.current;

            const bottomOffset = (height / 2) - 40;

            if (state === 'FALLING' || state === 'WAITING') {
                layoutOffsetRef.current = bottomOffset;
            } else if (state === 'CENTERING') {
                if (centeringProgressRef.current < 1) {
                    centeringProgressRef.current += 0.015; // Speed up lift
                    const t = centeringProgressRef.current;
                    const ease = 1 - Math.pow(1 - t, 3); // CubicOut
                    layoutOffsetRef.current = bottomOffset * (1 - ease);
                } else {
                    stateRef.current = 'INTERACTIVE';
                    layoutOffsetRef.current = 0;
                }
            }

            // Particle Appearance
            ctx.font = '10px sans-serif';
            ctx.fillStyle = '#111';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            let landedCount = 0;

            particles.forEach(p => {
                let tx = p.originX;
                let ty = p.originY + layoutOffsetRef.current;

                // --- PHASE LOGIC ---

                if (state === 'FALLING') {
                    if (!p.landed) {
                        // Falling Physics
                        p.y += p.fallSpeed;
                        p.x += Math.sin(timeRef.current * p.swaySpeed + p.swayOffset) * 0.5;

                        // STRICT Landing
                        if (p.y >= ty) {
                            p.y = ty;
                            p.landed = true;
                            p.vx = 0;
                            p.vy = 0;
                        }
                    } else {
                        // Once landed, SNAP to target X linearly to fix swaying
                        // This ensures the text sharpens up immediately
                        if (Math.abs(tx - p.x) > 0.5) {
                            p.x += (tx - p.x) * 0.2;
                        } else {
                            p.x = tx; // Absolute snap
                        }
                        p.y = ty;
                    }

                    if (p.landed) landedCount++;
                }

                else if (state === 'WAITING' || state === 'CENTERING') {
                    // Rigid Lock
                    p.x = tx;
                    p.y = ty;
                    p.vx = 0;
                    p.vy = 0;
                }

                else if (state === 'INTERACTIVE') {
                    // Interaction logic
                    let targetX = tx;
                    let targetY = ty;

                    const dx = mouseRef.current.x - p.x;
                    const dy = mouseRef.current.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const radius = 80;

                    if (dist < radius) {
                        const angle = Math.atan2(dy, dx);
                        const force = (radius - dist) / radius;
                        // Repel
                        targetX -= Math.cos(angle) * force * 100;
                        targetY -= Math.sin(angle) * force * 100;
                    }

                    // Spring return
                    const ax = (targetX - p.x) * 0.15;
                    const ay = (targetY - p.y) * 0.15;
                    p.vx += ax;
                    p.vy += ay;
                    p.vx *= 0.8; // Dampen
                    p.vy *= 0.8;
                    p.x += p.vx;
                    p.y += p.vy;
                }

                ctx.fillText(p.char, p.x, p.y);
            });

            // Transition
            if (state === 'FALLING' && landedCount >= particles.length * 0.95) {
                stateRef.current = 'WAITING';
                setTimeout(() => {
                    stateRef.current = 'CENTERING';
                }, 800);
            }

            animationRef.current = requestAnimationFrame(loop);
        };

        animationRef.current = requestAnimationFrame(loop);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', init);
        };
    }, []);

    const handleMouseEnter = () => {
        if (!hasStarted) {
            setHasStarted(true);
            stateRef.current = 'FALLING';
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseLeave = () => {
        mouseRef.current = { x: -9999, y: -9999 };
    };

    return (
        <div
            ref={containerRef}
            className="mt-32 h-64 w-full relative cursor-default select-none group"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <canvas ref={canvasRef} className="block pointer-events-none" />
            {!hasStarted && <div className="absolute inset-0 z-10" />}
        </div>
    );
}
