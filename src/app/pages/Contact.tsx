import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    recordType: [] as string[],
    budget: '',
    message: '',
  });

  const recordTypes = [
    { id: 'paper', label: '종이 기록 (출판/디자인)' },
    { id: 'video', label: '영상 기록 (모션/아카이브)' },
    { id: 'space', label: '공간 기록 (전시/행사)' },
    { id: 'data', label: '데이터 기록 (웹/앱/시스템)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('기록 의뢰서가 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
    setFormData({ name: '', email: '', recordType: [], budget: '', message: '' });
  };

  const handleTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      recordType: prev.recordType.includes(type)
        ? prev.recordType.filter(t => t !== type)
        : [...prev.recordType, type]
    }));
  };

  return (
    <div className="min-h-screen pt-20 bg-[#fdfaf3]">
      {/* Header */}
      <section className="py-24 px-4 bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-accent border-2 border-black rounded-full mb-8 font-black uppercase text-sm text-black">START YOUR ARCHIVE</div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic leading-[0.8]">Record <br /> Request</h1>
          <p className="text-2xl md:text-3xl font-black text-black leading-tight mt-8">
            "당신의 가치 있는 이야기를 <br />
            <span className="bg-primary/50 text-white px-2 italic">우리가 기록할까요?</span>"
          </p>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-5xl font-black mb-12 tracking-tighter uppercase italic">CONSULTING</h2>
              <p className="text-xl font-bold text-zinc-600 leading-relaxed mb-12">
                글자와기록사이는 단순한 외주사가 아닙니다. <br />
                우리는 파트너의 비전을 깊이 이해하고, 가장 적합한 아카이빙 솔루션을 제안하는 큐레이터 그룹입니다.
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, title: 'Location', value: '서울시 마포구 연남동, 책방곱셈', color: 'bg-primary' },
                  { icon: Phone, title: 'Communication', value: '02-XXXX-XXXX | info@textandrecord.kr', color: 'bg-secondary' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className={`w-12 h-12 ${item.color} border-2 border-black rounded-xl flex items-center justify-center`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase text-zinc-400 mb-1">{item.title}</h3>
                      <p className="text-base font-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="aspect-[4/5] bg-secondary border-4 border-black rounded-[4rem] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-12 text-center rotate-[-2deg]">
              <span className="text-3xl font-black italic">YOUR RECORD <br /> STARTS <br /> HERE.</span>
            </div>
          </div>

          {/* Form Side - Request Form */}
          <div className="lg:col-span-7 bg-white border-4 border-black p-12 rounded-[4rem] shadow-[20px_20px_0px_0px_#faff00]">
            <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase flex items-center gap-4">
              <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xl italic">?</span>
              기록 의뢰서 작성
            </h2>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-black uppercase mb-4 ml-2">의뢰인/단체명</label>
                  <input
                    type="text"
                    required
                    placeholder="Name / Organization"
                    className="w-full border-2 border-black rounded-full px-8 py-4 focus:bg-primary/10 transition-colors bg-zinc-50 font-bold outline-none"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase mb-4 ml-2">연락처 (이메일)</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full border-2 border-black rounded-full px-8 py-4 focus:bg-secondary/10 transition-colors bg-zinc-50 font-bold outline-none"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black uppercase mb-6 ml-2 italic">어떤 형태의 기록을 원하시나요?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recordTypes.map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleTypeToggle(type.id)}
                      className={`px-6 py-4 border-2 border-black text-left font-black transition-all flex items-center justify-between ${formData.recordType.includes(type.id)
                        ? 'bg-black text-white shadow-inner scale-[0.98]'
                        : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50'
                        }`}
                    >
                      {type.label}
                      {formData.recordType.includes(type.id) && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-black uppercase mb-4 ml-2">프로젝트의 목적과 내용을 들려주세요</label>
                <textarea
                  required
                  rows={6}
                  placeholder="당신이 기록하고 싶은 가치와 목적에 대해 자유롭게 적어주세요."
                  className="w-full border-2 border-black rounded-[2.5rem] px-8 py-6 focus:bg-accent/5 transition-colors bg-zinc-50 font-bold outline-none resize-none"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className="w-full py-10 text-3xl font-black uppercase rounded-none border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                REQUEST CONSULTING <ArrowRight className="ml-4 w-8 h-8" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
