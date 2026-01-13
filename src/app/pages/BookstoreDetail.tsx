import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

const contentMap: Record<string, {
    title: string;
    subtitle: string;
    desc: string;
    details: string[];
}> = {
    curation: {
        title: '큐레이션 서가',
        subtitle: "Designer's Selection",
        desc: '창작자에게 영감을 주는 디자이너의 선별 큐레이션과 독립서적을 소개합니다.',
        details: [
            '디자인, 예술, 인문학 중심의 큐레이션',
            '독립출판물 및 희귀 서적 소개',
            '창작자들을 위한 레퍼런스 북 제공',
            '시즌별 기획 전시와 연계된 도서 추천'
        ]
    },
    performance: {
        title: '공연 / 북콘서트',
        subtitle: 'Live Performance',
        desc: '음악과 이야기가 흐르는 라이브 스테이지에서 저자와 독자, 연주자와 관객이 만납니다.',
        details: [
            '저자와의 만남 (북토크)',
            '어쿠스틱 라이브 공연',
            '낭독회 및 시 낭송회',
            '소규모 문화 예술 기획 공연'
        ]
    },
    rental: {
        title: '대관',
        subtitle: 'Space Rental',
        desc: '전시, 촬영, 모임을 위한 프라이빗한 공간을 공유합니다. 창작의 영감이 필요한 순간 함께하세요.',
        details: [
            '전시 및 팝업 스토어 대관',
            '영상 및 스틸 촬영 대관 (상업/비상업)',
            '독서 모임 및 워크숍 장소 대관',
            '소규모 파티 및 네트워킹 행사'
        ]
    }
};

export function BookstoreDetail() {
    const { id } = useParams<{ id: string }>();
    const content = id ? contentMap[id] : null;

    if (!content) {
        return (
            <div className="min-h-screen pt-32 pb-32 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">페이지를 찾을 수 없습니다.</h2>
                <Link to="/bookstore" className="text-zinc-500 hover:text-black border-b border-zinc-300 hover:border-black pb-1 transition-colors">
                    돌아가기
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-12 pb-32 animate-in fade-in duration-500">
            <SEO title={content.title} description={content.desc} />
            <div className="max-w-[1400px] mx-auto px-8">

                {/* Back Button */}
                <div className="mb-12">
                    <Link to="/bookstore" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-black transition-colors">
                        <ArrowLeft size={16} />
                        Back to Bookstore
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-20 border-b border-black pb-12">
                    <span className="text-sm font-bold uppercase tracking-wide mb-4 block text-zinc-400">{content.subtitle}</span>
                    <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-6">{content.title}</h1>
                    <p className="text-lg md:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed break-keep">
                        {content.desc}
                    </p>
                </div>

                {/* Content Body (Skeleton for now) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                    {/* Left: Image Placeholder */}
                    <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center">
                        <span className="text-zinc-300 font-medium">Image Area</span>
                    </div>

                    {/* Right: Details List */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 border-b border-zinc-200 pb-2 inline-block">Key Features</h3>
                        <ul className="space-y-4">
                            {content.details.map((detail, index) => (
                                <li key={index} className="flex items-start gap-3 text-zinc-600 leading-relaxed">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0"></span>
                                    {detail}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-12 p-6 bg-zinc-50 border border-zinc-100">
                            <p className="text-sm text-zinc-500 mb-2 font-bold uppercase">Contact for Inquiry</p>
                            <p className="text-lg font-medium">letternrecords@gmail.com</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
