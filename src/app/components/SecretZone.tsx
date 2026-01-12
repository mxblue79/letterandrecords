import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TARGET_TEXT = "글자와기록사이";
const SOURCE_PHRASE = "디자인세상을기록하다";
const CHARS = SOURCE_PHRASE.split('');

interface Point {
    x: number;
    y: number;
    char: string;
}

export function SecretZone() {
    const [isActive, setIsActive] = useState(false);
    const [particles, setParticles] = useState<Point[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const generateParticles = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx || !containerRef.current) return;

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight; // Use actual container height

            canvas.width = width;
            canvas.height = height;

            // Draw text at the very bottom
            ctx.font = 'bold 60px "Pretendard", sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(TARGET_TEXT, width / 2, height); // Stick to bottom edge

            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            const points: Point[] = [];

            const gap = 6;

            for (let y = 0; y < height; y += gap) {
                for (let x = 0; x < width; x += gap) {
                    const index = (y * width + x) * 4;
                    const alpha = data[index + 3];

                    if (alpha > 128) {
                        points.push({
                            x: x,
                            y: y,
                            char: CHARS[Math.floor(Math.random() * CHARS.length)]
                        });
                    }
                }
            }
            setParticles(points);
        };

        generateParticles();

        // Add resize listener to regenerate
        window.addEventListener('resize', generateParticles);
        return () => window.removeEventListener('resize', generateParticles);
    }, []);

    return (
        <div
            ref={containerRef}
            className="mt-32 h-64 w-full relative cursor-default select-none"
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            {/* Helper trigger zone */}
            {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Empty hover area */}
                </div>
            )}

            <AnimatePresence>
                {isActive && particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-[8px] md:text-[10px] text-zinc-800 font-medium leading-none whitespace-nowrap"
                        style={{ left: 0, top: 0 }}
                        initial={{
                            x: Math.random() * (containerRef.current?.clientWidth || 300),
                            y: -200 - Math.random() * 300, // Start much higher for scattered feel
                            opacity: 0,
                            rotate: Math.random() * 720 - 360, // More wild rotation
                            scale: 0.2 + Math.random() * 0.5
                        }}
                        animate={{
                            x: p.x,
                            y: p.y,
                            opacity: 1,
                            rotate: 0,
                            scale: 1,
                        }}
                        exit={{
                            y: 150 + p.y, // Fall further down
                            opacity: 0,
                            transition: { duration: 1.5, ease: "easeIn" }
                        }}
                        transition={{
                            duration: 2.5 + Math.random() * 2, // Slightly faster: 2.5s to 4.5s
                            ease: [0.16, 1, 0.3, 1], // Ease out expo for graceful landing
                            delay: Math.random() * 2, // Reduced delay spread
                        }}
                    >
                        {p.char}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
