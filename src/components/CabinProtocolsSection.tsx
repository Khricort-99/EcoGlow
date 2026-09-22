import { CalendarDays, Clock, ListChecks, UserRound } from 'lucide-react';
import type { ClinicProtocol, ProtocolCategory } from '../types';
import { protocols } from '../data/cosmeticsData';

interface CabinProtocolsSectionProps {
  onBookProtocol: (protocol: ClinicProtocol) => void;
}

const categoryLabel: Record<ProtocolCategory, string> = {
  facial: 'Facial',
  corporal: 'Corporal',
  spa: 'Spa & Bienestar',
  diagnostico: 'Diagnóstico',
};

const categoryColor: Record<ProtocolCategory, string> = {
  facial: 'border-rose-200 bg-rose-50 text-rose-700',
  corporal: 'border-amber-200 bg-amber-50 text-amber-700',
  spa: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  diagnostico: 'border-indigo-200 bg-indigo-50 text-indigo-700',
};

export default function CabinProtocolsSection({ onBookProtocol }: CabinProtocolsSectionProps) {
  return (
    <section id="protocolos" className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="max-w-2xl text-base leading-relaxed text-stone-600">
          Reservá tu protocolo y la practicante a cargo te recibirá con una evaluación inicial y
          bioseguridad certificada en cada paso.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {protocols.map((protocol) => (
            <article
              key={protocol.id}
              className="flex flex-col rounded-3xl border border-stone-200 bg-white p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-wide uppercase ${categoryColor[protocol.category]}`}
                >
                  {categoryLabel[protocol.category]}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-600">
                  <Clock className="size-3.5 text-rose-600" />
                  {protocol.duration}
                </span>
              </div>

              <h3 className="font-display mt-4 text-2xl leading-snug font-semibold text-stone-900">
                {protocol.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-rose-700 italic">{protocol.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{protocol.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-600">
                  <UserRound className="size-3.5 text-emerald-600" />
                  {protocol.leadPractitionerName}
                </span>
                {protocol.associatedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600"
                  >
                    {brand}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Activo clave
              </p>
              <p className="mt-1 text-sm font-semibold text-stone-800">{protocol.keyActiveUsed}</p>

              <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                  <ListChecks className="size-3.5 text-rose-600" />
                  Pasos del procedimiento
                </p>
                <ol className="mt-3 space-y-2">
                  {protocol.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm text-stone-600">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-stone-800 text-[10px] font-bold text-stone-50">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                  Indicado para
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {protocol.indicatedFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs text-stone-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onBookProtocol(protocol)}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-stone-800 text-sm font-semibold text-stone-50 transition-colors hover:bg-stone-700"
              >
                <CalendarDays className="size-4" />
                Reservar este protocolo
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}