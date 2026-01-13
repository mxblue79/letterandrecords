import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSanityProject, urlFor } from '../../lib/sanity';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { SEO } from '../components/SEO';

// Define Custom Components for Portable Text
const ptComponents: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null;

            // Map size to classes
            const sizeMap: Record<string, string> = {
                full: 'w-full',
                large: 'w-4/5',
                medium: 'w-1/2',
                small: 'w-1/3'
            };

            // Map layout to classes
            const layoutMap: Record<string, string> = {
                center: 'mx-auto',
                left: 'mr-auto ml-0',
                right: 'ml-auto mr-0'
            };

            const sizeClass = sizeMap[value.size] || 'w-full';
            const layoutClass = layoutMap[value.layout] || 'mx-auto';

            return (
                <figure className={`relative my-12 flex flex-col ${layoutClass} ${sizeClass}`}>
                    <img
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || 'Project Image'}
                        className="w-full rounded-sm shadow-sm"
                    />
                    {value.caption && (
                        <figcaption className="mt-4 text-center text-sm text-zinc-500 font-medium">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    marks: {
        // Text Alignment Helpers (renders as block-level spans effectively)
        center: ({ children }) => <span className="block w-full text-center">{children}</span>,
        left: ({ children }) => <span className="block w-full text-left">{children}</span>,
        right: ({ children }) => <span className="block w-full text-right">{children}</span>,
    },
    block: {
        normal: ({ children }) => <p className="text-lg leading-loose text-zinc-700 whitespace-pre-wrap mb-6">{children}</p>,
        h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-8">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-6">{children}</h3>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-black pl-4 italic text-xl my-8">{children}</blockquote>,
    },
};





export function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    // Spreads Carousel State
    const [spreadIndex, setSpreadIndex] = useState(0);
    const [spreadDirection, setSpreadDirection] = useState(0);

    const handleNextSpread = () => {
        if (!project?.spreads || project.spreads.length <= 1) return;
        setSpreadDirection(1);
        setSpreadIndex((prev) => (prev + 1) % project.spreads.length);
    };

    const handlePrevSpread = () => {
        if (!project?.spreads || project.spreads.length <= 1) return;
        setSpreadDirection(-1);
        setSpreadIndex((prev) => (prev - 1 + project.spreads.length) % project.spreads.length);
    };

    const variants = {
        enter: (dir: number) => ({
            rotateY: dir > 0 ? 90 : -90,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            rotateY: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const
            }
        },
        exit: (dir: number) => ({
            rotateY: dir > 0 ? -90 : 90,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.6,
                ease: "easeIn" as const
            }
        })
    };



    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const data = await getSanityProject(id);
                setProject(data);
            } catch (error) {
                console.error("Failed to fetch project:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Helper to get YouTube ID
    const getYouTubeId = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Helper to get Aspect Ratio from Sanity Asset ID
    const getAspectRatio = (image: any) => {
        if (!image?.asset?._ref) return 297 / 420; // Default A3
        const ref = image.asset._ref;
        // Asset ID format: image-{id}-{width}x{height}-{format}
        const dimensions = ref.split('-')[2];
        if (!dimensions) return 297 / 420;
        const [width, height] = dimensions.split('x').map(Number);
        if (!width || !height) return 297 / 420;
        return width / height;
    };

    if (loading) {
        return <div className="min-h-screen pt-48 text-center text-zinc-400">Loading Project...</div>;
    }

    if (!project) {
        return <div className="min-h-screen pt-48 text-center text-zinc-400">Project not found.</div>;
    }

    const formattedDate = project.date ? (() => {
        const d = new Date(project.date);
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
    })() : '-';

    const hasContent = project.videoUrl || (project.content && project.content.length > 0);
    const hasSpreads = project.spreads && project.spreads.length > 0;
    const showBottomSection = hasContent || hasSpreads;


    return (
        <div className="min-h-screen pt-16 pb-32 bg-white">
            <SEO
                title={project.title}
                description={project.description || `${project.title} - 글자와기록사이 포트폴리오`}
                image={project.mainImage ? urlFor(project.mainImage).width(800).url() : undefined}
            />

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

                {/* Back Button (Desktop Only) */}
                <div className="hidden lg:block mb-12">
                    <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-zinc-500 transition-colors">
                        <ArrowLeft size={16} /> Back to List
                    </Link>
                </div>

                {/* Split Layout: Image (Left) - Info (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-0 items-stretch">

                    {/* LEFT: Main Image (Poster Style) */}
                    {/* LEFT: Main Image (Poster Style) -> 3D Carousel */}
                    <div className="lg:col-span-7">
                        <div
                            className="relative bg-white overflow-hidden rounded-sm shadow-sm perspective-[1500px]"
                            style={{ aspectRatio: project ? getAspectRatio(project.mainImage) : 297 / 420 }}
                        >
                            {project ? (
                                <>
                                    {(() => {
                                        // Combine Main Image + Gallery
                                        const slides = [
                                            ...(project.mainImage ? [project.mainImage] : []),
                                            ...(project.gallery || [])
                                        ];

                                        const nextSlide = () => {
                                            if (slides.length <= 1) return;
                                            setDirection(1);
                                            setCurrentIndex((prev) => (prev + 1) % slides.length);
                                        };

                                        const prevSlide = () => {
                                            if (slides.length <= 1) return;
                                            setDirection(-1);
                                            setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
                                        };

                                        const variants = {
                                            enter: (dir: number) => ({
                                                rotateY: dir > 0 ? 90 : -90,
                                                opacity: 0,
                                                scale: 0.9
                                            }),
                                            center: {
                                                rotateY: 0,
                                                opacity: 1,
                                                scale: 1,
                                                transition: {
                                                    duration: 0.6,
                                                    ease: "easeOut" as const
                                                }
                                            },
                                            exit: (dir: number) => ({
                                                rotateY: dir > 0 ? -90 : 90,
                                                opacity: 0,
                                                scale: 0.9,
                                                transition: {
                                                    duration: 0.6,
                                                    ease: "easeIn" as const
                                                }
                                            })
                                        };

                                        return (
                                            <>
                                                <AnimatePresence initial={false} custom={direction} mode='popLayout'>
                                                    {slides.length > 0 ? (
                                                        <motion.img
                                                            key={currentIndex}
                                                            src={urlFor(slides[currentIndex]).width(1200).url()}
                                                            custom={direction}
                                                            variants={variants}
                                                            initial="enter"
                                                            animate="center"
                                                            exit="exit"
                                                            className="absolute inset-0 w-full h-full object-cover backface-hidden"
                                                            alt={`Slide ${currentIndex + 1}`}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-400 font-light">
                                                            No Image
                                                        </div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Navigation Buttons */}
                                                {slides.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={prevSlide}
                                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
                                                        >
                                                            <ChevronLeft size={24} />
                                                        </button>
                                                        <button
                                                            onClick={nextSlide}
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
                                                        >
                                                            <ChevronRight size={24} />
                                                        </button>

                                                        {/* Page Indicator */}
                                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold z-20">
                                                            {currentIndex + 1} / {slides.length}
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        );
                                    })()}
                                </>
                            ) : null}
                        </div>
                    </div>

                    {/* RIGHT: Detail Elements */}
                    <div className="lg:col-span-5 flex flex-col justify-between lg:h-auto py-6 lg:pt-12 lg:pb-0">
                        <div>
                            <div className="border-b-4 border-black pb-8 mb-8">
                                <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter uppercase mb-6 break-keep">
                                    {project.title}
                                </h1>

                                {project.description && (
                                    <div
                                        className="cursor-pointer group"
                                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                    >
                                        <p className={`text-base md:text-lg text-zinc-600 font-medium leading-relaxed whitespace-pre-wrap ${!isDescriptionExpanded ? 'line-clamp-5' : ''}`}>
                                            {project.description}
                                        </p>
                                        {!isDescriptionExpanded && (
                                            <span className="text-xs font-bold text-zinc-400 mt-2 block group-hover:text-black transition-colors">READ MORE +</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Publication Specs (Dynamic Loading) */}
                            {(project.size || project.pages || project.paper || project.finishing || project.salesUrl) && (
                                <div className="mb-12 space-y-4 text-sm font-medium">
                                    {[
                                        { label: 'Size', value: project.size },
                                        { label: 'Pages', value: project.pages },
                                        { label: 'Paper', value: project.paper },
                                        { label: 'Finishing', value: project.finishing },
                                    ]
                                        .filter(item => item.value)
                                        .map(item => (
                                            <div key={item.label} className="grid grid-cols-[100px_1fr] gap-4">
                                                <span className="text-zinc-400 font-bold uppercase tracking-widest">{item.label}</span>
                                                <span>{item.value}</span>
                                            </div>
                                        ))}

                                    {project.salesUrl && (
                                        <div className="pt-4">
                                            <a
                                                href={project.salesUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block border-2 border-black px-6 py-2 rounded-full text-sm font-black uppercase hover:bg-black hover:text-white transition-colors"
                                            >
                                                구매하기 (Buy Now) ↗
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Metadata Flex - Vertical List for Right Column (Aligned to Bottom) */}
                        <div className="flex flex-col border-t-2 border-black font-medium text-sm mt-auto">
                            {[
                                { label: 'Client', value: project.client },
                                { label: 'Year', value: formattedDate && formattedDate !== '-' ? formattedDate : null },
                                { label: 'Role', value: project.role }
                            ]
                                .filter(item => item.value)
                                .map((item) => (
                                    <div key={item.label} className="py-6 border-b-2 border-black flex items-center justify-between">
                                        <span className="text-xs font-black uppercase text-zinc-400 tracking-widest w-24 flex-shrink-0">{item.label}</span>
                                        <span className="text-lg font-bold text-right flex-1 break-words">{item.value}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>



                {showBottomSection && (
                    <>
                        {/* Visual Divider / Layout Transition */}
                        <div className="relative my-24 lg:my-32">
                            {/* Horizontal Line */}
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-zinc-300"></div>

                            {/* Center Icon */}
                            <div className="relative z-10 flex justify-center">
                                <div className="bg-white px-6">
                                    <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                                        <ArrowDown size={16} className="text-black" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MIDDLE: Book Spreads (Landscape Carousel) */}
                        {hasSpreads && (
                            <div className="w-full mx-auto mb-24 lg:mb-32">
                                <div className="relative aspect-[420/297] bg-white overflow-hidden rounded-sm shadow-sm perspective-[1500px]">
                                    <div className="relative w-full h-full preserve-3d">
                                        <AnimatePresence initial={false} custom={spreadDirection} mode='popLayout'>
                                            <motion.img
                                                key={spreadIndex}
                                                src={urlFor(project.spreads[spreadIndex]).width(1600).url()}
                                                custom={spreadDirection}
                                                variants={variants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                className="absolute inset-0 w-full h-full object-contain backface-hidden"
                                                alt={`Spread ${spreadIndex + 1}`}
                                            />
                                        </AnimatePresence>

                                        {/* Controls */}
                                        {project.spreads.length > 1 && (
                                            <>
                                                <button onClick={handlePrevSpread} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white transition-all">
                                                    <ChevronLeft size={24} />
                                                </button>
                                                <button onClick={handleNextSpread} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white transition-all">
                                                    <ChevronRight size={24} />
                                                </button>
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur">
                                                    {spreadIndex + 1} / {project.spreads.length}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BOTTOM: Blog Content */}
                        {hasContent && (
                            <div className="max-w-[800px] mx-auto space-y-24 pt-0 border-zinc-200">
                                {/* Top Video if exists */}
                                {project.videoUrl && (
                                    <div className="w-full aspect-video bg-black rounded-sm shadow-2xl overflow-hidden">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${getYouTubeId(project.videoUrl)}`}
                                            title="YouTube video player"
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                )}

                                {/* Portable Text Content */}
                                {project.content && project.content.length > 0 && (
                                    <article className="prose prose-xl prose-zinc max-w-none">
                                        <PortableText value={project.content} components={ptComponents} />
                                    </article>
                                )}
                            </div>
                        )}

                    </>
                )}

                {/* Footer / Next Navigation (Mobile Only, or Desktop if long content) */}
                <div className={`relative mt-32 border-t-2 border-black pt-12 flex justify-between items-center group cursor-pointer hover:bg-zinc-50 transition-colors p-8 -mx-8 ${showBottomSection ? '' : 'lg:hidden'}`}>
                    <div>
                        <span className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Portfolio</span>
                        <span className="text-lg font-bold">Back to List</span>
                    </div>
                    <Link to="/portfolio" className="absolute inset-0 z-10" aria-label="Back to List"></Link>
                    <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-white group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowLeft size={20} />
                    </div>
                </div>

            </div>
        </div >
    );
}
