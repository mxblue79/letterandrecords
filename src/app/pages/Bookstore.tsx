import { BookOpen, Music, Users, Instagram, ArrowUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';
import { getInstagramPosts, urlFor, type SanityInstagramPost } from '../../lib/sanity';
import spaceImage from '../../assets/bookstore-space.jpg';

export function Bookstore() {
  const [instagramPosts, setInstagramPosts] = useState<SanityInstagramPost[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getInstagramPosts();
        setInstagramPosts(data);
      } catch (error) {
        console.error("Failed to fetch Instagram posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const programs = [
    {
      title: '북콘서트',
      desc: '저자와 독자가 만나는 문화 공간',
      detail: '매월 마지막 주 금요일',
      icon: Music
    },
    {
      title: '큐레이션 서가',
      desc: '매달 새로운 주제로 선별된 책들',
      detail: '월간 테마 기획전',
      icon: BookOpen
    },
    {
      title: '작가 모임',
      desc: '작가, 디자이너, 편집자들의 교류',
      detail: '창작자 네트워킹',
      icon: Users
    },
  ];

  return (
    <div className="min-h-screen pt-12 pb-32 scroll-smooth">
      <div className="max-w-[1400px] mx-auto px-8">

        {/* Header Section */}
        <section className="mb-24 md:mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black pb-8">
            <div>
              <span className="text-sm font-bold uppercase tracking-wide mb-4 block">Bookstore the X</span>
              <h1 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight">
                물리적 공간에서<br />
                기록을 만납니다.
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-600 max-w-md font-normal leading-relaxed">
              디지털 기록이 물리적 경험으로 변하는 곳.<br />
              책방곱셈은 사람과 책, 그리고 기록이 만나는<br />
              오프라인 거점입니다.
            </p>
          </div>
        </section>

        {/* Info Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="aspect-[4/3] bg-zinc-100 overflow-hidden">
              <img
                src={spaceImage}
                alt="Bookstore Space Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-2">Location</h3>
                <p className="text-zinc-600 leading-relaxed">
                  서울시 마포구 연남동 성미산로29길 33, 1층
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Hours</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Tuesday - Sunday<br />
                  12:00 PM - 09:00 PM<br />
                  <span className="text-zinc-400 text-sm">(Closed on Mondays)</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs List */}
        <section className="mb-24">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-8 border-b border-black pb-2 inline-block">Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, i) => {
              const Icon = program.icon;
              return (
                <div key={i} className="group border-t border-zinc-200 pt-6 hover:border-black transition-colors">
                  <div className="mb-4 text-zinc-400 group-hover:text-black transition-colors">
                    <Icon strokeWidth={1.5} size={32} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{program.title}</h3>
                  <p className="text-zinc-600 mb-4">{program.desc}</p>
                  <p className="text-sm text-zinc-400 font-medium">{program.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Archive Feed (Instagram) */}
        <section>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-4 border-b border-black pb-2 inline-block">Event Records</h2>
            </div>
            <Button variant="outline" className="rounded-none border-black hover:bg-black hover:text-white transition-colors" asChild>
              <a href="https://instagram.com/bookstorethex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Instagram size={18} />
                <span>Instagram@bookstorethex</span>
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 mb-12">
            {instagramPosts.length > 0 ? (
              instagramPosts.slice(0, visibleCount).map((post) => (
                <div
                  key={post._id}
                  className={`group flex flex-col gap-2 p-4 border transition-colors ${post.isPinned
                    ? 'bg-zinc-50 border-black'
                    : 'bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                >
                  {/* Best Badge for Pinned Posts */}
                  {post.isPinned && (
                    <span className="text-[10px] font-bold text-black tracking-widest mb-1">BEST PICK</span>
                  )}

                  {/* Spacer for non-pinned posts to align images if needed, or just let them be natural. 
                      Actually, let's keep it simple first. If alignment is off, we can fix later.
                  */}

                  <a
                    href={post.link || '#'}
                    target={post.link ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`block aspect-square bg-zinc-100 relative overflow-hidden ${post.link ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    {post.image && (
                      <img
                        src={urlFor(post.image).width(400).height(400).url()}
                        alt={post.caption || 'Instagram Post'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {/* Link Icon Overlay */}
                    {post.link && (
                      <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                        <Instagram size={14} className="text-black" />
                      </div>
                    )}
                  </a>

                  {/* Caption & Date Row */}
                  <div className="flex justify-between items-start gap-2 mt-1">
                    {post.caption ? (
                      <p className="text-sm text-zinc-900 leading-relaxed line-clamp-2">
                        <a
                          href={post.link || '#'}
                          target={post.link ? "_blank" : "_self"}
                          className="hover:text-black transition-colors"
                        >
                          {post.caption}
                        </a>
                      </p>
                    ) : <div></div>}

                    {post.date && (
                      <span className="text-xs text-zinc-400 font-medium whitespace-nowrap pt-1">
                        {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' }).replace(/\. /g, '.').slice(0, 7)}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Fallback / Empty State (Optional: Keep original placeholders or show empty message)
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-zinc-50 flex items-center justify-center text-zinc-300 text-sm border border-zinc-100">
                  <span className="text-xs">No Posts Yet</span>
                </div>
              ))
            )}
          </div>

          {/* Pagination / Footer Navigation */}
          <div className="mt-24 mb-12 flex items-center justify-center gap-8">
            {instagramPosts.length > visibleCount ? (
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
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
        </section>

      </div>
    </div>
  );
}
