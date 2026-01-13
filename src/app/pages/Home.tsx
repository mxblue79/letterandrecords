import { useRef, useMemo, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowUp, Check } from 'lucide-react';
import { getSanityProjects, urlFor } from '../../lib/sanity'; // Sanity Import

// Helper to get YouTube ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Define Sanity Data Interface
interface SanityProject {
  _id: string;
  title: string;
  categories: string[];
  mainImage: any;
  videoUrl?: string;
  date: string;
}

// Fixed Fixed 20-unit masonry pattern
const MASONRY_PATTERN = [
  'aspect-[9/16]', 'aspect-square', 'aspect-[16/9]', 'aspect-[3/4]', 'aspect-[4/3]', // 1-5 (Extremely varied)
  'aspect-[16/9]', 'aspect-[3/4]', 'aspect-[9/16]', 'aspect-square', 'aspect-[4/5]', // 6-10
  'aspect-[4/3]', 'aspect-[16/9]', 'aspect-square', 'aspect-[3/4]', 'aspect-[9/16]', // 11-15
  'aspect-square', 'aspect-[4/5]', 'aspect-[16/9]', 'aspect-[3/4]', 'aspect-square'  // 16-20
];

const CATEGORY_DISPLAY = [
  { key: '아트디렉팅&디자인', label: '디자인' },
  { key: '출판', label: '출판' },
  { key: '홍보', label: '홍보' },
  { key: '영상', label: '영상' },
  { key: '웹 서비스', label: '웹' },
  { key: '행사', label: '행사' },
  { key: '책방 곱셈', label: '책방곱셈' },
];

// ... (existing code)

function ProjectItem({ project, index }: { project: SanityProject; index: number }) {
  // Determine image source
  let imageSrc = '';

  if (project.mainImage) {
    imageSrc = urlFor(project.mainImage).width(800).url();
  }

  // Fallback to video thumbnail if no main image
  if (!imageSrc && project.videoUrl) {
    const videoId = getYouTubeId(project.videoUrl);
    if (videoId) {
      imageSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  }

  // Format date to YYYY.MM
  const formattedDate = project.date ? (() => {
    const d = new Date(project.date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${year}.${month}`;
  })() : '';

  const patternIndex = index % 20;
  const ratio = MASONRY_PATTERN[patternIndex];

  return (
    <Link to={`/project/${project._id}`} className="block mb-8 break-inside-avoid group cursor-pointer">
      {/* Category Checklist - Top Frame (Mobile Only) */}
      <div className="mb-2 flex flex-wrap gap-2 md:hidden">
        {CATEGORY_DISPLAY.map((item) => {
          const isActive = project.categories && project.categories.includes(item.key);
          return (
            <div key={item.key} className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm border border-black/10">
              <div className={`w-3 h-3 border border-black flex items-center justify-center transition-colors ${isActive ? 'bg-black' : 'bg-transparent'}`}>
                {isActive && <Check size={8} className="text-white" strokeWidth={4} />}
              </div>
              <span className={`text-[10px] font-bold leading-none ${isActive ? 'text-black' : 'text-zinc-400'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className={`relative overflow-hidden bg-gray-100 ${ratio} mb-3`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-90"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
            <span className="text-zinc-300 font-bold text-sm tracking-widest uppercase">
              글자와기록사이
            </span>
          </div>
        )}

        {/* Category Checklist Overlay - Desktop Hover (Inside) */}
        <div className="hidden md:flex absolute top-3 left-3 z-30 flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {CATEGORY_DISPLAY.map((item) => {
            const isActive = project.categories && project.categories.includes(item.key);
            return (
              <div key={item.key} className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-1.5 py-1 rounded-sm border border-black/10 shadow-sm">
                <div className={`w-3 h-3 border border-black flex items-center justify-center transition-colors ${isActive ? 'bg-black' : 'bg-transparent'}`}>
                  {isActive && <Check size={8} className="text-white" strokeWidth={4} />}
                </div>
                <span className={`text-[10px] font-bold leading-none ${isActive ? 'text-black' : 'text-zinc-400'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        {project.videoUrl && (
          <div className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        )}
      </div>
      <div className="px-2">
        <div className="flex justify-between items-baseline gap-2">
          <h3 className="text-[14px] font-medium leading-tight text-black flex-1 truncate text-left" title={project.title}>
            {project.title}
          </h3>
          <span className="text-[12px] text-zinc-500 font-bold whitespace-nowrap">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [visibleCount, setVisibleCount] = useState(20);
  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from Sanity on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSanityProjects();
        console.log('Sanity Data Loaded:', data);
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch Sanity projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get('filter');

    // Sort logic: Sort by date descending (Handle empty dates safely)
    const sortedProjects = [...projects].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    if (!filter) return sortedProjects;

    const categoryMap: Record<string, string[]> = {
      'art_design': ['디자인', '아트디렉팅', '아트디렉팅&디자인', '브랜딩'],
      'publishing': ['출판', '출판 & 아카이빙 컨설팅'],
      'promotion': ['홍보', '브랜딩'],
      'video': ['영상', '모션', '모션그래픽', '영상 & 모션그래픽'],
      'web_service': ['웹', '앱', '웹 서비스', '아카이브/웹/앱'],
      'event': ['행사', '전시', '행사 & 전시 운영'],
      'bookstore': ['서점', '책방', '서점 운영', '책방 곱셈'],
      'original_publishing': ['자체 출판', 'Originals']
    };

    const targetCategories = categoryMap[filter];
    if (!targetCategories) return sortedProjects;

    // Multi-select Filtering Logic:
    // Check if the project's category array INCLUDES ANY of the target categories
    return sortedProjects.filter(p =>
      p.categories && p.categories.some(cat => targetCategories.includes(cat))
    );
  }, [location.search, projects]);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(20);
  }, [location.search]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleProjects.length < filteredProjects.length;

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-sm text-zinc-400">Loading Portfolio...</div>;
  }

  return (
    <div className="min-h-screen bg-background pt-8 px-4 scroll-smooth" ref={containerRef}>
      <SEO />
      <div className="columns-1 md:columns-2 lg:columns-5 gap-x-6 gap-y-12 mx-auto max-w-[1400px]">
        {visibleProjects.map((project, index) => (
          <ProjectItem key={project._id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-24 mb-12 flex items-center justify-center gap-8">
        {hasMore ? (
          <button
            onClick={() => setVisibleCount(prev => prev + 20)}
            className="inline-block text-[13px] font-medium border-b border-black pb-0.5 hover:opacity-50 transition-opacity"
          >
            view more (+)
          </button>
        ) : (
          <span className="text-[13px] text-zinc-300">end of list</span>
        )}

        <div className="h-3 w-[1px] bg-zinc-300"></div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[13px] font-medium hover:text-zinc-500 transition-colors flex items-center gap-1"
        >
          <ArrowUp size={14} /> Top
        </button>
      </div>
    </div>
  );
}
