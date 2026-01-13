import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/SEO';

const categories = [
  '전체',
  '아트디렉팅&디자인',
  '출판',
  '홍보',
  '영상',
  '웹 서비스',
  '행사',
  '서점 운영',
];

const allTags = [
  '#공공기관', '#드라마굿즈', '#전시도록', '#브랜딩', '#디지털아카이브',
  '#로컬크리에이터', '#사회적기업', '#매거진'
];

const projects = [
  {
    id: 1,
    title: '모범택시 시즌2',
    categories: ['아트디렉팅&디자인', '굿즈', '영상'],
    date: '2024.03',
    tags: ['#드라마굿즈', '#영상아카이브'],
    purpose: '드라마의 세계관을 물리적 기록물로 확장하여 팬들에게 깊은 몰입감 선사',
    keywords: ['팬덤', '굿즈', '아카이빙']
  },
  {
    id: 2,
    title: '마이 데몬',
    categories: ['아트디렉팅&디자인', '굿즈', '영상'],
    date: '2023.11',
    tags: ['#드라마굿즈', '#브랜딩'],
    purpose: '캐릭터 아카이빙을 통한 브랜드 아이덴티티 강화',
    keywords: ['브랜딩', '캐릭터', '기록']
  },
  {
    id: 3,
    title: '서울시 도시재생 아카이브',
    categories: ['웹 서비스'],
    date: '2023.09',
    tags: ['#공공기관', '#디지털아카이브'],
    purpose: '도시의 변화 과정을 영구적으로 보존하기 위한 디지털 뉴스룸 구축',
    keywords: ['도시재생', '빅데이터', '영구보존']
  },
  {
    id: 4,
    title: '국립현대미술관 전시도록',
    categories: ['출판', '아트디렉팅&디자인'],
    date: '2024.01',
    tags: ['#전시도록', '#예술'],
    purpose: '전시의 찰나를 예술적 가치를 담은 책으로 영원히 기록',
    keywords: ['미술관', '큐레이션', '도록']
  },
  {
    id: 5,
    title: '한국문화예술위원회 브랜딩',
    categories: ['아트디렉팅&디자인'],
    date: '2022.05',
    tags: ['#공공기관', '#브랜딩'],
    purpose: '문화예술의 가치를 시각적으로 체계화하여 기관의 정체성 확립',
    keywords: ['CI', 'BI', '시스템']
  },
  {
    id: 6,
    title: '예술경영 매거진',
    categories: ['출판'],
    date: '2024.02',
    tags: ['#매거진', '#정기간행물'],
    purpose: '예술 현장의 동향을 정기적으로 기록하여 전문 데이터 축적',
    keywords: ['경영', '데이터', '정론']
  },
];

export function Portfolio() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'video') setSelectedCategory('영상');
    else if (filter === 'design') setSelectedCategory('아트디렉팅&디자인');
    else if (filter === 'publishing') setSelectedCategory('출판');
    else if (filter === 'online') setSelectedCategory('웹 서비스');
    else if (filter === 'event') setSelectedCategory('행사');
    else setSelectedCategory('전체');
  }, [searchParams]);

  const filteredProjects = projects.filter((p) => {
    const categoryMatch = selectedCategory === '전체' || p.categories.includes(selectedCategory);
    const tagMatch = !selectedTag || p.tags.includes(selectedTag);
    return categoryMatch && tagMatch;
  });

  return (
    <div className="min-h-screen pt-20 bg-[#fdfaf3]">
      <SEO title="포트폴리오" description="글자와기록사이의 다양한 프로젝트 아카이브를 확인해보세요." />
      {/* Header */}
      <section className="py-24 px-4 bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-secondary border-2 border-black rounded-full mb-8 font-black uppercase text-sm text-black">SEARCHABLE MUSEUM</div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">Portfolio</h1>
          <p className="text-xl md:text-2xl font-bold text-zinc-600 max-w-2xl mx-auto leading-tight">
            사용자가 관심 있는 키워드로 아카이브를 탐험하며 <br />
            <span className="text-black underline decoration-primary decoration-4 underline-offset-4">우리가 남긴 기록의 가치</span>를 발견해보세요.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 sticky top-[3.5rem] md:top-24 z-40">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 bg-white/90 backdrop-blur-sm border-2 border-black rounded-[2rem] p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedTag(null);
                }}
                className={`px-6 py-2 rounded-full font-black transition-all border-2 ${selectedCategory === category
                  ? 'border-black bg-primary text-black'
                  : 'border-transparent hover:bg-zinc-100 text-zinc-500'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag Cloud */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-4 py-1 rounded-none font-bold text-sm transition-all border-2 border-black ${selectedTag === tag
                  ? 'bg-accent text-black scale-105 shadow-inner'
                  : 'bg-white text-black hover:bg-secondary'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="mb-12 flex items-baseline justify-between border-b-2 border-black pb-4">
          <div className="font-black text-2xl uppercase tracking-tighter">
            <span className="bg-black text-white px-4 py-1 rounded-full mr-2">{filteredProjects.length}</span> RECORDS FOUND
          </div>
          {selectedTag && (
            <div className="text-sm font-bold bg-accent border-2 border-black px-3 py-1 animate-pulse">
              FILTERING BY {selectedTag}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white border-2 border-black rounded-[2.5rem] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex flex-col h-full"
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-[4/3] bg-zinc-100 border-b-2 border-black overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300" />

                {/* Categories - Top Left */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 items-start">
                  {project.categories.map((cat, idx) => (
                    <span key={idx} className="bg-white/95 backdrop-blur-sm border-2 border-black px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Hover Overlay - Why & Keywords */}
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 text-white z-10">
                  <div className="mb-6">
                    <p className="text-xs font-black text-primary uppercase mb-2">Record Purpose</p>
                    <p className="text-lg font-bold leading-tight italic">"{project.purpose}"</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-secondary uppercase mb-3">Key Records</p>
                    <div className="flex flex-wrap gap-2">
                      {project.keywords.map((kw, i) => (
                        <span key={i} className="text-xs bg-white text-black px-2 py-1 font-black">#{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Date instead of Category */}
                <p className="text-sm font-black text-secondary uppercase tracking-widest mb-2">{project.date}</p>
                <h3 className="text-2xl font-black mb-6 leading-tight flex-grow">{project.title}</h3>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map(t => (
                      <span key={t} className="text-[10px] font-bold text-zinc-400">{t}</span>
                    ))}
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
