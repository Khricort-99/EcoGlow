import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarCheck, Leaf, Menu, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { navSections } from '../data/cosmeticsData';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const { openQuiz, openBooking, goToSection } = useApp();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/catalogo') setActive('catalogo');
    else if (location.pathname === '/protocolos') setActive('protocolos');
    else if (location.pathname === '/') setActive('inicio');
    else setActive('');
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const sectionIds = ['inicio', 'practicantes', 'laboratorios', 'contacto'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNav = (id: string) => {
    setOpen(false);
    goToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-stone-200 bg-stone-50/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNav('inicio')}
          className="flex items-center gap-2.5 text-left"
          aria-label="Ir al inicio"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-rose-600 text-stone-50">
            <Leaf className="size-4" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-xl tracking-tight text-stone-800">EcoGlow</span>
            <span className="block text-[10px] font-medium tracking-[0.18em] text-stone-500 uppercase">
              Estética &amp; Dermocosmética
            </span>
          </span>
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-white px-1.5 py-1">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNav(section.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active === section.id
                    ? 'bg-stone-800 text-stone-50'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <button
            onClick={openQuiz}
            className="flex h-11 items-center gap-2 rounded-full border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
          >
            <Sparkles className="size-4" />
            Test de Piel
          </button>
          <button
            onClick={() => openBooking()}
            className="flex h-11 items-center gap-2 rounded-full bg-rose-600 px-5 text-sm font-semibold text-stone-50 transition-colors hover:bg-rose-700"
          >
            <CalendarCheck className="size-4" />
            Reservar
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 lg:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-5 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNav(section.id)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium ${
                  active === section.id
                    ? 'border-stone-800 bg-stone-800 text-stone-50'
                    : 'border-stone-200 bg-white text-stone-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setOpen(false);
                openQuiz();
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-amber-300 text-sm font-semibold text-amber-700"
            >
              <Sparkles className="size-4" />
              Test de Piel
            </button>
            <button
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-rose-600 text-sm font-semibold text-stone-50"
            >
              <CalendarCheck className="size-4" />
              Reservar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}