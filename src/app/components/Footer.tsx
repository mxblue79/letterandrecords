import { Link } from 'react-router-dom';
import { EmailCopy } from './EmailCopy';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-accent py-8 px-8 mt-0">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-foreground/80 font-normal">

        {/* Column 1: Identity */}
        <div className="flex flex-col space-y-3">
          <Link to="/" className="text-lg font-medium text-black">
            글자와기록사이
          </Link>
          <p className="leading-relaxed">
            필요에 가치를 더하는<br />
            문화예술 프로젝트 그룹
          </p>
        </div>

        {/* Column 2: Contact */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-medium text-black">Contact</h4>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <span className="text-black mb-1">글자와기록사이</span>
              <div className="flex items-center text-sm font-normal">
                <span className="mr-2 text-zinc-300">|</span>
                <EmailCopy email="letternrecords@gmail.com" className="text-sm font-normal" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-black mb-1">책방곱셈</span>
              <div className="flex items-center text-sm font-normal">
                <span className="mr-2 text-zinc-300">|</span>
                <EmailCopy email="bookstorethex@gmail.com" className="text-sm font-normal" />
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Social */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-medium text-black">Instagram</h4>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <span className="text-black mb-1">글자와기록사이</span>
              <div className="flex items-center text-sm font-normal">
                <span className="mr-2 text-zinc-300">|</span>
                <a href="https://instagram.com/letternrecords" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                  @letternrecords
                </a>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-black mb-1">책방곱셈</span>
              <div className="flex items-center text-sm font-normal">
                <span className="mr-2 text-zinc-300">|</span>
                <a href="https://instagram.com/bookstorethex" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                  @bookstorethex
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Copyright */}
        <div className="flex flex-col justify-end pb-1">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Text and Record. <br />All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
