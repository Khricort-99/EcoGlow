import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CalendarDays,
  CalendarCheck,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  UserRound,
  X,
} from 'lucide-react';
import type { BookingPrefill } from '../types';
import { allPractitionerNames, allPractitioners, bookingHours, clinic, protocolNames } from '../data/cosmeticsData';

const GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbzbT8pJc2F71cW0DN3m7siyfxMcsgD6e1SAbbHASML0PsR1Ii8UWVeqnj4FUfIpPPvVuA/exec';

interface BookingModalProps {
  open: boolean;
  prefill: BookingPrefill | null;
  onClose: () => void;
}

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  practitioner: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const emptyForm: BookingForm = {
  name: '',
  phone: '',
  email: '',
  practitioner: 'Cualquier profesional',
  service: '',
  date: '',
  time: '',
  notes: '',
};

export default function BookingModal({ open, prefill, onClose }: BookingModalProps) {
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, boolean>>>({});
  const [occupiedHours, setOccupiedHours] = useState<string[]>([]);
  const [failure, setFailure] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setConfirmed(false);
    setErrors({});
    setFailure(null);
    setOccupiedHours([]);

    const notes: string[] = [];
    if (prefill?.productName) notes.push(`Consulta sobre el producto: ${prefill.productName}`);
    if (prefill?.notes) notes.push(prefill.notes);

    const nextService = prefill?.service ?? form.service ?? '';

    setForm({
      ...emptyForm,
      practitioner: prefill?.practitionerName ?? 'Cualquier profesional',
      service: nextService,
      notes: notes.join('\n'),
    });
  }, [open, prefill]);

  // Consulta qué horas están ocupadas para una profesional y fecha determinadas
  const checkAvailability = async (practitionerName: string, date: string) => {
    const hasPractitioner = practitionerName && practitionerName !== 'Cualquier profesional';
    if (!hasPractitioner || !date) {
      setOccupiedHours([]);
      return;
    }
    try {
      const res = await fetch(
        `${GOOGLE_SHEET_WEBHOOK_URL}?practitioner=${encodeURIComponent(practitionerName)}&date=${encodeURIComponent(date)}`
      );
      const result = await res.json();
      if (result.status === 'success') {
        const busy: string[] = Array.isArray(result.busyTimes) ? result.busyTimes : [];
        setOccupiedHours(busy);
        // Si la hora ya elegida quedó ocupada, se limpia para pedir otra
        setForm((prev) => (prev.time && busy.includes(prev.time) ? { ...prev, time: '' } : prev));
      }
    } catch (error) {
      console.error('Error al consultar disponibilidad:', error);
    }
  };

  useEffect(() => {
    checkAvailability(form.practitioner, form.date);
  }, [form.practitioner, form.date]);

  const today = new Date().toISOString().split('T')[0];

  const setField = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
    setFailure(null);
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof BookingForm, boolean>> = {};
    if (!form.name.trim()) next.name = true;
    if (!form.phone.trim()) next.phone = true;
    if (!form.date) next.date = true;
    if (!form.time) next.time = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!validate() || isSubmitting) return;
    setIsSubmitting(true);
    setFailure(null);

    const payload = {
      clientName: form.name,
      clientPhone: form.phone,
      clientEmail: form.email,
      practitioner: form.practitioner,
      service: form.service,
      preferredDate: form.date,
      preferredTime: form.time,
      notes: form.notes,
    };

    let response: Response | null = null;
    try {
      // 'text/plain' evita el preflight de CORS y permite leer la respuesta del Apps Script
      response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      // Si el CORS impide leer la respuesta, reenviamos en modo no-cors para no perder la cita
      console.error('CORS al guardar cita, reintento no-cors:', error);
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
    }

    let result: { status?: string; busyTimes?: string[] } | null = null;
    if (response) {
      try {
        result = await response.json();
      } catch {
        // Respuesta no legible como JSON: se asume que la cita se registró
      }
    }

    if (result?.status === 'conflict') {
      setFailure('Este horario acaba de ser reservado, por favor elige otra hora.');
      setField('time', '');
      checkAvailability(form.practitioner, form.date);
    } else {
      setConfirmed(true);
    }

    setIsSubmitting(false);
  };

  const close = () => {
    onClose();
  };

  const buildWhatsAppUrl = (): string => {
    const lines = [
      'Hola EcoGlow, quiero confirmar mi reserva:',
      '',
      `Nombre: ${form.name}`,
      `Telefono: ${form.phone}`,
      form.email ? `Correo: ${form.email}` : '',
      `Especialista: ${form.practitioner}`,
      `Servicio: ${form.service || 'A definir en cabina'}`,
      `Fecha: ${form.date}`,
      `Hora: ${form.time}`,
      form.notes ? `Observaciones:\n${form.notes}` : '',
    ].filter(Boolean);
    const practitioner = allPractitioners.find((p) => p.name === form.practitioner);
    const whatsappNumber = practitioner?.whatsappNumber ?? clinic.whatsappNumber;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const inputClass = (invalid?: boolean) =>
    `h-12 w-full rounded-xl border bg-white px-3.5 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-400 ${
      invalid ? 'border-rose-400 ring-1 ring-rose-200' : 'border-stone-200 focus:border-rose-400'
    }`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={close} />

          <motion.div
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-50 shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-stone-200 bg-white px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                  <CalendarCheck className="size-4" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-stone-900">
                    {confirmed ? 'Cita solicitada' : 'Reserva tu cita'}
                  </p>
                  <p className="text-xs text-stone-500">
                    {confirmed ? 'Resumen de tu reserva' : 'Confirmamos tu horario por WhatsApp'}
                  </p>
                </div>
              </div>
              <button
                onClick={close}
                className="flex size-11 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100"
                aria-label="Cerrar"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {confirmed ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h2 className="font-display mt-4 text-2xl font-medium text-stone-900">
                    ¡Gracias, {form.name.split(' ')[0]}!
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600">
                    Tu reserva quedó registrada. Envianos la confirmación por WhatsApp para
                    asegurar tu fecha y hora desde hoy mismo.
                  </p>

                  <div className="mt-6 rounded-3xl border border-stone-200 bg-white p-5 text-left">
                    <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                      Resumen de tu cita
                    </p>
                    <dl className="mt-3 space-y-2.5 text-sm">
                      <SummaryRow icon={UserRound} label="Especialista" value={form.practitioner} />
                      <SummaryRow
                        icon={CalendarDays}
                        label="Servicio / Protocolo"
                        value={form.service || 'A definir en cabina'}
                      />
                      <SummaryRow
                        icon={CalendarCheck}
                        label="Fecha y hora"
                        value={`${form.date} · ${form.time}`}
                      />
                      {form.notes && (
                        <div className="flex gap-2.5">
                          <span className="flex size-5 shrink-0 items-center justify-center">
                            <Mail className="size-4 text-stone-400" />
                          </span>
                          <p className="text-sm whitespace-pre-line text-stone-600">{form.notes}</p>
                        </div>
                      )}
                    </dl>
                  </div>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 text-sm font-semibold text-stone-50 transition-colors hover:bg-emerald-700"
                  >
                    <MessageCircle className="size-4" />
                    Enviar confirmación por WhatsApp
                  </a>
                  <button
                    onClick={close}
                    className="mt-3 h-12 w-full rounded-full border border-stone-300 text-sm font-semibold text-stone-600 hover:border-stone-400"
                  >
                    Cerrar
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                  <FieldGroup label="Nombre completo" required invalid={errors.name}>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400" />
                      <input
                        value={form.name}
                        onChange={(e) => setField('name', e.target.value)}
                        placeholder="Tu nombre y apellido"
                        className={`${inputClass(errors.name)} pl-10`}
                      />
                    </div>
                  </FieldGroup>

                  <FieldGroup label="Teléfono / WhatsApp" required invalid={errors.phone}>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400" />
                      <input
                        value={form.phone}
                        onChange={(e) => setField('phone', e.target.value)}
                        placeholder="+56 9 1234 5678"
                        inputMode="tel"
                        className={`${inputClass(errors.phone)} pl-10`}
                      />
                    </div>
                  </FieldGroup>

                  <FieldGroup label="Correo electrónico">
                    <div className="relative">
                      <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                        placeholder="tucorreo@ejemplo.cl"
                        className={`${inputClass()} pl-10`}
                      />
                    </div>
                  </FieldGroup>

                  <FieldGroup label="Especialista deseada">
                    <select
                      value={form.practitioner}
                      onChange={(e) => setField('practitioner', e.target.value)}
                      className={inputClass()}
                    >
                      {['Cualquier profesional', ...allPractitionerNames].map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  <FieldGroup label="Servicio / Protocolo">
                    <select
                      value={form.service}
                      onChange={(e) => setField('service', e.target.value)}
                      className={inputClass()}
                    >
                      <option value="">Seleccionar protocolo…</option>
                      {protocolNames.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup label="Fecha preferente" required invalid={errors.date}>
                      <input
                        type="date"
                        min={today}
                        value={form.date}
                        onChange={(e) => setField('date', e.target.value)}
                        className={inputClass(errors.date)}
                      />
                    </FieldGroup>
                    <FieldGroup
                      label="Hora"
                      required
                      invalid={errors.time}
                      message={failure ?? undefined}
                    >
                      <select
                        value={form.time}
                        onChange={(e) => setField('time', e.target.value)}
                        className={inputClass(errors.time)}
                      >
                        <option value="">Hora…</option>
                        {bookingHours.map((hour) => {
                          const isOccupied = occupiedHours.includes(hour);
                          return (
                            <option key={hour} value={hour} disabled={isOccupied}>
                              {hour}
                              {isOccupied && ' (Ocupado)'}
                            </option>
                          );
                        })}
                      </select>
                    </FieldGroup>
                  </div>

                  <div className="sm:col-span-2">
                    <FieldGroup label="Motivo de consulta / Observaciones">
                      <textarea
                        value={form.notes}
                        onChange={(e) => setField('notes', e.target.value)}
                        placeholder="Contanos qué te gustaría tratar, si tenés alguna afección o si venís derivada del test de piel…"
                        rows={3}
                        className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-rose-400"
                      />
                    </FieldGroup>
                  </div>

                  <p className="text-xs leading-relaxed text-stone-500 sm:col-span-2">
                    Al enviar, recibirás un resumen con tu fecha y hora. Confirmamos disponibilidad
                    por WhatsApp en un horario hábil. Tu cita es personalizada y siempre está
                    supervisada por profesionales de EcoGlow.
                  </p>
                </form>
              )}
            </div>

            {!confirmed && (
              <div className="flex items-center justify-between gap-3 border-t border-stone-200 bg-white px-6 py-4">
                <button
                  onClick={close}
                  className="h-12 rounded-full border border-stone-300 px-5 text-sm font-semibold text-stone-600 hover:border-stone-400"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => submit()}
                  disabled={isSubmitting}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-rose-600 px-5 text-sm font-semibold text-stone-50 transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CalendarCheck className="size-4" />
                  Solicitar reserva
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldGroup({
  label,
  required,
  invalid,
  message,
  children,
}: {
  label: string;
  required?: boolean;
  invalid?: boolean;
  message?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-xs font-semibold tracking-wide text-stone-600 uppercase">
        {label}
        {required && <span className="text-rose-600">*</span>}
      </span>
      {children}
      {(invalid || message) && (
        <span className="mt-1 block text-[11px] text-rose-600">
          {message ?? 'Este campo es obligatorio.'}
        </span>
      )}
    </label>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-5 shrink-0 items-center justify-center">
        <Icon className="size-4 text-stone-400" />
      </span>
      <p className="text-stone-600">
        <span className="font-semibold text-stone-800">{label}: </span>
        {value}
      </p>
    </div>
  );
}