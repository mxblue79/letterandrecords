import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '../../lib/sanity';

interface CarouselProps {
    images: any[];
}

export function BookstoreCarousel({ images }: CarouselProps) {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % images.length);
    const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full h-full overflow-hidden group">
            <AnimatePresence mode='wait'>
                <motion.img
                    key={current}
                    src={urlFor(images[current]).width(1200).height(900).url()}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={`Bookstore Gallery ${current + 1}`}
                />
            </AnimatePresence>

            {/* Navigation Arrows - Always visible now via opacity-100 */}
            <button
                onClick={(e) => { e.preventDefault(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/10 hover:bg-black/30 rounded-full text-white backdrop-blur-sm opacity-100 transition-opacity z-10"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={(e) => { e.preventDefault(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/10 hover:bg-black/30 rounded-full text-white backdrop-blur-sm opacity-100 transition-opacity z-10"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => { e.preventDefault(); setCurrent(idx); }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === current ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
