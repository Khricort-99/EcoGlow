import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { BadgeCheck, PackageSearch } from 'lucide-react';
import ProductsCatalog from '../components/ProductsCatalog';
import { useApp } from '../context/AppContext';
import type { BookingPrefill, BrandFilter, Product } from '../types';
import { brands, products } from '../data/cosmeticsData';

const validBrands: BrandFilter[] = ['all', 'lasserre', 'dermik', 'fontbote'];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openBooking } = useApp();

  const marca = searchParams.get('marca');
  const activeBrand: BrandFilter =
    marca && (validBrands as string[]).includes(marca) ? (marca as BrandFilter) : 'all';

  const handleBrandChange = (brand: BrandFilter) => {
    setSearchParams(brand === 'all' ? {} : { marca: brand }, { replace: true });
  };

  const handleBookProduct = (product: Product) => {
    const prefill: BookingPrefill = {
      productName: product.name,
      notes: `Interés en ${product.brandName} · ${product.keyActives.join(' + ')}.`,
    };
    openBooking(prefill);
  };

  const activeBrandName =
    activeBrand === 'all'
      ? 'todas las marcas'
      : brands.find((b) => b.id === activeBrand)?.name ?? '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Cabecera de página */}
      <section className="linen-grid relative overflow-hidden border-b border-stone-200 bg-stone-50 pt-24 pb-12">
        <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-stone-600">
            <PackageSearch className="size-3.5 text-indigo-700" />
            Catálogo profesional · {brands.length} laboratorios aliados
          </span>
          <h1 className="font-display mt-5 max-w-2xl text-4xl leading-tight font-medium tracking-tight text-stone-900 sm:text-5xl">
            Cosmética con ficha técnica, activos reales y{' '}
            <em className="text-indigo-700 italic">asesoría de gabinete</em>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Encontrá el producto ideal por principio activo, beneficio o laboratorio. Consultá las
            notas clínicas de cada ficha y pedí una evaluación en nuestra cabina con el botón{' '}
            <span className="font-semibold text-rose-700">Consultar en Gabinete</span>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500">
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
              {products.length} productos en catálogo
            </span>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
              Mostrando: {activeBrandName}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
              <BadgeCheck className="size-3.5" />
              Fichas clínicas verificadas
            </span>
          </div>
        </div>
      </section>

      <ProductsCatalog
        activeBrand={activeBrand}
        onBrandFilterChange={handleBrandChange}
        onBookProduct={handleBookProduct}
      />
    </motion.div>
  );
}