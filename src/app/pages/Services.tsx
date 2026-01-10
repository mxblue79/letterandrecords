import { Palette, Video, Globe, BookOpen, CalendarDays, FileText, Store, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

const services = [
  {
    title: '디자인 & 아트디렉팅',
    description: '브랜드 아이덴티티부터 편집 디자인까지, 시각적 가치를 창조합니다.',
    icon: Palette,
    color: 'bg-primary'
  },
  {
    title: '영상 & 모션그래픽',
    description: '영화, 드라마 타이틀 디자인 및 모션그래픽 제작을 전문으로 합니다.',
    icon: Video,
    color: 'bg-secondary'
  },
  {
    title: '온라인 서비스',
    description: '웹사이트, 모바일 앱 제작 및 디지털 아카이브 구축 서비스를 제공합니다.',
    icon: Globe,
    color: 'bg-accent'
  },
  {
    title: '출판 & 아카이빙 컨설팅',
    description: '기록물 관리, 아카이빙 전략 수립, 출판 기획 및 제작을 지원합니다.',
    icon: BookOpen,
    color: 'bg-primary'
  },
  {
    title: '행사 & 전시 운영',
    description: '문화예술 행사, 전시 기획 및 운영 전문 서비스를 제공합니다.',
    icon: CalendarDays,
    color: 'bg-secondary'
  },
  {
    title: '간행물 & 도록 제작',
    description: '전시 도록, 정기 간행물, 기업 사보 등 다양한 인쇄물을 제작합니다.',
    icon: FileText,
    color: 'bg-accent'
  },
  {
    title: '문화공간 운영',
    description: '책방곱셈을 통해 책과 문화가 만나는 공간을 운영합니다.',
    icon: Store,
    color: 'bg-primary'
  },
];

export function Services() {
  return (
    <div className="min-h-screen pt-20 bg-[#fdfaf3]">
      {/* Header */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-primary border-2 border-black rounded-full mb-8 font-black uppercase text-sm">WHAT WE DO</div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase">Services</h1>
          <p className="text-2xl md:text-3xl font-bold text-zinc-800">
            <span className="bg-secondary/30 px-2 italic">7가지</span> 전문 영역에서 통합 솔루션을 제공합니다
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-black p-10 rounded-[3rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
              >
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 border-2 border-black group-hover:rotate-12 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black mb-6 leading-tight">{service.title}</h3>
                <p className="text-lg font-medium text-zinc-600 leading-relaxed mb-8">{service.description}</p>
                <div className="flex items-center text-black font-black uppercase text-sm group-hover:underline decoration-2 underline-offset-4">
                  LEARN MORE <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 border-t-2 border-black bg-primary">
        <div className="max-w-4xl mx-auto text-center border-4 border-black bg-white p-16 rounded-[4rem] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter uppercase">Ready to Start?</h2>
          <p className="text-2xl font-bold text-zinc-800 mb-12">
            여러분의 이야기를 함께 기록하고 싶습니다
          </p>
          <Button size="lg" className="rounded-full px-16 py-8 text-2xl font-black" asChild>
            <a href="/contact">문의하기</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
