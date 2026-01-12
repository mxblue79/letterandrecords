import { Link } from 'react-router-dom';
import { Book, Utensils, Package, Home, ArrowRight } from 'lucide-react';

export function Originals() {
    const originals = [
        {
            id: 'publishing',
            title: 'Publishing',
            subtitle: 'Independent Books',
            desc: '우리가 출판한 책들',
            icon: Book,
            link: '/portfolio?filter=original_publishing' // Filter for own books
        },
        {
            id: 'recipe',
            title: "Mom's Recipe",
            subtitle: 'F&B Brand',
            desc: '엄마의 자서전과 영상, 그리고 요리 레시피',
            icon: Utensils,
            link: '#' // Future teaser page
        },
        {
            id: 'objects',
            title: 'Objects',
            subtitle: 'Curated Goods',
            desc: '일상에 영감을 더하는 상품들',
            icon: Package,
            link: '#' // Future shop link
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
                                className="group relative aspect-square md:aspect-[4/3] bg-zinc-50 border border-zinc-200 p-8 flex flex-col justify-between hover:border-black transition-all duration-300"
                            >
                                {/* Top Right Arrow */}
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
        </div>
    );
}
