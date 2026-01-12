import { SecretZone } from '../components/SecretZone';

export function Info() {
    const services = [
        {
            category: '아트디렉팅&디자인',
            items: ['웹 / 앱 / 3D / 모션그래픽', 'PPT 및 보고서', '리플렛, 단행본 디자인']
        },
        {
            category: '출판',
            items: ['자체 출판 / 출판 대행', '아카이빙 / 출판 컨설팅']
        },
        {
            category: '홍보',
            items: ['홍보물 제작 / 웹배너', '카드뉴스 / 숏츠', '홍보 영상 / 홍보 대행']
        },
        {
            category: '영상',
            items: ['홍보 영상 / 쇼츠', '스케치', '온라인 라이브 방송']
        },
        {
            category: '웹 서비스',
            items: ['웹배너 & 랜딩 페이지 제작', '상세 페이지 제작', '홈페이지 제작', '웹 및 앱 제작']
        },
        {
            category: '행사',
            items: ['교육 프로그램 진행', '전시회 운영 / 기념식 운영', '공연 운영 / 기타 행사']
        },
        {
            category: '책방곱셈',
            items: ['문화공간 책방곱셈 운영', '북콘서트 / 음악콘서트 / 전시 / 각종 모임 대관']
        }

    ];

    const history = [
        { year: '2024', event: '단행본 300종 달성 및 글로벌 디자인 어워드 노미네이트' },
        { year: '2022', event: '브랜딩 컨설팅 영역 확장' },
        { year: '2020', event: '단행본 누적 200종 돌파' },
        { year: '2018', event: '책방곱셈 오픈 (연남동 본점)' },
        { year: '2016', event: '문화예술 아카이브 프로젝트 "기록의 미학" 런칭' },
        { year: '2015', event: '사회적기업 인증' },
    ];

    return (
        <div className="min-h-screen pt-12 pb-32 scroll-smooth">
            <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-8">

                {/* Section 1: About Us (Left) */}
                <section className="col-span-1 md:col-span-5">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-8 border-b border-black pb-2 inline-block">About Us</h2>
                    <div className="space-y-8">
                        <div>
                            <p className="text-3xl font-semibold leading-tight mb-2">디자인, 세상을 기록하다</p>
                            <p className="text-lg text-zinc-500 font-medium">Design Records the World</p>
                        </div>
                        <div className="text-base md:text-lg font-normal text-zinc-800 leading-relaxed space-y-4">
                            <p>
                                글자와기록사이는 필요에 가치를 더하는 문화예술기업입니다.<br />
                                디자인 전문성을 바탕으로 기업 및 단체의 가치를 높이는 다양한 활동을 하고 있습니다.
                            </p>
                            <p>
                                또한 연남동 끝자락에 책과 상상을 곱셈하는 실험실 &lt;책방곱셈&gt;을 운영하고 있습니다.
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <SecretZone />
                    </div>
                </section>

                {/* Section 2: Service (Right) - replacing History's old spot */}
                <section className="col-span-1 md:col-span-6 md:col-start-7">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-8 border-b border-black pb-2 inline-block">Service</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                        {services.map((s, i) => (
                            <div key={i}>
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
                                    <span className="w-[2px] h-[20px] bg-black shrink-0"></span>
                                    {s.category}
                                </h3>
                                <ul className="space-y-1">
                                    {s.items.map((item, idx) => (
                                        <li key={idx} className="text-zinc-800 text-sm md:text-base leading-relaxed break-keep">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: History (Full Width Below) */}
                <section className="col-span-1 md:col-span-12 pt-12 border-t border-zinc-200">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-8 border-b border-black pb-2 inline-block">History</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                        {history.map((item, i) => (
                            <li key={i} className="flex gap-6 border-b border-zinc-100 pb-4 items-start">
                                <span className="font-bold text-xl min-w-[3rem]">{item.year}</span>
                                <span className="text-zinc-700 font-medium pt-0.5">{item.event}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Footer / Contact (Optional) */}
                <section className="col-span-1 md:col-span-12 mt-12">
                    {/* Contact info can go here if needed, or rely on global footer */}
                </section>

            </div>
        </div>
    );
}
