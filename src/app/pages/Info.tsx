export function Info() {
    const history = [
        { year: '2024', event: '단행본 300종 달성 및 글로벌 디자인 어워드 노미네이트' },
        { year: '2022', event: '브랜딩 컨설팅 영역 확장' },
        { year: '2020', event: '단행본 누적 200종 돌파' },
        { year: '2018', event: '책방곱셈 오픈 (연남동 본점)' },
        { year: '2016', event: '문화예술 아카이브 프로젝트 "기록의 미학" 런칭' },
        { year: '2015', event: '사회적기업 인증' },
    ];

    const services = [
        { title: '디자인 & 아트디렉팅', desc: 'Brand Identity, Editorial Design' },
        { title: '영상 & 모션그래픽', desc: 'Motion Graphics, Archive Video' },
        { title: '온라인 서비스', desc: 'Web & App Development, Digital Archive' },
        { title: '출판 & 아카이빙 컨설팅', desc: 'Publishing, Archiving Strategy' },
        { title: '행사 & 전시 운영', desc: 'Exhibition Planning, Cultural Events' },
    ];

    const partners = [
        '서울시', '국립중앙박물관', '국립현대미술관',
        '한국문화예술위원회', '예술경영지원센터', 'SBS',
    ];

    return (
        <div className="min-h-screen pt-12 pb-32 scroll-smooth">
            <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-8">

                {/* Section 1: Introduction */}
                <section className="col-span-1 md:col-span-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-6 border-b border-black pb-2 inline-block">About Us</h2>
                    <div className="text-3xl md:text-4xl font-medium leading-tight space-y-8">
                        <p>
                            우리는 글자와 기록 사이의 <br />가치를 찾습니다.
                        </p>
                        <p className="text-lg md:text-xl font-normal text-zinc-600 leading-relaxed">
                            디자인과 아카이빙을 통해 흩어져 있는 정보와 가치를 수집하고,
                            지속 가능한 기록의 형태로 재구성하는 전문 아카이빙 그룹입니다.
                        </p>
                    </div>
                </section>

                {/* Section 2: History (Offset layout) */}
                <section className="col-span-1 md:col-span-7 md:col-start-6">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-6 border-b border-black pb-2 inline-block">History</h2>
                    <ul className="space-y-6">
                        {history.map((item, i) => (
                            <li key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-8 border-b border-zinc-200 pb-4 last:border-0 hover:pl-2 transition-all duration-300">
                                <span className="font-bold text-lg">{item.year}</span>
                                <span className="md:col-span-3 text-zinc-700 font-medium">{item.event}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Section 3: Services */}
                <section className="col-span-1 md:col-span-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-6 border-b border-black pb-2 inline-block">Services</h2>
                    <ul className="space-y-8">
                        {services.map((s, i) => (
                            <li key={i} className="group">
                                <h3 className="text-xl font-bold mb-1 group-hover:text-zinc-500 transition-colors">{s.title}</h3>
                                <p className="text-sm text-zinc-400 font-normal">{s.desc}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Section 4: Partners */}
                <section className="col-span-1 md:col-span-7 md:col-start-6">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-6 border-b border-black pb-2 inline-block">Partners</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                        {partners.map((p, i) => (
                            <div key={i} className="text-lg font-medium border-b border-zinc-100 py-2">
                                {p}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 5: Contact Info (Simple) */}
                <section className="col-span-1 md:col-span-12 mt-12 pt-12 border-t border-black">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Contact</h3>
                            <p className="text-lg">hello@textandrecord.kr</p>
                            <p className="text-zinc-500 mt-2">02-1234-5678</p>
                        </div>
                        <div className="md:text-right">
                            <p className="text-lg">Seoul, Republic of Korea</p>
                            <p className="text-zinc-500 mt-2">Mapo-gu, Yanghwa-ro</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
