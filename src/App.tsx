import { Route, Routes } from 'react-router-dom';
import { AppProvider, useApp, useScrollRestoration } from './context/AppContext';
import type { Recommendation } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SkinDiagnosticQuiz from './components/SkinDiagnosticQuiz';
import BookingModal from './components/BookingModal';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProtocolsPage from './pages/ProtocolsPage';

function Shell() {
  useScrollRestoration();

  const {
    quizOpen,
    closeQuiz,
    bookingOpen,
    bookingPrefill,
    closeBooking,
    openBooking,
  } = useApp();

  const handleScheduleFromQuiz = (recommendation: Recommendation) => {
    closeQuiz();
    const productsNotes = recommendation.products
      .map((product) => `  - ${product.brandName}: ${product.name}`)
      .join('\n');
    openBooking({
      practitionerName: recommendation.practitioner.name,
      service: recommendation.protocol.name,
      notes:
        `Reserva desde Test de Piel personalizado.\n` +
        `Diagnóstico: ${recommendation.routineSummary.join(' · ')}.\n` +
        `Productos sugeridos:\n${productsNotes}`,
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/protocolos" element={<ProtocolsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />

      <SkinDiagnosticQuiz open={quizOpen} onClose={closeQuiz} onSchedule={handleScheduleFromQuiz} />
      <BookingModal open={bookingOpen} prefill={bookingPrefill} onClose={closeBooking} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}