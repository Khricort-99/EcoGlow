import { Clock, Leaf, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clinic, navSections } from '../data/cosmeticsData';

export default function Footer() {
  const { goToSection } = useApp();

  return (
    <footer id="contacto" className="bg-stone-900 py-16 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-rose-600 text-stone-50">
                <Leaf className="size-4" />
              </span>
              <span className="font-display text-2xl text-stone-50">EcoGlow</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Centro de Estética &amp; Dermocosmética en Chile. Cuidado de la piel con rigor
              clínico, tecnología de cabina y calidez humana.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
              Enlaces rápidos
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => goToSection(section.id)}
                    className="text-sm text-stone-300 transition-colors hover:text-rose-400"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
              <Clock className="size-4" />
              Horarios de atención
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-stone-300">
              {clinic.schedule.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-2 text-sm text-stone-300">
              <Mail className="size-4 shrink-0 text-rose-400" />
              {clinic.email}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
              Ubicación
            </h3>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-stone-300">
              <MapPin className="mt-0.5 size-4 shrink-0 text-rose-400" />
              {clinic.address}
            </p>
            <div className="mt-5 rounded-2xl border border-emerald-800/60 bg-emerald-900/30 p-4">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-emerald-200">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                {clinic.supervision}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-stone-800 pt-6 text-xs text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} EcoGlow · Centro de Estética &amp; Dermocosmética.</p>
          <p>Protocolos de bioseguridad y atención responsable en todo procedimiento.</p>
        </div>
      </div>
    </footer>
  );
}