import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-accent py-12 px-8 mt-0">
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
            <a href="mailto:letternrecords@gmail.com" className="hover:text-black transition-colors">letternrecords@gmail.com</a>
            <span className="text-xs text-muted-foreground">Seoul, Republic of Korea</span>
          </div>
        </div>

        {/* Column 3: Social */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-medium text-black">Instagram</h4>
          <div className="flex flex-col space-y-2">
            <a href="https://instagram.com/letternrecords" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">글자와기록사이 | @letternrecords</a>
            <a href="https://instagram.com/bookstorethex" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">책방곱셈 | @bookstorethex</a>
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
