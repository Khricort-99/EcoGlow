import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { BookingPrefill, BrandFilter } from '../types';

interface AppContextValue {
  quizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  bookingOpen: boolean;
  bookingPrefill: BookingPrefill | null;
  openBooking: (prefill?: BookingPrefill | null) => void;
  closeBooking: () => void;
  goToSection: (id: string) => void;
  goToCatalog: (brand?: BrandFilter) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openBooking = (prefill: BookingPrefill | null = null) => {
    setBookingPrefill(prefill);
    setBookingOpen(true);
  };

  useEffect(() => {
    setQuizOpen(false);
    setBookingOpen(false);
  }, [location.pathname]);

  const goToCatalog = (brand: BrandFilter = 'all') => {
    navigate(brand === 'all' ? '/catalogo' : `/catalogo?marca=${brand}`);
  };

  const goToSection = (id: string) => {
    if (id === 'catalogo') {
      goToCatalog();
      return;
    }
    if (id === 'protocolos') {
      navigate('/protocolos');
      return;
    }
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const value: AppContextValue = {
    quizOpen,
    openQuiz: () => setQuizOpen(true),
    closeQuiz: () => setQuizOpen(false),
    bookingOpen,
    bookingPrefill,
    openBooking,
    closeBooking: () => setBookingOpen(false),
    goToSection,
    goToCatalog,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
  return ctx;
}

export function useScrollRestoration() {
  const location = useLocation();
  useEffect(() => {
    const target = location.state as { scrollTo?: string } | null;
    const wantsScrollTo = location.pathname === '/' && Boolean(target?.scrollTo);
    if (!wantsScrollTo) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.state]);
}