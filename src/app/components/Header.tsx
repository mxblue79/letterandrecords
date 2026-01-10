import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const mainNavigation = [
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'BookstoretheX', path: '/bookstore' },
  { name: 'Contact', path: '/contact' },
];

const filterNavigation = [
  { name: 'ALL', path: '/portfolio' },
  { name: '디자인 & 아트디렉팅', path: '/portfolio?filter=design' },
  { name: '출판 & 아카이빙 컨설팅', path: '/portfolio?filter=publishing' },
  { name: '영상 & 모션그래픽', path: '/portfolio?filter=video' },
  { name: '웹', path: '/portfolio?filter=online' },
  { name: '행사 & 전시 운영', path: '/portfolio?filter=event' },
];

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we are on the portfolio page (or home which is portfolio now)
  const showFilters = location.pathname === '/' || location.pathname === '/portfolio';

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background w-full border-b border-black">
      <nav className="flex flex-col w-full">
        {/* Top Tier: Logo & Main Categories */}
        <div className="flex items-center justify-between gap-4 px-8 py-4 w-full max-w-[1400px] mx-auto overflow-x-hidden whitespace-nowrap">
          <Link
            to="/info"
            className={`text-[15px] tracking-wide transition-colors z-50 relative ${location.pathname === '/info'
              ? 'text-black underline underline-offset-4 decoration-2'
              : 'text-black hover:text-zinc-600 font-medium'
              }`}
          >
            글자와기록사이
          </Link>

          {/* Desktop Navigation Items */}
          {mainNavigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hidden md:block text-[15px] tracking-wide transition-colors ${location.pathname === item.path || (item.path === '/portfolio' && location.pathname === '/')
                ? 'text-black underline underline-offset-4 decoration-2'
                : 'text-black hover:text-zinc-600 font-medium'
                }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden z-50 relative p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-background z-40 flex flex-col pt-24 px-8 animate-in fade-in duration-200">
            <div className="flex flex-col gap-8 text-2xl font-bold">
              <Link to="/info" className="py-2 border-b border-zinc-100">글자와기록사이</Link>
              {mainNavigation.map(item => (
                <Link key={item.path} to={item.path} className="py-2 border-b border-zinc-100">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Tier: Sub-filters (Separated by line) */}
        {/* Bottom Tier: Sub-filters */}
        {showFilters && (
          <div className="w-full border-t border-black">
            <div className="max-w-[1400px] mx-auto">

              {/* Desktop: Spread text links */}
              <div className="hidden md:flex px-8 py-3 items-center justify-between gap-4">
                {filterNavigation.map((item) => {
                  const queryParam = item.path.split('?')[1];
                  const isActive = location.search === (queryParam ? `?${queryParam}` : '') || (item.name === 'ALL' && !location.search);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`text-[13px] font-semibold tracking-wide transition-colors whitespace-nowrap ${isActive
                        ? 'text-black underline underline-offset-4 decoration-2'
                        : 'text-black hover:text-zinc-600'
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile: Wrapped Buttons */}
              <div className="md:hidden px-4 py-3 flex flex-wrap gap-2">
                {filterNavigation.map((item) => {
                  const isActive = location.search === item.path.split('?')[1] || (item.name === 'ALL' && !location.search);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`text-[13px] px-3 py-1.5 border border-black transition-colors whitespace-nowrap ${isActive
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-zinc-100'
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
