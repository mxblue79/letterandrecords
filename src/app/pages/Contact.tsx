import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    recordType: [] as string[],
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recordTypes = [
    { id: 'design', label: '디자인' },
    { id: 'publishing', label: '출판' },
    { id: 'archive', label: '아카이브' },
    { id: 'video', label: '영상' },
    { id: 'event', label: '행사' },
    { id: 'web', label: '웹' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Hardcoded keys for immediate testing
    const serviceId = 'service_03oxntq';
    const templateId = 'template_m8lrvwv';
    const publicKey = 'F79lL7AquLUcBMhGe';

    if (!serviceId || !templateId || !publicKey) {
      alert('이메일 설정이 완료되지 않았습니다. 관리자에게 문의해주세요.\n(.env 파일 설정을 확인해주세요)');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          record_types: formData.recordType.join(', '),
        },
        publicKey
      );

      alert('상담 신청이 성공적으로 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다.');
      setFormData({ name: '', email: '', recordType: [], budget: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen pt-12 pb-12">
      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-8">

        {/* Left Column: Contact Info */}
        <section className="col-span-1 md:col-span-4 h-full">
          <div className="sticky top-32">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-8 border-b border-black pb-2 inline-block">Contact</h2>

            <div className="space-y-12">
              <div>
                <p className="text-3xl font-semibold leading-tight mb-4">같이 성장할 파트너를<br />기다립니다.</p>
                <p className="text-zinc-500 text-lg">
                  디자인을 기반으로<br />
                  고객 입장에서 고민하고,<br />
                  성장 할 수 있는 솔루션을 제안합니다.
                </p>
              </div>

              <div className="space-y-6 text-base font-medium text-zinc-800">
                <div>
                  <span className="block text-xs text-zinc-400 uppercase mb-1">Address</span>
                  <p>서울시 마포구 성미산로 29길 23 (연남동)</p>
                </div>
                <div>
                  <span className="block text-xs text-zinc-400 uppercase mb-1">Email</span>
                  <a href="mailto:letternrecords@gmail.com" className="hover:text-zinc-500 transition-colors">letternrecords@gmail.com</a>
                </div>
                <div>
                  <span className="block text-xs text-zinc-400 uppercase mb-1">Instagram</span>
                  <div className="flex flex-col gap-1">
                    <a href="https://instagram.com/letternrecords" target="_blank" rel="noreferrer" className="hover:text-zinc-500 transition-colors">글자와기록사이 | Instagram @letternrecords</a>
                    <a href="https://instagram.com/bookstorethex" target="_blank" rel="noreferrer" className="hover:text-zinc-500 transition-colors">책방곱셈 | Instagram @bookstorethex</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Request Form */}
        <section className="col-span-1 md:col-span-7 md:col-start-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-12 border-b border-black pb-2 inline-block">Request Project</h2>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group">
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2 group-focus-within:text-black transition-colors">Name / Organization</label>
                <input
                  type="text"
                  required
                  name="user_name"
                  className="w-full border-b border-zinc-200 py-3 text-lg font-medium outline-none focus:border-black transition-colors bg-transparent placeholder:text-zinc-300"
                  placeholder="의뢰인 또는 단체명"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-2 group-focus-within:text-black transition-colors">Contact (Email)</label>
                <input
                  type="email"
                  required
                  name="user_email"
                  className="w-full border-b border-zinc-200 py-3 text-lg font-medium outline-none focus:border-black transition-colors bg-transparent placeholder:text-zinc-300"
                  placeholder="이메일 주소"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Record Types */}
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-6">Type of Record</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recordTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleTypeToggle(type.id)}
                    className={`text-left px-4 py-3 border transition-all duration-200 text-sm font-medium
                                    ${formData.recordType.includes(type.id)
                        ? 'border-black bg-black text-white'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                      }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="group">
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-2 group-focus-within:text-black transition-colors">Project Details</label>
              <textarea
                required
                name="message"
                rows={6}
                className="w-full border-b border-zinc-200 py-3 text-lg font-medium outline-none focus:border-black transition-colors bg-transparent placeholder:text-zinc-300 resize-none leading-relaxed"
                placeholder="프로젝트의 목적, 일정, 예산 등 구체적인 내용을 목적과 내용을 들려주세요."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center gap-3 text-xl font-bold border-b-2 border-transparent hover:border-black pb-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>SENDING... <Loader2 className="w-5 h-5 animate-spin" /></>
                ) : (
                  <>SEND REQUEST <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></>
                )}
              </button>
            </div>
          </form>
        </section>

      </div>
    </div>
  );
}
