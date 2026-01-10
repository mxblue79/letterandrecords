export function About() {
  const history = [
    { year: '2015', event: '사회적기업 인증 및 본격적인 디자인 사업 확장' },
    { year: '2016', event: '문화예술 아카이브 프로젝트 "기록의 미학" 런칭' },
    { year: '2017', event: '서울시 도시재생 기록화 사업 파트너십 체결' },
    { year: '2018', event: '책방곱셈 오픈 (연남동 본점) - 복합문화공간의 시작' },
    { year: '2019', event: '전시 도록 아카이빙 솔루션 "Digital Archive" 개발' },
    { year: '2020', event: '단행본 누적 200종 돌파 및 온라인 스토어 오픈' },
    { year: '2021', event: '로컬 크리에이터 협업 프로젝트 "동네의 발견" 주관' },
    { year: '2022', event: '브랜딩 컨설팅 영역 확장 및 디자인 스튜디오 개편' },
    { year: '2023', event: '문화체육관광부 예술경영지원 표창 수상' },
    { year: '2024', event: '단행본 300종 달성 및 글로벌 디자인 어워드 노미네이트' },
    { year: '2025', event: '디지털 전환 가속화 및 아카이브 플랫폼 2.0 런칭 예정' },
  ];

  const partners = [
    '서울시', '국립중앙박물관', '국립현대미술관',
    '한국문화예술위원회', '예술경영지원센터', 'SBS',
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#fdfaf3]">
      {/* Vision & Identity */}
      <section className="py-24 px-4 bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-accent border-2 border-black rounded-full mb-8 font-black uppercase text-sm text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">SINCE 2010</div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">About Us</h1>
          <p className="text-2xl md:text-3xl font-black leading-tight mb-6">
            "우리는 글자와 기록 사이의 가치를 찾습니다."
          </p>
          <p className="text-lg md:text-xl font-medium text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            글자와기록사이는 디자인과 아카이빙을 통해 흩어져 있는 정보와 가치를 수집하고,
            지속 가능한 기록의 형태로 재구성하는 **전문 아카이빙 그룹**입니다.
          </p>
        </div>
      </section>

      {/* Impact Archive - Key Numbers */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Time of Archive', value: '15+', unit: 'Years' },
              { label: 'Projects Done', value: '500+', unit: 'Cases' },
              { label: 'Books Published', value: '300+', unit: 'Volumes' },
              { label: 'Design Awards', value: '12+', unit: 'Global' },
            ].map((stat, i) => (
              <div key={i} className="bg-white border-2 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center group hover:scale-105 transition-transform">
                <p className="text-sm font-black text-secondary uppercase mb-2">{stat.label}</p>
                <p className="text-5xl font-black tracking-tighter mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-zinc-400 uppercase">{stat.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Record - Business Domains */}
      <section className="py-32 px-4 bg-[#fdfaf3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-20 tracking-tighter uppercase text-center flex flex-col items-center">
            <span className="text-lg text-secondary mb-2 italic">BUSINESS AREAS</span>
            우리가 기록하는 법 <br />
            <span className="text-2xl mt-4 font-bold text-zinc-500">(How we record)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '종이로 기록하다', desc: '출판, 단행본 제작, 기록물 디자인', color: 'bg-primary', icon: '📖' },
              { title: '영상으로 기록하다', desc: '모션그래픽, 아카이브 영상, 홍보 영상', color: 'bg-accent', icon: '📹' },
              { title: '공간으로 기록하다', desc: '책방곱셈 운영, 전시 기획, 오프라인 행사', color: 'bg-secondary', icon: '📍' },
              { title: '데이터로 기록하다', desc: '웹/앱 개발, 디지털 아카이브 시스템 구축', color: 'bg-zinc-900 text-white', icon: '💻' },
            ].map((area, i) => (
              <div key={i} className={`${area.color} border-2 border-black p-10 rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full hover:-rotate-1 transition-transform`}>
                <span className="text-4xl mb-6">{area.icon}</span>
                <h3 className="text-2xl font-black mb-4 leading-tight">{area.title}</h3>
                <p className={`font-bold ${area.color === 'bg-zinc-900 text-white' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-32 px-4 max-w-7xl mx-auto overflow-hidden">
        <h2 className="text-5xl font-black mb-24 tracking-tighter uppercase text-center">History</h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 bg-black -translate-x-1/2" />

          <div className="space-y-16">
            {history.map((item, index) => (
              <div key={index} className="relative flex items-center group">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-primary border-4 border-black rounded-full -translate-x-1/2 z-10 group-hover:scale-125 transition-transform" />

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-24 md:text-right ml-20 md:ml-0' : 'md:pl-24 md:ml-auto ml-20'}`}>
                  <div className={`inline-block p-8 bg-white border-4 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${index % 2 === 0 ? 'hover:rotate-[-1deg]' : 'hover:rotate-[1deg]'}`}>
                    <span className="text-4xl font-black text-secondary mb-2 block">{item.year}</span>
                    <p className="text-xl font-bold text-zinc-800 leading-tight">{item.event}</p>
                  </div>
                </div>

                {/* Year Badge for Desktop (Floating) */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 font-black text-8xl opacity-5 pointer-events-none select-none ${index % 2 === 0 ? 'left-[55%]' : 'right-[55%]'}`}>
                  {item.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-32 px-4 border-t-2 border-black bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black mb-16 text-center tracking-tighter uppercase">주요 파트너</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-24 border-2 border-black bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black hover:bg-primary transition-colors"
              >
                <span className="text-center px-4">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
