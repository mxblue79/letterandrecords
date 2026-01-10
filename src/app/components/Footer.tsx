import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-accent py-20 px-8 mt-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-foreground/80 font-normal">

        {/* Column 1: Identity */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className="text-lg font-medium text-black">
            글자와기록사이
          </Link>
          <p className="leading-relaxed">
            필요에 가치를 더하는<br />
            문화예술 프로젝트 그룹
          </p>
        </div>

        {/* Column 2: Contact */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-medium text-black">Contact</h4>
          <div className="flex flex-col space-y-2">
            <a href="mailto:hello@textandrecord.kr" className="hover:text-black transition-colors">hello@textandrecord.kr</a>
            <span className="text-xs text-muted-foreground">Seoul, Republic of Korea</span>
          </div>
        </div>

        {/* Column 3: Social */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-medium text-black">Social</h4>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">Behance</a>
          </div>
        </div>

        {/* Column 4: Copyright */}
        <div className="flex flex-col justify-end">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Text and Record. <br />All rights reserved.
          </p>
          <a href="http://localhost:3333" target="_blank" rel="noopener noreferrer" className="text-[10px] text-zinc-300 hover:text-zinc-500 mt-2">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
