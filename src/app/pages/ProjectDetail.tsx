import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSanityProject, urlFor } from '../../lib/sanity';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { SEO } from '../components/SEO';

// Define Custom Components for Portable Text
const ptComponents: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) return null;
            return (
                <figure className="w-full my-8">
                    <img
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || 'Project Image'}
                        className="w-full rounded-sm shadow-sm"
                    />
                    {value.caption && (
                        <figcaption className="mt-4 text-center text-sm text-zinc-400">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    block: {
        // Customize block types if needed
        normal: ({ children }) => <p className="text-lg leading-loose text-zinc-700 whitespace-pre-wrap mb-6">{children}</p>,
        h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
    },
};

export function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div className="min-h-screen pt-48 text-center text-zinc-400">Loading Project...</div>;
    }

    if (!project) {
        return <div className="min-h-screen pt-48 text-center text-zinc-400">Project not found.</div>;
    }

    // Format date
    const formattedDate = project.date ? (() => {
        const d = new Date(project.date);
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
    })() : '-';

    return (
        <div className="min-h-screen pb-32 bg-background">
            <SEO
                title={project.title}
                description={project.description || `${project.title} - 글자와기록사이 포트폴리오`}
                image={project.mainImage ? urlFor(project.mainImage).width(800).url() : undefined}
            />

            {/* 1. Header (Sanity Style Title & Properties) */}
            <div className="max-w-[800px] mx-auto px-6 pt-24 pb-12">
                {/* Breadcrumb / Back */}
                <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-black mb-8 transition-colors text-sm font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
                </Link>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
                    {project.title}
                </h1>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 border-b border-zinc-200 pb-8 mb-8 text-sm">
                    <div className="grid grid-cols-[100px_1fr] items-center">
                        <span className="text-zinc-500">Category</span>
                        <span className="font-medium">
                            {project.categories && project.categories.length > 0 ? project.categories.join(', ') : '-'}
                        </span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center">
                        <span className="text-zinc-500">Year</span>
                        <span className="font-medium">{formattedDate}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center">
                        <span className="text-zinc-500">Client</span>
                        <span className="font-medium">{project.client || '-'}</span>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center">
                        <span className="text-zinc-500">Role</span>
                        <span className="font-medium">{project.role || '-'}</span>
                    </div>
                </div>

                {/* Intro Text */}
                {project.description && (
                    <p className="text-lg md:text-xl leading-relaxed text-zinc-800 font-medium mb-12">
                        {project.description}
                    </p>
                )}
            </div>

            {/* 2. Content Body */}
            <div className="max-w-[1000px] mx-auto px-6 space-y-12">

                {/* Top Video if exists */}
                {project.videoUrl && (
                    <div className="w-full aspect-video bg-zinc-100 rounded-sm shadow-sm mb-12">
                        <iframe
                            src={`https://www.youtube.com/embed/${getYouTubeId(project.videoUrl)}`}
                            title="YouTube video player"
                            className="w-full h-full rounded-sm"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}

                {/* Portable Text Content */}
                <div className="flex flex-col items-center w-full">
                    {project.content ? (
                        <PortableText value={project.content} components={ptComponents} />
                    ) : (
                        <p className="text-zinc-400 text-sm">No content details.</p>
                    )}
                </div>
            </div>

            {/* 3. Footer Navigation */}
            <div className="max-w-[800px] mx-auto px-6 mt-32 pt-12 border-t border-zinc-200 flex justify-between items-center text-sm">
                <Link to="/" className="text-zinc-400 hover:text-black transition-colors font-medium">List</Link>
                {/* Placeholder for Next Project */}
                <Link to="#" className="flex items-center text-zinc-300 pointer-events-none font-bold">
                    Next Project <ArrowRight size={16} className="ml-2" />
                </Link>
            </div>

        </div>
    );
}
