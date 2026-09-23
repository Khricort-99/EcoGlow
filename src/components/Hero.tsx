import { ArrowDownRight, CalendarCheck, FlaskConical, Sparkles, Store, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

const metrics = [
  { value: '3', label: 'Practicantes en práctica clínica', icon: Users },
  { value: '3', label: 'Laboratorios profesionales', icon: Store },
  { value: '4', label: 'Protocolos de cabina', icon: FlaskConical },
  { value: '100%', label: 'Asesoría personalizada', icon: Sparkles },
];

export default function Hero() {
  const { openQuiz, openBooking, goToCatalog } = useApp();

  return (
    <section id="inicio" className="linen-grid relative overflow-hidden bg-stone-50 pt-16">
      <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-rose-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-stone-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Centro de Estética &amp; Dermocosmética · La Serena, Chile
        </span>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="font-display max-w-2xl text-4xl leading-[1.08] font-medium tracking-tight text-stone-900 sm:text-6xl">
              El cuidado de tu piel, con <em className="text-rose-700 italic">rigor clínico</em> y
              calidez humana.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
              En EcoGlow unimos cosmetología profesional, dermocosmética y bienestar holístico.
              Practicantes en práctica clínica, tres laboratorios líderes y protocolos de cabina
              pensados para tu biotipo y fototipo.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={openQuiz}
                className="flex h-12 items-center gap-2 rounded-full bg-rose-600 px-6 text-sm font-semibold text-stone-50 transition-colors hover:bg-rose-700"
              >
                <Sparkles className="size-4" />
                Diagnosticar mi piel
              </button>
              <button
                onClick={() => openBooking()}
                className="flex h-12 items-center gap-2 rounded-full border border-stone-300 bg-white px-6 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-400"
              >
                <CalendarCheck className="size-4" />
                Reservar cita
              </button>
            </div>

            <button
              onClick={() => goToCatalog()}
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-rose-700"
            >
              Explorar el catálogo de cosméticos
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <p className="mt-6 flex items-center gap-2 border-t border-stone-200 pt-5 text-xs tracking-wide text-stone-500">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
                Bioseguridad certificada
              </span>
              Supervisión docente en cada procedimiento.
            </p>
          </div>

          {/* Editorial card */}
          <div className="relative">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="font-display text-3xl leading-snug font-medium text-stone-800">“</p>
              <p className="font-display -mt-4 text-2xl leading-snug font-medium text-stone-800">
                La estética no es vanidad: es salud, autocuidado y el derecho a sentirse bien en
                propia piel.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {metrics.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <Icon className="size-4 text-rose-600" />
                    <p className="font-display mt-2 text-2xl font-semibold text-stone-900">{value}</p>
                    <p className="mt-0.5 text-xs leading-snug text-stone-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -right-3 hidden rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700 shadow-sm sm:block">
              Rutinas a la medida
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}