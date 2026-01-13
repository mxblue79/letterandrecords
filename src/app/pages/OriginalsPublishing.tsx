import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getSanityProjects, urlFor } from '../../lib/sanity';
import { SEO } from '../components/SEO';

interface SanityProject {
    _id: string;
    title: string;
    categories: string[];
    mainImage: any;
    desc?: string; // Assuming there might be a short description, or we just use title
    date: string;
}

export function OriginalsPublishing() {
    const [projects, setProjects] = useState<SanityProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSanityProjects();
                // Filter for 'Originals' or '자체 출판'
                const originalBooks = data.filter((p: SanityProject) =>
                    p.categories && p.categories.some(cat => ['자체 출판', 'Originals'].includes(cat))
                );
                // Sort by date descending
                const sortedBooks = originalBooks.sort((a: SanityProject, b: SanityProject) => {
                    const dateA = a.date ? new Date(a.date).getTime() : 0;
                    const dateB = b.date ? new Date(b.date).getTime() : 0;
                    return dateB - dateA;
                });
                setProjects(sortedBooks);
            } catch (error) {
                console.error("Failed to fetch Sanity projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <span className="text-zinc-400">Loading Books...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-12 pb-32 animate-in fade-in duration-500">
            <SEO title="우리가 출판한 책들" description="글자와기록사이가 직접 기획하고 출판한 고유한 이야기들을 소개합니다." />
            <div className="max-w-[1400px] mx-auto px-8">

                {/* Header & Back Link */}
                <div className="mb-12">
                    <Link to="/originals" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black transition-colors mb-8">
                        <ArrowLeft size={16} />
                        Back to Originals
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight">
                        우리가 출판한<br />
                        책들
                    </h1>
                </div>

                {/* 2-Column Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                    {projects.map((project) => (
                        <Link
                            key={project._id}
                            to={`/project/${project._id}`}
                            className="group block"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] bg-zinc-100 mb-6 overflow-hidden border border-zinc-200">
                                {project.mainImage ? (
                                    <img
                                        src={urlFor(project.mainImage).width(1200).url()}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                        No Image
                                    </div>
                                )}

                                {/* Overlay Icon */}
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div>
                                <div className="flex items-baseline justify-between mb-2">
                                    <h2 className="text-2xl font-medium group-hover:underline underline-offset-4 decoration-1">{project.title}</h2>
                                    <span className="text-sm text-zinc-400">
                                        {project.date ? project.date.substring(0, 7).replace('-', '.') : ''}
                                    </span>
                                </div>
                                {/* Using categories as tags/subtitle */}
                                <div className="flex gap-2 text-sm text-zinc-500">
                                    {project.categories?.filter(cat => !['자체 출판', 'Originals'].includes(cat)).join(', ')}
                                </div>
                            </div>
                        </Link>
                    ))}

                    {projects.length === 0 && (
                        <div className="col-span-2 py-32 text-center text-zinc-400">
                            아직 등록된 도서가 없습니다.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
