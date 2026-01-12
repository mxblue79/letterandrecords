import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Utensils, Package, Home, ArrowRight, X } from 'lucide-react';

export function Originals() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const originals = [
        {
            id: 'publishing',
            title: 'Publishing',
            subtitle: 'Independent Books',
            desc: '우리가 출판한 책들',
            icon: Book,
            link: '/originals/publishing' // Dedicated Grid Page
        },
        {
            id: 'recipe',
            title: "Mom's Recipe",
            subtitle: 'F&B Brand',
            desc: '엄마의 자서전과 영상, 그리고 요리 레시피',
            icon: Utensils,
            link: '#', // Future teaser page
            isComingSoon: true
        },
        {
            id: 'objects',
            title: 'Objects',
            subtitle: 'Curated Goods',
            desc: '일상에 영감을 더하는 상품들',
            icon: Package,
            link: '#', // Future shop link
            isComingSoon: true
        },
        {
            id: 'rental',
            title: 'Space Rental',
            desc: '공연, 행사, 독서모임, 기타 모임을 위한 공간 대여',
            subtitle: 'Space Share',
            icon: Home,
            link: '/bookstore/rental'
        }
    ];

    const handleItemClick = (e: React.MouseEvent, isComingSoon?: boolean) => {
        if (isComingSoon) {
            e.preventDefault();
            setIsModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen pt-12 pb-32 animate-in fade-in duration-500">
            <div className="max-w-[1400px] mx-auto px-8">

                {/* Header */}
                <section className="mb-20 border-b border-black pb-8">
                    <span className="text-sm font-bold uppercase tracking-wide mb-4 block">Originals</span>
                    <h1 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight">
                        우리가 제공하는<br />
                        고유한 기록
                    </h1>
                </section>

                {/* 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {originals.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.id}
                                to={item.link}
                                onClick={(e) => handleItemClick(e, item.isComingSoon)}
                                className="group relative aspect-square md:aspect-[4/3] bg-zinc-50 border border-zinc-200 p-8 flex flex-col justify-between hover:border-black transition-all duration-300 cursor-pointer"
                            >
                                {/* Top Right Arrow (Hide if coming soon, or change icon?) Keep arrow for consistency but maybe different behavior */}
                                <div className="absolute top-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowRight strokeWidth={1} size={32} />
                                </div>

                                {/* Content Top */}
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 block">{item.subtitle}</span>
                                    <h2 className="text-3xl md:text-4xl font-medium mb-4">{item.title}</h2>
                                    <Icon strokeWidth={1} size={40} className="text-zinc-300 group-hover:text-black transition-colors duration-300" />
                                </div>

                                {/* Content Bottom */}
                                <div>
                                    <p className="text-zinc-500 text-lg group-hover:text-black transition-colors duration-300">
                                        {item.desc}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>

            {/* Coming Soon Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white p-8 md:p-12 shadow-xl border border-zinc-200 max-w-md w-full mx-4 text-center relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-6 flex justify-center text-zinc-300">
                            <Package size={48} strokeWidth={1} />
                        </div>

                        <h3 className="text-2xl font-semibold mb-2">준비 중입니다</h3>
                        <p className="text-zinc-500 mb-8">
                            더 좋은 콘텐츠를 위해 준비하고 있습니다.<br />
                            조금만 기다려주세요!
                        </p>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-zinc-800 transition-colors w-full"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
