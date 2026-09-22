import { useMemo, useState } from 'react';
import { ArrowRight, Droplets, Search, SlidersHorizontal } from 'lucide-react';
import type { BrandFilter, BrandId, Product, ProductCategory } from '../types';
import { brandById, brands, products } from '../data/cosmeticsData';

interface ProductsCatalogProps {
  activeBrand: BrandFilter;
  onBrandFilterChange: (brand: BrandFilter) => void;
  onBookProduct: (product: Product) => void;
}

const categories: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'facial', label: 'Facial' },
  { value: 'toners', label: 'Tónicos' },
  { value: 'body', label: 'Corporal' },
  { value: 'hair', label: 'Capilar' },
];

export default function ProductsCatalog({
  activeBrand,
  onBrandFilterChange,
  onBookProduct,
}: ProductsCatalogProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      if (activeBrand !== 'all' && product.brandId !== activeBrand) return false;
      if (category !== 'all' && product.category !== category) return false;
      if (!query) return true;
      const haystack = [
        product.name,
        product.brandName,
        product.categoryLabel,
        product.subcategory,
        product.description,
        ...product.keyActives,
        ...product.benefits,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [activeBrand, category, search]);

  const brandChips: { id: BrandFilter; name: string }[] = [
    { id: 'all', name: 'Todas las marcas' },
    ...brands.map((b) => ({ id: b.id as BrandId, name: b.name })),
  ];

  return (
    <section id="catalogo" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="max-w-2xl text-base leading-relaxed text-stone-600">
          Buscá por producto, principio activo o beneficio y filtrá por marca y categoría. Cada
          ficha indica los activos, los biotipos recomendados y sus notas de aplicación clínica.
        </p>

        {/* Controles */}
        <div className="mt-8 flex flex-col gap-4 border-y border-stone-200 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {brandChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => onBrandFilterChange(chip.id)}
                className={`h-11 rounded-full px-4 text-sm font-semibold transition-colors ${
                  activeBrand === chip.id
                    ? 'bg-indigo-700 text-stone-50'
                    : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                }`}
              >
                {chip.name}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por producto, activo o beneficio…"
              className="h-12 w-full rounded-full border border-stone-200 bg-stone-50 pr-4 pl-10 text-sm text-stone-800 outline-none placeholder:text-stone-400 focus:border-indigo-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-stone-400" />
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`h-11 rounded-full px-4 text-sm font-medium transition-colors ${
                  category === cat.value
                    ? 'bg-stone-800 text-stone-50'
                    : 'border border-stone-200 bg-white text-stone-600 hover:border-stone-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <span className="ml-auto hidden text-xs font-medium text-stone-400 sm:block">
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {/* Grid de productos */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onBookProduct={onBookProduct} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center">
            <Droplets className="mx-auto size-8 text-stone-300" />
            <p className="mt-4 font-display text-xl text-stone-700">Sin resultados</p>
            <p className="mt-1 text-sm text-stone-500">
              Probá con otro término o quitá algún filtro. La recomendación de cabina puede
              resolver esta búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onBookProduct,
}: {
  product: Product;
  onBookProduct: (product: Product) => void;
}) {
  const brand = brandById(product.brandId);
  const [imageBroken, setImageBroken] = useState(false);
  const imageSrc = product.image ?? `${import.meta.env.BASE_URL}products/${product.id}.jpg`;

  return (
    <article className="flex flex-col rounded-3xl border border-stone-200 bg-stone-50 p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${brand.badgeColor}`}>
          {product.brandName}
        </span>
        <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wide text-stone-500 uppercase">
          {product.categoryLabel} · {product.subcategory}
        </span>
      </div>

      <div className="mt-4 flex min-h-52 items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {!imageBroken ? (
          <img
            src={imageSrc}
            alt={product.name}
            onError={() => setImageBroken(true)}
            className="max-h-52 w-full object-contain p-4"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 p-6 text-center">
            <Droplets className="size-8 text-stone-300" />
            <p className="text-xs font-medium text-stone-400">Imagen próximamente</p>
          </div>
        )}
      </div>

      <h3 className="font-display mt-4 text-xl leading-snug font-semibold text-stone-900">
        {product.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{product.description}</p>

      {/* Ficha técnica de activos */}
      <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4">
        <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
          Ficha técnica · Activos
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.keyActives.map((active) => (
            <span
              key={active}
              className="rounded-lg bg-stone-100 px-2 py-1 text-xs font-semibold text-stone-700"
            >
              {active}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
          Biotipos recomendados
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-600">{product.skinTypes.join(' · ')}</p>
      </div>

      <ul className="mt-4 space-y-1.5">
        {product.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-stone-700">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-500" />
            {benefit}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs leading-relaxed text-stone-500">
        <span className="font-semibold text-stone-600">Presentación: </span>
        {product.textureOrPresentation}
      </p>

      {product.clinicalNote && (
        <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs leading-relaxed text-emerald-800">
          <span className="font-semibold">Nota clínica: </span>
          {product.clinicalNote}
        </p>
      )}

      <button
        onClick={() => onBookProduct(product)}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-rose-600 text-sm font-semibold text-stone-50 transition-colors hover:bg-rose-700"
      >
        Consultar en Gabinete
        <ArrowRight className="size-4" />
      </button>
    </article>
  );
}