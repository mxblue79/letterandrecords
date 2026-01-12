import { SecretZone } from '../components/SecretZone';
import { Link } from 'react-router-dom';

export function Info() {
    const services = [
        {
            category: '아트디렉팅&디자인',
            linkKey: 'art_design',
            items: ['웹 / 앱 / 3D / 모션그래픽', 'PPT 및 보고서', '리플렛, 단행본 디자인']
        },
        {
            category: '출판',
            linkKey: 'publishing',
            items: ['자체 출판 / 출판 대행', '아카이빙 / 출판 컨설팅']
        },
        {
            category: '홍보',
            linkKey: 'promotion',
            items: ['홍보물 제작 / 웹배너', '카드뉴스 / 숏츠', '홍보 영상 / 홍보 대행']
        },
        {
            category: '영상',
            linkKey: 'video',
            items: ['홍보 영상 / 쇼츠', '스케치', '온라인 라이브 방송']
        },
        {
            category: '웹 서비스',
            linkKey: 'web_service',
            items: ['웹배너 & 랜딩 페이지 제작', '상세 페이지 제작', '홈페이지 제작', '웹 및 앱 제작']
        },
        {
            category: '행사',
            linkKey: 'event',
            items: ['교육 프로그램 진행', '전시회 운영 / 기념식 운영', '공연 운영 / 기타 행사']
        },
        {
            category: '책방곱셈',
            linkKey: 'bookstore',
            items: ['문화공간 책방곱셈 운영', '북콘서트 / 음악콘서트 / 전시 / 각종 모임 대관']
        }
    ];

    const history = [
        {
            year: '2026',
            items: [] // Placeholder
        },
        {
            year: '2025',
            items: ['양천구 문화플랫폼 와플(y+) 제작&운영']
        },
        {
            year: '2024',
            items: ['지역문화 전문인력 백서 아카이빙북 제작(지역문화진흥원)']
        },
        {
            year: '2023',
            items: [
                "문화예술치유 프로그램 지원사업 10년의 기록 '마음에도 스프링이 있다면‘ 제작(한국문화예술교육진흥원)",
                "제주시 용담1동 아카이빙북 제작"
            ]
        },
        {
            year: '2022',
            items: ['양천구 문화잡지 모양모양 제작(양천문화재단)']
        },
        {
            year: '2021',
            items: [
                "'다시, 바람과함께 사라지다' 출간",
                "양천동네이야기 제작(양천문화재단)"
            ]
        },
        {
            year: '2020',
            items: [
                "엘지화학 70주년 아카이빙북 제작",
                "'사회적기업가를 위한 창업가이드북' 제작"
            ]
        },
        {
            year: '2019',
            items: [
                "최고의 사자집단 이야기 '마포호연대기' 출간",
                "꿈다락토요문화학교 아카이빙북 '꿈다락은 모락모락' 제작",
                "서울연극센터 웹진 '연극인' 아카이빙북 제작"
            ]
        },
        {
            year: '2018',
            items: [
                "아름다운재단 전담 디자인사 선정",
                "서울문화재단 디자인풀 선정(9기)"
            ]
        },
        {
            year: '2017',
            items: [
                "서울문화재단 디자인풀 선정(8기)",
                "일본 서점 소개서 '동경책방기' 출간",
                "예비사회적기업지정",
                "'공공공간으로 행복한 공간 만들기' 아카이빙북 제작"
            ]
        },
        {
            year: '2016',
            items: [
                "메모리인한강 전시디자인(서울도서관)",
                "대상그룹 미원 60주년 브랜드팝업북 제작",
                "지역안내 단행본 '일곱 개의 키워드로 보는 마포이야기' 출간"
            ]
        },
        {
            year: '2015',
            items: [
                "서울브랜드 I.SEOUL.U BI부문 최우수상 수상",
                "개인사업자에서 주식회사로 변경"
            ]
        }
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

                {/* Section 2: Service (Right) */}
                <section className="col-span-1 md:col-span-6 md:col-start-7">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-8 border-b border-black pb-2 inline-block">Service</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                        {services.map((s, i) => (
                            <div key={i} className="group">
                                <Link to={`/?filter=${s.linkKey}`} className="block">
                                    <h3 className="text-lg font-bold mb-3 flex items-center gap-3 transition-colors group-hover:text-zinc-600 cursor-pointer">
                                        <span className="w-[2px] h-[20px] bg-black shrink-0 transition-colors group-hover:bg-zinc-400"></span>
                                        {s.category}
                                        <span className="text-[10px] text-zinc-400 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                    </h3>
                                </Link>
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

                {/* Section 3: History (Timeline Style) */}
                <section className="col-span-1 md:col-span-12 pt-16 border-t border-zinc-200">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-2 inline-block">History</h2>
                    </div>

                    <div className="relative">
                        {/* Central Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-2 bottom-0 w-[1px] bg-zinc-300"></div>
                        {/* Left Line (Mobile) */}
                        <div className="md:hidden absolute left-4 top-2 bottom-0 w-[1px] bg-zinc-300"></div>

                        <div className="space-y-12">
                            {history.map((item, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                        {/* Spacer for Desktop Balance */}
                                        <div className="hidden md:block md:w-1/2" />

                                        {/* Center Dot */}
                                        <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full border-4 border-white z-10 box-content"></div>

                                        {/* Content */}
                                        <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                            <span className="inline-block font-bold text-2xl mb-2">{item.year}</span>
                                            <div className={`space-y-1 ${item.year === '2026' ? 'h-8' : ''}`}>
                                                {item.items.length > 0 ? (
                                                    item.items.map((event, idx) => (
                                                        <p key={idx} className="text-zinc-600 font-medium leading-relaxed break-keep text-sm md:text-base">
                                                            {event}
                                                        </p>
                                                    ))
                                                ) : (
                                                    <span className="text-zinc-300 text-sm">Coming Soon</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Footer / Contact (Optional) */}
                <section className="col-span-1 md:col-span-12 mt-12">
                    {/* Contact info can go here if needed, or rely on global footer */}
                </section>

            </div>
        </div>
    );
}
