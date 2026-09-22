import { motion } from 'motion/react';
import { FlaskConical, ShieldCheck } from 'lucide-react';
import CabinProtocolsSection from '../components/CabinProtocolsSection';
import { useApp } from '../context/AppContext';
import { clinic, protocols } from '../data/cosmeticsData';

export default function ProtocolsPage() {
  const { openBooking } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Cabecera de página */}
      <section className="linen-grid relative overflow-hidden border-b border-stone-200 bg-stone-50 pt-24 pb-12">
        <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-stone-600">
            <FlaskConical className="size-3.5 text-emerald-700" />
            Protocolos de cabina · {protocols.length} procedimientos clínicos
          </span>
          <h1 className="font-display mt-5 max-w-2xl text-4xl leading-tight font-medium tracking-tight text-stone-900 sm:text-5xl">
            Procedimientos clínicos, paso a paso, con{' '}
            <em className="text-emerald-700 italic">activos de verdad</em>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            Cada protocolo detalla su duración, la practicante a cargo, los pasos técnicos, los
            principios activos implicados y las marcas utilizadas en cabina.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500">
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1.5">
              Duración desde 40 hasta 75 minutos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
              <ShieldCheck className="size-3.5" />
              {clinic.supervision}
            </span>
          </div>
        </div>
      </section>

      <CabinProtocolsSection
        onBookProtocol={(protocol) =>
          openBooking({
            practitionerName: protocol.leadPractitionerName,
            service: protocol.name,
            notes: `Protocolo de ${protocol.duration}: ${protocol.name}.`,
          })
        }
      />
    </motion.div>
  );
}