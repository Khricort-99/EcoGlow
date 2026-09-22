import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import type {
  MainConcern,
  PriorityArea,
  QuizState,
  Recommendation,
  Sensitivity,
  SkinType,
} from '../types';
import { computeRecommendation, quizOptions } from '../data/cosmeticsData';

interface SkinDiagnosticQuizProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (recommendation: Recommendation) => void;
}

type StepKey = 'skinType' | 'mainConcern' | 'priorityArea' | 'sensitivity';
type OptionValue = SkinType | MainConcern | PriorityArea | Sensitivity;

const stepMeta: { key: StepKey; title: string; subtitle: string }[] = [
  {
    key: 'skinType',
    title: '¿Cuál es tu biotipo cutáneo?',
    subtitle: 'El punto de partida de cualquier protocolo profesional.',
  },
  {
    key: 'mainConcern',
    title: '¿Cuál es tu principal preocupación?',
    subtitle: 'Elegí lo que más quieras mejorar de tu piel.',
  },
  {
    key: 'priorityArea',
    title: '¿Qué zona priorizas cuidar?',
    subtitle: 'Así ajustamos el foco del tratamiento.',
  },
  {
    key: 'sensitivity',
    title: '¿Cómo reacciona tu piel?',
    subtitle: 'Reconocer la sensibilidad evita protocolos agresivos.',
  },
];

const optionsFor = (key: StepKey): { value: OptionValue; label: string; hint: string }[] => {
  if (key === 'skinType') return quizOptions.skinType;
  if (key === 'mainConcern') return quizOptions.mainConcern;
  if (key === 'priorityArea') return quizOptions.priorityArea;
  return quizOptions.sensitivity;
};

const valueFor = (key: StepKey, quiz: QuizState): OptionValue | null => {
  if (key === 'skinType') return quiz.skinType;
  if (key === 'mainConcern') return quiz.mainConcern;
  if (key === 'priorityArea') return quiz.priorityArea;
  return quiz.sensitivity;
};

