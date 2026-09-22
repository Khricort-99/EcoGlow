import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, FlaskConical, PackageSearch } from 'lucide-react';
import Hero from '../components/Hero';
import PractitionersSection from '../components/PractitionersSection';
import BrandsSection from '../components/BrandsSection';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const location = useLocation();
  const { openBooking, goToCatalog, goToSection, openQuiz } = useApp();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.state]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Hero />
      <PractitionersSection
        onBook={(practitioner) =>
          openBooking({
            practitionerId: practitioner.id,
            practitionerName: practitioner.name,
            notes: `Cita solicitada con la practicante ${practitioner.name} (${practitioner.badge}).`,
          })
        }
      />
      <BrandsSection />

      {/* Bandas de acceso directo a catálogo y protocolos */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <button
              onClick={() => goToCatalog()}
              className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 text-left transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                <PackageSearch className="size-6" />
              </span>
              <h3 className="font-display mt-5 text-2xl font-semibold text-stone-900">
                Catálogo profesional de cosmética
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600">
                Buscá por activo, beneficio o marca entre los productos de Lasserre, Dermik y Dr.
                Fontboté, con ficha técnica y notas clínicas.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700">
                Ir al catálogo
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            <button
              onClick={() => goToSection('protocolos')}
              className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-8 text-left transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <FlaskConical className="size-6" />
              </span>
              <h3 className="font-display mt-5 text-2xl font-semibold text-stone-900">
                Protocolos clínicos de cabina
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600">
                Higiene facial profunda, drenaje linfático, diagnóstico con Lámpara de Wood y
                tensor lifting: pasos, duración y activos de cada procedimiento.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                Ver protocolos
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          <button
            onClick={openQuiz}
            className="mx-auto mt-8 flex h-12 items-center gap-2 rounded-full bg-rose-600 px-6 text-sm font-semibold text-stone-50 transition-colors hover:bg-rose-700"
          >
            No sé por dónde empezar: hacer el Test de Piel
          </button>
        </div>
      </section>
    </motion.div>
  );
}