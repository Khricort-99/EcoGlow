import {
  ArrowRight,
  Atom,
  Droplets,
  FlaskConical,
  Flower2,
  Gem,
  Leaf,
  Sparkles,
  Sun,
  Waves,
} from 'lucide-react';
import type { BrandFilter, BrandInfo } from '../types';
import { brands } from '../data/cosmeticsData';
import { useApp } from '../context/AppContext';

const iconMap: Record<string, typeof Sun> = {
  sun: Sun,
  droplets: Droplets,
  flower: Flower2,
  sparkles: Sparkles,
  atom: Atom,
  waves: Waves,
  gem: Gem,
  flask: FlaskConical,
  leaf: Leaf,
};

export default function BrandsSection() {
  const { goToCatalog } = useApp();

  return (
    <section id="laboratorios" className="bg-stone-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] text-amber-700 uppercase">
              Laboratorios aliados
            </span>
            <h2 className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl">
              Tres laboratorios, una misma exigencia.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Cosmética efectiva y accesible, dermocosmética electro-óptima y fitocosmética de alta
              gama: la selección clínica de EcoGlow.
            </p>
          </div>
          <button
            onClick={() => goToCatalog()}
            className="flex h-11 shrink-0 items-center gap-2 self-start rounded-full border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 transition-colors hover:border-stone-400 md:self-auto"
          >
            Ir a todo el catálogo
            <ArrowRight className="size-4" />
          </button>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} onViewProducts={goToCatalog} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BrandCardProps {
  brand: BrandInfo;
  onViewProducts: (brandId: BrandFilter) => void;
}

function BrandCard({ brand, onViewProducts }: BrandCardProps) {
  return (
    <article className="flex flex-col rounded-3xl border border-stone-200 bg-white p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-stone-500 uppercase">
            {brand.officialName}
          </p>
          <h3 className="font-display mt-1 text-2xl font-semibold text-stone-900">{brand.name}</h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-bold tracking-wide uppercase ${brand.badgeColor}`}
        >
          Laboratorio
        </span>
      </div>

      <p className="mt-1 text-sm font-medium text-rose-700">{brand.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">{brand.overview}</p>
      <p className="mt-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-600 italic">
        <span className="font-semibold text-stone-800 not-italic">Filosofía: </span>
        {brand.philosophy}
      </p>

      <div className="mt-5">
        <p className="text-xs font-semibold tracking-wide text-stone-500 uppercase">Líneas destacadas</p>
        <ul className="mt-3 space-y-3">
          {brand.lines.map((line) => {
            const Icon = iconMap[line.icon] ?? Sparkles;
            return (
              <li key={line.title} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white text-rose-600">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{line.title}</p>
                  <p className="text-xs leading-relaxed text-stone-500">{line.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {brand.heroPills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-600"
          >
            {pill}
          </span>
        ))}
      </div>

      <button
        onClick={() => onViewProducts(brand.id)}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-stone-300 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-800 hover:bg-stone-800 hover:text-stone-50"
      >
        Ver productos de este laboratorio
        <ArrowRight className="size-4" />
      </button>
    </article>
  );
}