export default function SkinDiagnosticQuiz({ open, onClose, onSchedule }: SkinDiagnosticQuizProps) {
  const [step, setStep] = useState(0);
  const [quiz, setQuiz] = useState<QuizState>({
    skinType: null,
    mainConcern: null,
    priorityArea: null,
    sensitivity: null,
  });

  const recommendation = useMemo<Recommendation | null>(
    () =>
      quiz.skinType && quiz.mainConcern && quiz.priorityArea && quiz.sensitivity
        ? computeRecommendation(quiz)
        : null,
    [quiz],
  );

  const isFinished = step >= stepMeta.length;
  const current = stepMeta[Math.min(step, stepMeta.length - 1)];

  const setValue = (key: StepKey, value: OptionValue) => {
    setQuiz((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    const value = valueFor(current.key, quiz);
    if (!value) return;
    if (step === stepMeta.length - 1 && recommendation) {
      setStep(stepMeta.length);
    } else {
      setStep((s) => Math.min(s + 1, stepMeta.length));
    }
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const restart = () => {
    setQuiz({ skinType: null, mainConcern: null, priorityArea: null, sensitivity: null });
    setStep(0);
  };

  const close = () => {
    onClose();
    setTimeout(restart, 250);
  };

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
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 bg-white px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Sparkles className="size-4" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-stone-900">Test de Piel</p>
                  <p className="text-xs text-stone-500">
                    {isFinished
                      ? 'Tu prescripción personalizada'
                      : `Paso ${step + 1} de ${stepMeta.length}`}
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

            {/* Progress */}
            <div className="flex gap-1.5 bg-white px-6 pb-4">
              {stepMeta.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    index <= step || isFinished ? 'bg-amber-600' : 'bg-stone-200'
                  }`}
                />
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                {!isFinished ? (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 className="font-display text-2xl font-medium text-stone-900 sm:text-3xl">
                      {current.title}
                    </h2>
                    <p className="mt-1 text-sm text-stone-500">{current.subtitle}</p>

                    <div className="mt-6 grid gap-3">
                      {optionsFor(current.key).map((option) => {
                        const selected = valueFor(current.key, quiz) === option.value;
                        return (
                          <button
                            key={option.value}
                            onClick={() => setValue(current.key, option.value)}
                            className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                              selected
                                ? 'border-amber-600 bg-amber-50'
                                : 'border-stone-200 bg-white hover:border-stone-300'
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${
                                selected
                                  ? 'border-amber-600 bg-amber-600 text-white'
                                  : 'border-stone-300'
                              }`}
                            >
                              {selected && <CheckCircle2 className="size-4" />}
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-stone-900">
                                {option.label}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">
                                {option.hint}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  recommendation && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                        <Lightbulb className="mx-auto size-8 text-emerald-700" />
                        <h2 className="font-display mt-3 text-2xl font-medium text-stone-900">
                          {recommendation.headline}
                        </h2>
                        <p className="mt-1 text-sm text-stone-600">
                          Este resultado es orientativo: la evaluación definitiva se realiza en
                          cabina por nuestra practicante de dermocosmética.
                        </p>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <InfoTile
                          label="Practicante idónea"
                          value={recommendation.practitioner.name}
                          note={recommendation.practitioner.badge}
                        />
                        <InfoTile
                          label="Protocolo de cabina"
                          value={recommendation.protocol.name}
                          note={`${recommendation.protocol.duration} · ${recommendation.protocol.leadPractitionerName}`}
                        />
                        <div className="sm:col-span-2">
                          <InfoTile
                            label="Marcas recomendadas"
                            value={
                              recommendation.brands.map((b) => b.name).join(' · ') ||
                              'Lasserre · Dermik · Dr. Fontboté'
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4">
                        <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                          Productos sugeridos
                        </p>
                        <div className="mt-2 grid gap-2 sm:grid-cols-3">
                          {recommendation.products.map((product) => (
                            <div
                              key={product.id}
                              className="rounded-xl border border-stone-200 bg-stone-50 p-3"
                            >
                              <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
                                {product.brandName}
                              </p>
                              <p className="mt-0.5 text-sm leading-snug font-semibold text-stone-800">
                                {product.name}
                              </p>
                              <p className="mt-1 text-[11px] leading-snug text-stone-500">
                                {product.keyActives.join(' + ')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl bg-stone-800 p-5 text-stone-100">
                        <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                          3 consejos clínicos para tu rutina
                        </p>
                        <ul className="mt-3 space-y-2">
                          {recommendation.clinicalTips.map((tip) => (
                            <li key={tip} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="mt-0.5 size-4 shrink-0 text-amber-400" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="mt-4 text-xs text-stone-500">
                        Diagnóstico resumido: {recommendation.routineSummary.join(' · ')}.
                      </p>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-stone-200 bg-white px-6 py-4">
              {isFinished ? (
                <>
                  <button
                    onClick={restart}
                    className="flex h-12 items-center gap-2 rounded-full border border-stone-300 px-4 text-sm font-semibold text-stone-600 transition-colors hover:border-stone-400"
                  >
                    <RotateCcw className="size-4" />
                    Repetir
                  </button>
                  <button
                    onClick={() => recommendation && onSchedule(recommendation)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-rose-600 px-5 text-sm font-semibold text-stone-50 transition-colors hover:bg-rose-700"
                  >
                    Agendar Protocolo Recomendado
                    <ArrowRight className="size-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={goBack}
                    disabled={step === 0}
                    className="flex h-12 items-center gap-1.5 rounded-full border border-stone-300 px-4 text-sm font-semibold text-stone-600 transition-colors hover:border-stone-400 disabled:opacity-30"
                  >
                    <ArrowLeft className="size-4" />
                    Atrás
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!valueFor(current.key, quiz)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-amber-600 px-5 text-sm font-semibold text-stone-50 transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {step === stepMeta.length - 1 ? 'Ver mi recomendación' : 'Continuar'}
                    <ArrowRight className="size-4" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoTile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4">
      <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">{label}</p>
      <p className="mt-1 text-sm leading-snug font-semibold text-stone-900">{value}</p>
      {note && <p className="mt-0.5 text-xs text-stone-500">{note}</p>}
    </div>
  );
}