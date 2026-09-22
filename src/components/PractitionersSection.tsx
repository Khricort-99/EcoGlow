import { ArrowRight, BadgeCheck, Quote, Wrench } from 'lucide-react';
import type { Practitioner } from '../types';
import { practitioners } from '../data/cosmeticsData';

interface PractitionersSectionProps {
  onBook: (practitioner: Practitioner) => void;
}

const gradientFallback = 'from-stone-200 to-stone-300';

export default function PractitionersSection({ onBook }: PractitionersSectionProps) {
  const firstName = (name: string) => name.split(' ')[0];

  return (
    <section id="practicantes" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.2em] text-rose-600 uppercase">
            Nuestro equipo
          </span>
          <h2 className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl">
            Practicantes en práctica clínica, supervisadas con rigor.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-stone-600">
            Tres enfoques que se complementan: cosmetología facial y corporal, bienestar holístico y
            dermocosmética diagnóstica.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {practitioners.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-3xl border border-stone-200 bg-stone-50 p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.avatarGradient || gradientFallback} font-display text-lg font-semibold text-stone-800`}
                >
                  {p.initials}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-stone-900">{p.name}</h3>
                  <span
                    className={`mt-1 inline-block rounded-full border bg-white px-2.5 py-0.5 text-[11px] font-semibold text-stone-600 ${gradientFallback.replace('bg-', 'border-')}`}
                  >
                    {p.badge}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-snug font-medium tracking-wide text-stone-500 uppercase">
                {p.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{p.currentSituation}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">
                <span className="font-semibold text-stone-900">Enfoque clínico: </span>
                {p.clinicalFocus}
              </p>

              <div className="mt-4">
                <p className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
                  Especialidades
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs text-stone-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                  <Wrench className="size-3.5 text-rose-600" />
                  Técnicas y aparatología
                </p>
                <ul className="mt-2 space-y-1">
                  {p.equipmentAndTechniques.map((equipment) => (
                    <li
                      key={equipment}
                      className="flex items-start gap-2 text-sm text-stone-600"
                    >
                      <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                      {equipment}
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="mt-5 flex flex-1 items-start gap-2 border-t border-stone-200 pt-4">
                <Quote className="size-4 shrink-0 text-rose-600" />
                <p className="font-display text-sm leading-relaxed text-stone-700 italic">
                  {p.quote}
                </p>
              </blockquote>

              <button
                onClick={() => onBook(p)}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-stone-800 text-sm font-semibold text-stone-50 transition-colors hover:bg-stone-700"
              >
                Agendar con {firstName(p.name)}
                <ArrowRight className="size-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}