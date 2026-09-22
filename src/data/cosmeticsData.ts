import type {
  BrandId,
  BrandInfo,
  ClinicProtocol,
  MainConcern,
  Practitioner,
  PriorityArea,
  Product,
  ProductCategory,
  QuizState,
  Recommendation,
  Sensitivity,
  SkinType,
} from '../types';

/* ------------------------------------------------------------------ */
/* Utilidades de datos                                                 */
/* ------------------------------------------------------------------ */

const categoryLabels: Record<ProductCategory, string> = {
  facial: 'Facial',
  toners: 'Tónicos',
  body: 'Corporal',
  hair: 'Capilar',
};

const withLabels = (items: Omit<Product, 'categoryLabel'>[]): Product[] =>
  items.map((item) => ({ ...item, categoryLabel: categoryLabels[item.category] }));

/* ------------------------------------------------------------------ */
/* Contacto y horarios de la clínica                                   */
/* ------------------------------------------------------------------ */

export const clinic = {
  name: 'EcoGlow',
  fullName: 'EcoGlow · Centro de Estética & Dermocosmética',
  whatsappNumber: '56912345678',
  address: 'Av. Providencia 1234, Oficina 502, Santiago, Chile',
  schedule: ['Lunes a Viernes: 09:00 – 19:00 h', 'Sábados: 10:00 – 15:00 h'],
  email: 'contacto@ecoglow.cl',
  supervision:
    'Todos los protocolos son realizados por practicantes en formación bajo permanente supervisión profesional y estrictos controles de bioseguridad.',
};

/* ------------------------------------------------------------------ */
/* A. Practicantes                                                     */
/* ------------------------------------------------------------------ */

export const practitioners: Practitioner[] = [
  {
    id: 'nayareth',
    name: 'Nayareth González',
    role: 'Practicante en Cosmetología Facial y Corporal',
    currentSituation:
      'Estudiante de último año de Técnico en Cosmetología, realizando su práctica profesional en centro de estética integral.',
    clinicalFocus:
      'Protocolos de higiene facial profunda, desincrustación, aplicación de máscaras según fototipo y tratamientos corporales reductores y reafirmantes.',
    professionalInterest: 'Cosmetología Facial y Corporal',
    specialties: [
      'Higiene facial profunda',
      'Desincrustación ultrasónica',
      'Máscaras según fototipo',
      'Corporal reductor y reafirmante',
    ],
    equipmentAndTechniques: [
      'Espátula ultrasónica',
      'Vapor de ozono',
      'Aparatología corporal con geles electroconductores',
      'Velos de colágeno',
      'Máscaras hidroplásticas',
    ],
    initials: 'NG',
    avatarGradient: 'from-amber-200 via-rose-100 to-rose-300',
    badge: 'Cosmetología Facial y Corporal',
    quote:
      'Cada piel tiene su propio lenguaje. Mi labor es escucharla y transformarla con técnica y cuidado.',
    image: `${import.meta.env.BASE_URL}practitioners/nayareth.jpg.jpeg`,
  },
  {
    id: 'paz',
    name: 'Paz Valencia',
    role: 'Practicante de Estética y Bienestar',
    currentSituation:
      'Alumna en etapa de práctica laboral cursando módulos de estética y técnicas de spa.',
    clinicalFocus:
      'Drenaje Linfático Manual (DLM) facial método Vodder, masoterapia estética descongestiva, relajación e hidratación profunda.',
    professionalInterest: 'Estética & Bienestar Holístico',
    specialties: [
      'Drenaje Linfático Manual (método Vodder)',
      'Masoterapia estética descongestiva',
      'Relajación y aromaterapia botánica',
      'Hidratación profunda',
    ],
    equipmentAndTechniques: [
      'Masaje miofascial',
      'Crioterapia facial con esferas descongestivas',
      'Aromaterapia botánica',
      'Digitopresión',
    ],
    initials: 'PV',
    avatarGradient: 'from-emerald-200 via-emerald-50 to-teal-300',
    badge: 'Estética & Bienestar Holístico',
    quote:
      'La relajación es medicina silenciosa: cuando el cuerpo se aquieta, la piel lo agradece.',
    image: `${import.meta.env.BASE_URL}practitioners/paz.jpg.jpeg`,
  },
  {
    id: 'catalina',
    name: 'Catalina Cortés',
    role: 'Practicante en Dermocosmética',
    currentSituation:
      'Practicante de Cosmetología enfocada en atención consultiva, evaluación de alteraciones cutáneas leves y prescripción de gabinete.',
    clinicalFocus:
      'Análisis de piel con Lámpara de Wood, biotipos, fototipos, asesoría de rutinas domiciliarias y control de bioseguridad.',
    professionalInterest: 'Dermocosmética & Diagnóstico',
    specialties: [
      'Análisis de piel con Lámpara de Wood',
      'Evaluación de biotipos y fototipos',
      'Prescripción de rutinas domiciliarias',
      'Control de bioseguridad',
    ],
    equipmentAndTechniques: [
      'Lámpara de Wood (luz ultravioleta diagnóstica)',
      'Sebometría de barrera hidrolipídica',
      'Formulaciones dermocosméticas',
    ],
    initials: 'CC',
    avatarGradient: 'from-rose-200 via-fuchsia-50 to-purple-200',
    badge: 'Dermocosmética & Diagnóstico',
    quote: 'Un buen diagnóstico ya es la mitad del tratamiento.',
    image: `${import.meta.env.BASE_URL}practitioners/catalina.jpg.jpeg`,
  },
];

export const allPractitionerNames = practitioners.map((p) => p.name);

/* ------------------------------------------------------------------ */
/* B. Laboratorios y marcas aliadas                                    */
/* ------------------------------------------------------------------ */

export const brands: BrandInfo[] = [
  {
    id: 'lasserre',
    name: 'Lasserre',
    officialName: 'Cosméticos Lasserre',
    tagline: 'Soluciones cosméticas efectivas y accesibles.',
    overview:
      'Laboratorio chileno que desarrolla soluciones cosméticas efectivas y accesibles para rostro, cuerpo y cabello, formuladas con principios activos puros y probados dermatológicamente.',
    philosophy:
      'La eficacia no tiene por qué ser inaccesible: cosmética seria, honesta y de fácil integración en la rutina diaria.',
    lines: [
      {
        title: 'Sérums de Vitamina C',
        description: 'Concentraciones de vitamina C para luminosidad y defensa antioxidante.',
        icon: 'sun',
      },
      {
        title: 'Exfoliantes de Ácido Glicólico',
        description: 'Renovación química suave para una textura más fina y uniforme.',
        icon: 'droplets',
      },
      {
        title: 'Aguas cosméticas',
        description: 'Aguas de avena, caléndula y hamamelis para calmar y equilibrar.',
        icon: 'flower',
      },
      {
        title: 'Cremas con Células Madre',
        description: 'Reparación, nutrición y confort para pieles fatigadas.',
        icon: 'sparkles',
      },
    ],
    heroPills: ['Vitamina C concentrada', 'Ácido Glicólico', 'Células Madre', 'Aguas botánicas'],
    badgeColor: 'border-amber-200 bg-amber-100 text-amber-700',
  },
  {
    id: 'dermik',
    name: 'Dermik',
    officialName: 'Dermik / Levinia',
    tagline: 'Dermocosmética líder en spas y gabinetes de Chile.',
    overview:
      'Marca dermocosmética líder en spas y gabinetes del país, con formulaciones electro-óptimas diseñadas para potenciar el trabajo con aparatología profesional.',
    philosophy:
      'Cada fórmula está pensada para trabajar en sinergia con tecnología de cabina: máxima respuesta, mínima irritación.',
    lines: [
      {
        title: 'Peelings enzimáticos',
        description: 'Higienización profunda y respetuosa de la barrera cutánea.',
        icon: 'atom',
      },
      {
        title: 'CellMater',
        description: 'Células madre vegetales que regeneran y confortan en profundidad.',
        icon: 'flower',
      },
      {
        title: 'Hialuronic puro',
        description: 'Ácido hialurónico reticulado de hidratación inmediata y duradera.',
        icon: 'droplets',
      },
      {
        title: 'Botulift',
        description: 'Efecto tensor visible, ideal para el contorno facial.',
        icon: 'sparkles',
      },
      {
        title: 'Adiposuction corporal',
        description: 'Tratamiento reductor que se activa junto a la aparatología.',
        icon: 'waves',
      },
    ],
    heroPills: ['Peelings enzimáticos', 'CellMater', 'Hialuronic puro', 'Botulift', 'Adiposuction'],
    badgeColor: 'border-indigo-200 bg-indigo-100 text-indigo-700',
  },
  {
    id: 'fontbote',
    name: 'Dr. Fontboté',
    officialName: 'Laboratorio Dr. Fontboté',
    tagline: 'Alta gama de cosmética profesional chilena.',
    overview:
      'Laboratorio de alta gama que fusiona fitocosmética avanzada y biotecnología farmacéutica en fórmulas de excelencia para la piel.',
    philosophy:
      'La botánica del futuro: ingredientes vegetales potentes con la precisión de la farmacotecnia.',
    lines: [
      {
        title: 'Hidratación Activa H.2',
        description: 'Hidratación profunda con sistema biomimético de doble acción.',
        icon: 'droplets',
      },
      {
        title: 'Caviar & Sirhamnose',
        description: 'Línea de firmeza y regeneración de alta gama.',
        icon: 'gem',
      },
      {
        title: 'Refinesse',
        description: 'Exfoliación química con AHAs para renovar sin agredir.',
        icon: 'atom',
      },
      {
        title: 'Concentrados Niacinamida y Retinol',
        description: 'Activos puros a dosis efectivas de uso profesional.',
        icon: 'flask',
      },
      {
        title: 'Adipocell corporal',
        description: 'Línea corporal remodelante de acción progresiva.',
        icon: 'waves',
      },
    ],
    heroPills: ['H.2', 'Caviar & Sirhamnose', 'AHA / Refinesse', 'Niacinamida 5%', 'Retinol', 'Adipocell'],
    badgeColor: 'border-rose-200 bg-rose-100 text-rose-700',
  },
];

export const brandById = (id: BrandId): BrandInfo => {
  const brand = brands.find((b) => b.id === id);
  if (!brand) throw new Error(`Marca desconocida: ${id}`);
  return brand;
};

/* ------------------------------------------------------------------ */
/* C. Catálogo de cosméticos                                           */
/* ------------------------------------------------------------------ */

export const products: Product[] = withLabels([
  /* ---------------- Cosméticos Lasserre ---------------- */
  {
    id: 'lsr-vitamina-c',
    brandId: 'lasserre',
    brandName: 'Lasserre',
    category: 'facial',
    subcategory: 'Sérum iluminador',
    name: 'Sérum Anti-Oxidante Vitamina C 10%',
    description:
      'Sérum facial con vitamina C concentrada al 10% en vehículo estabilizado, que unifica el tono, atenúa las primeras líneas y devuelve luminosidad natural.',
    keyActives: ['Vitamina C 10%', 'Vitamina E', 'Ácido ferúlico'],
    skinTypes: ['Mixta', 'Normal', 'Opaca'],
    benefits: [
      'Luminosidad inmediata',
      'Defensa antioxidante',
      'Atenúa manchas y huellas del paso del tiempo',
    ],
    textureOrPresentation: 'Textura fluida de absorción rápida, frasco gotero 30 ml.',
    clinicalNote:
      'Ideal como paso previo al filtro solar. Fototipos I–IV; en pieles reactivas se recomienda iniciar 2 a 3 veces por semana.',
  },
  {
    id: 'lsr-glicolico',
    brandId: 'lasserre',
    brandName: 'Lasserre',
    category: 'facial',
    subcategory: 'Exfoliante químico',
    name: 'Exfoliante Químico Ácido Glicólico 8%',
    description:
      'Exfoliante de renovación química al 8% de ácido glicólico que alisa la textura, desobstruye poros y estimula la renovación celular.',
    keyActives: ['Ácido Glicólico 8%', 'Alantoína', 'Bisabolol'],
    skinTypes: ['Grasa', 'Mixta', 'Normal'],
    benefits: [
      'Textura alisada y refinada',
      'Poros desobstruidos',
      'Tono más parejo',
    ],
    textureOrPresentation: 'Pump semigel traslúcido, fácil dosificación, frasco 100 ml.',
    clinicalNote:
      'Uso nocturno de 2 a 3 veces por semana. Suspender 48 h antes de cualquier sesión de cabina con aparatología.',
  },
  {
    id: 'lsr-agua-avena',
    brandId: 'lasserre',
    brandName: 'Lasserre',
    category: 'toners',
    subcategory: 'Agua cosmética',
    name: 'Agua Micelar de Avena, Caléndula & Hamamelis',
    description:
      'Agua cosmética calmante con extractos de avena, caléndula y hamamelis que limpia suavemente, tonifica y restaura el equilibrio de la piel.',
    keyActives: ['Avena coloidal', 'Caléndula', 'Hamamelis'],
    skinTypes: ['Sensible', 'Seca', 'Normal'],
    benefits: [
      'Limpiar y tonificar en un solo paso',
      'Efecto calmante inmediato',
      'Ideal para pieles reactivas',
    ],
    textureOrPresentation: 'Solución micelar acuosa, frasco 250 ml.',
    clinicalNote:
      'Apta para el rostro y el contorno. Sin alcohol ni perfumes sintéticos; biocompatible con pieles bajo tratamiento despigmentante.',
  },
  {
    id: 'lsr-celulas-madre',
    brandId: 'lasserre',
    brandName: 'Lasserre',
    category: 'facial',
    subcategory: 'Crema regeneradora',
    name: 'Crema Regeneradora de Células Madre',
    description:
      'Crema nutritiva con células madre vegetales de rosa mosqueta que repara, reconforta y refuerza la función barrera de la piel.',
    keyActives: ['Células madre de rosa mosqueta', 'Escualano', 'Ceramidas'],
    skinTypes: ['Seca', 'Normal', 'Madura'],
    benefits: [
      'Reparación de la barrera cutánea',
      'Nutrición y confort prolongado',
      'Atenúa la sensación de tirantez',
    ],
    textureOrPresentation: 'Crema fundente de acabado satinado, envase 50 ml.',
    clinicalNote:
      'Excelente complemento posterior a procedimientos de exfoliación química. Recomendada para climas fríos y piel desvitalizada.',
  },
  {
    id: 'lsr-shampoo-avena',
    brandId: 'lasserre',
    brandName: 'Lasserre',
    category: 'hair',
    subcategory: 'Shampoo regenerador',
    name: 'Shampoo Calmante de Avena para Cuero Cabelludo Sensible',
    description:
      'Shampoo de higiene suave con avena y proteínas de trigo que limpia sin sobre-descamar y conforta el cuero cabelludo irritable.',
    keyActives: ['Avena coloidal', 'Proteínas de trigo', 'Vitamina B5'],
    skinTypes: ['Sensible', 'Seca', 'Con irritación'],
    benefits: [
      'Limpieza respetuosa',
      'Calma picor y tirantez',
      'Aporta suavidad y brillo natural',
    ],
    textureOrPresentation: 'Gel cremoso de bajo porcentaje de sulfato, frasco 250 ml.',
    clinicalNote:
      'Indicado en cuero cabelludo reactivo o post-quimioterapia de tinte. Uso alterno con un shampoo de equilibrio graso si el cuero cabelludo es mixto.',
  },

  /* ---------------- Dermik / Levinia ---------------- */
  {
    id: 'drm-peeling-enzimatico',
    brandId: 'dermik',
    brandName: 'Dermik',
    category: 'facial',
    subcategory: 'Peeling enzimático',
    name: 'Peeling Enzimático Higienizante',
    description:
      'Higienización profunda con enzimas de papaya y piña que disuelve células muertas y sebo sin agredir la barrera, preparando la piel para la aparatología.',
    keyActives: ['Papaína', 'Bromelina', 'Betaína'],
    skinTypes: ['Grasa', 'Mixta', 'Normal'],
    benefits: [
      'Limpieza profunda de poros',
      'Suaviza y unifica textura',
      'Preparación óptima para cabina',
    ],
    textureOrPresentation: 'Pasta cremosa de aplicación en cabina, tarro 500 ml.',
    clinicalNote:
      'Formulación electro-óptima: potencia la acción de la espátula ultrasónica y del vapor de ozono en la higiene facial clínica.',
  },
  {
    id: 'drm-cellmater',
    brandId: 'dermik',
    brandName: 'Dermik',
    category: 'facial',
    subcategory: 'Sérum regenerador',
    name: 'Sérum Regenerador CellMater',
    description:
      'Sérum con células madre vegetales que estimula la renovación celular y restaura el confort de la piel cansada o estresada.',
    keyActives: ['Células madre vegetales', 'Ácido hialurónico de bajo peso', 'Péptidos'],
    skinTypes: ['Seca', 'Mixta', 'Madura'],
    benefits: [
      'Regeneración celular',
      'Efecto rebote de hidratación',
      'Calma la piel sensibilizada',
    ],
    textureOrPresentation: 'Sérum de gotario de absorción rápida, 30 ml.',
    clinicalNote:
      'Referente de los protocolos post-exfoliación. Compatible con dermapen y aparatología de radiofrecuencia.',
  },
  {
    id: 'drm-botulift',
    brandId: 'dermik',
    brandName: 'Dermik',
    category: 'facial',
    subcategory: 'Contorno tensor',
    name: 'Contorno Botulift Efecto Tensor',
    description:
      'Contorno de ojos y rostro con efecto tensor inmediato que reduce la apariencia de líneas de expresión y flacidez incipiente.',
    keyActives: ['Complejo Botulift', 'Argireline', 'Cafeína'],
    skinTypes: ['Normal', 'Mixta', 'Madura'],
    benefits: [
      'Tensor inmediato y gradual',
      'Atenúa líneas de expresión',
      'Descongestión del contorno',
    ],
    textureOrPresentation: 'Fluido de secado rápido con acabado lifting, 15 ml.',
    clinicalNote:
      'Uso diurno bajo maquillaje y potenciado en cabina mediante microcorrientes o masaje miofascial.',
  },
  {
    id: 'drm-hialuronic',
    brandId: 'dermik',
    brandName: 'Dermik',
    category: 'toners',
    subcategory: 'Tónico hidratante',
    name: 'Tónico Hialuronic Puro',
    description:
      'Tónico con ácido hialurónico reticulado de peso molecular mixto que hidrata, re-equilibra el pH y prepara la piel para el sérum.',
    keyActives: ['Ácido hialurónico reticulado', 'Agua de hamamelis', 'Provitamina B5'],
    skinTypes: ['Seca', 'Mixta', 'Deshidratada'],
    benefits: [
      'Hidratación inmediata',
      'Re-equilibra el pH',
      'Prepara para los activos posteriores',
    ],
    textureOrPresentation: 'Solución acuosa fresca, frasco 200 ml.',
    clinicalNote:
      'El ácido hialurónico reticulado adhiere mejor a la piel húmeda: se recomienda aplicar con el rostro ligeramente húmedo.',
  },
  {
    id: 'drm-adiposuction',
    brandId: 'dermik',
    brandName: 'Dermik',
    category: 'body',
    subcategory: 'Gel reductor',
    name: 'Gel Reductor Adiposuction',
    description:
      'Gel corporal reductor con activos lipolíticos de alto rendimiento, formulado como gel electroconductor para trabajar con aparatología corporal.',
    keyActives: ['Carnitina', 'Cafeína', 'Complejo lipolítico'],
    skinTypes: ['Corporal mixta', 'Flacidez con celulitis'],
    benefits: [
      'Potencia la reducción de volumen',
      'Mejora la firmeza',
      'Conductor eléctrico de cabina',
    ],
    textureOrPresentation: 'Gel fredo transparente, envase 1 kg para uso profesional.',
    clinicalNote:
      'Diseñado para electrodos de aparatología corporal con geles electroconductores: vacumterapia, radiofrecuencia y Cavi-Press.',
  },

  /* ---------------- Laboratorio Dr. Fontboté ---------------- */
  {
    id: 'fbt-h2',
    brandId: 'fontbote',
    brandName: 'Dr. Fontboté',
    category: 'facial',
    subcategory: 'Hidratante activo',
    name: 'Crema Hidratante Activa H.2',
    description:
      'Crema de hidratación activa con sistema biomimético de doble acción que capta agua del ambiente y retiene la humedad en la piel.',
    keyActives: ['Ácido hialurónico de doble peso', 'Glicerina biomimética', 'Tremoella'],
    skinTypes: ['Seca', 'Normal', 'Deshidratada'],
    benefits: [
      'Hidratación de larga duración',
      'Refuerza la barrera cutánea',
      'Deja la piel tersa y flexible',
    ],
    textureOrPresentation: 'Emulsión cremosa no grasa, envase 50 ml.',
    clinicalNote:
      'El sistema H.2 crea una película higroscópica que sostiene la hidratación durante horas; ideal bajo condiciones de calefacción o aire acondicionado.',
  },
  {
    id: 'fbt-caviar',
    brandId: 'fontbote',
    brandName: 'Dr. Fontboté',
    category: 'facial',
    subcategory: 'Sérum alta gama',
    name: 'Sérum Firmeza Caviar & Sirhamnose',
    description:
      'Sérum de alta gama que combina extracto de caviar y ramnosa para devolver densidad, firmeza y luminosidad a la piel madura.',
    keyActives: ['Extracto de caviar', 'Sirhamnose', 'Péptidos de cobre'],
    skinTypes: ['Madura', 'Flácida', 'Deshidratada'],
    benefits: [
      'Restaura la densidad cutánea',
      'Firmeza y elasticidad',
      'Luminosidad premium',
    ],
    textureOrPresentation: 'Sérum perla textura sedosa, frasco gotero 30 ml.',
    clinicalNote:
      'Pieza firma de los protocolos tensor lifting. Combinar en cabina con radiofrecuencia y masaje miofascial para potenciar el efecto.',
  },
  {
    id: 'fbt-niacinamida',
    brandId: 'fontbote',
    brandName: 'Dr. Fontboté',
    category: 'toners',
    subcategory: 'Concentrado facial',
    name: 'Concentrado Niacinamida 5% + Zinc',
    description:
      'Concentrado puro de niacinamida al 5% con zinc PCA que regula el exceso de sebo, calma la inflamación y refina los poros.',
    keyActives: ['Niacinamida 5%', 'Zinc PCA', 'Ácido azelaico'],
    skinTypes: ['Grasa', 'Mixta', 'Propensa al acné'],
    benefits: [
      'Regula la producción de sebo',
      'Calma brotes y rojeces',
      'Refina el tamaño de los poros',
    ],
    textureOrPresentation: 'Concentrado fluido de gotario, 30 ml.',
    clinicalNote:
      'Perfecta tolerancia en pieles con acné inflamatorio o post-procedimiento. No suspender 48 h previas a un peeling de gabinete.',
  },
  {
    id: 'fbt-adipocell',
    brandId: 'fontbote',
    brandName: 'Dr. Fontboté',
    category: 'body',
    subcategory: 'Loción corporal',
    name: 'Loción Corporal Adelgazante Adipocell',
    description:
      'Loción corporal remodelante de acción progresiva que ataca la celulitis, alisa la piel y mejora la firmeza de abdomen, piernas y glúteos.',
    keyActives: ['Cafeína liposomada', 'L-Carnitina', 'Extracto de hiedra'],
    skinTypes: ['Corporal con celulitis', 'Flacidez'],
    benefits: [
      'Reduce la apariencia de celulitis',
      'Alisa y reafirma',
      'Efecto frío localizado',
    ],
    textureOrPresentation: 'Loción de textura sedosa de rápida absorción, frasco 500 ml.',
    clinicalNote:
      'Uso domiciliario diario en complemento al protocolo corporal de cabina Adipocell con masaje y aparatología reafirmante.',
  },
  {
    id: 'fbt-retinol',
    brandId: 'fontbote',
    brandName: 'Dr. Fontboté',
    category: 'facial',
    subcategory: 'Concentrado nocturno',
    name: 'Concentrado de Retinol 0,3% de Uso Profesional',
    description:
      'Concentrado de retinol estabilizado a dosis profesional que renueva la piel durante la noche, difumina líneas y unifica el tono.',
    keyActives: ['Retinol 0,3%', 'Bakuchiol', 'Vitaminas A y E'],
    skinTypes: ['Mixta', 'Madura', 'Con hiperpigmentación'],
    benefits: [
      'Renovación celular nocturna',
      'Disminuye arrugas y líneas finas',
      'Unifica manchas del fototipo',
    ],
    textureOrPresentation: 'Fluido emulsionado de uso nocturno, 30 ml.',
    clinicalNote:
      'Dispensación bajo asesoría de gabinete. Fotoprotección estricta al día siguiente. No combinar con AHA la misma noche.',
  },
]);

export const productById = (id: string): Product => {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Producto desconocido: ${id}`);
  return product;
};

/* ------------------------------------------------------------------ */
/* D. Protocolos de cabina                                             */
/* ------------------------------------------------------------------ */

export const protocols: ClinicProtocol[] = [
  {
    id: 'higiene-facial',
    name: 'Higiene Facial Profunda & Desincrustación Ultrasónica',
    subtitle: 'Limpieza clínica profunda con vapor de ozono y espátula ultrasónica.',
    category: 'facial',
    duration: '60 min',
    leadPractitionerId: 'nayareth',
    leadPractitionerName: 'Nayareth González',
    description:
      'Higiene facial de nivel clínico que descongestiona los poros, elimina impurezas y células muertas y re-equilibra la piel para recibir activos de forma óptima.',
    associatedBrands: ['Lasserre', 'Dermik'],
    indicatedFor: [
      'Pieles grasas o mixtas con poros congestionados',
      'Puntos negros y comedones',
      'Textura irregular y aspecto apagado',
    ],
    steps: [
      'Higienización y desmaquillado con agua micelar botánica.',
      'Exfoliación enzimática Dermik y apertura de poros con vapor de ozono.',
      'Desincrustación con espátula ultrasónica.',
      'Extracción manual de comedones bajo control de bioseguridad.',
      'Aplicación de máscara hidroplástica según fototipo y velo de colágeno.',
      'Sello final con sérum de vitamina C Lasserre y filtro solar.',
    ],
    keyActiveUsed: 'Peeling enzimático + Vitamina C 10%',
  },
  {
    id: 'drenaje-facial',
    name: 'Drenaje Linfático Facial Descongestivo & Crioterapia',
    subtitle: 'Desinflama, nutre y relaja con DLM método Vodder.',
    category: 'spa',
    duration: '50 min',
    leadPractitionerId: 'paz',
    leadPractitionerName: 'Paz Valencia',
    description:
      'Protocolo de bienestar que con el Drenaje Linfático Manual facial método Vodder descongestiona, estimula la microcirculación y culmina con crioterapia de esferas para sellar los efectos.',
    associatedBrands: ['Lasserre', 'Dr. Fontboté'],
    indicatedFor: [
      'Rostro con hinchazón o retención de líquidos',
      'Ojeras y bolsas por congestión',
      'Estrés, tensión facial y falta de hidratación',
    ],
    steps: [
      'Diagnóstico del estado de la barrera hidrolipídica.',
      'Drenaje Linfático Manual facial método Vodder.',
      'Masoterapia estética descongestiva con aromaterapia botánica.',
      'Crioterapia facial con esferas descongestivas.',
      'Hidratación profunda con crema H.2 de Dr. Fontboté.',
      'Cierre relajante con digitopresión en puntos de tensión.',
    ],
    keyActiveUsed: 'Ácido hialurónico H.2 + aromaterapia botánica',
  },
  {
    id: 'diagnostico-wood',
    name: 'Diagnóstico con Lámpara de Wood & Prescripción Personalizada',
    subtitle: 'Análisis clínico de biotipo y fototipo en cabina.',
    category: 'diagnostico',
    duration: '40 min',
    leadPractitionerId: 'catalina',
    leadPractitionerName: 'Catalina Cortés',
    description:
      'Consulta diagnóstica que utiliza la Lámpara de Wood y sebometría para conocer el biotipo, el fototipo y las alteraciones leves de la piel, y culmina con una prescripción de rutina personalizada.',
    associatedBrands: ['Dermik', 'Dr. Fontboté'],
    indicatedFor: [
      'Quienes no conocen su biotipo ni fototipo exacto',
      'Piel con manchas, rojeces o textura irregular',
      'Quienes deseen una rutina domiciliaria a la medida',
    ],
    steps: [
      'Anamnesis cutánea y entrevista de hábitos.',
      'Análisis con Lámpara de Wood (luz ultravioleta diagnóstica).',
      'Sebometría de la barrera hidrolipídica.',
      'Evaluación de biotipo, fototipo y alteraciones leves.',
      'Prescripción personalizada de rutina domiciliaria.',
      'Entrega de plan de cabina sugerido con marcas y activos.',
    ],
    keyActiveUsed: 'Diagnóstico Lámpara de Wood + sebometría',
  },
  {
    id: 'tensor-lifting',
    name: 'Protocolo Tensor Lifting con Células Madre & Caviar',
    subtitle: 'Firmeza y luminosidad de alta gama, a cuatro manos.',
    category: 'facial',
    duration: '75 min',
    leadPractitionerId: 'nayareth',
    leadPractitionerName: 'Nayareth González & Paz Valencia',
    description:
      'Experiencia facial premium que combina el tensor de células madre y la línea Caviar & Sirhamnose con masaje miofascial, para restaurar densidad y luminosidad inmediata.',
    associatedBrands: ['Dr. Fontboté', 'Dermik'],
    indicatedFor: [
      'Piel con flacidez incipiente o pérdida de densidad',
      'Líneas finas y expresión del tiempo',
      'Busca un efecto lifting visible para una ocasión especial',
    ],
    steps: [
      'Higienización y preparación con vapor de ozono.',
      'Aplicación de sérum Caviar & Sirhamnose con masaje miofascial.',
      'Masaje tensor con crema de células madre vegetales CellMater.',
      'Radiofrecuencia de confort para potenciar la síntesis de colágeno.',
      'Máscara tissu de caviar con efecto tensor.',
      'Sello de luminosidad con sérum final y drenaje de cierre.',
    ],
    keyActiveUsed: 'Células madre CellMater + extracto de caviar',
  },
];

export const protocolById = (id: string): ClinicProtocol => {
  const protocol = protocols.find((p) => p.id === id);
  if (!protocol) throw new Error(`Protocolo desconocido: ${id}`);
  return protocol;
};

export const protocolNames = protocols.map((p) => p.name);

/* ------------------------------------------------------------------ */
/* Horarios de reserva                                                 */
/* ------------------------------------------------------------------ */

export const bookingHours = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

/* ------------------------------------------------------------------ */
/* Quiz de diagnóstico cutáneo                                         */
/* ------------------------------------------------------------------ */

export const quizOptions: {
  skinType: { value: SkinType; label: string; hint: string }[];
  mainConcern: { value: MainConcern; label: string; hint: string }[];
  priorityArea: { value: PriorityArea; label: string; hint: string }[];
  sensitivity: { value: Sensitivity; label: string; hint: string }[];
} = {
  skinType: [
    { value: 'grasa', label: 'Grasa', hint: 'Brillos rápidos, poros visibles y tendencia a imperfecciones.' },
    { value: 'mixta', label: 'Mixta', hint: 'Zona T con brillos; mejillas normales o secas.' },
    { value: 'seca', label: 'Seca', hint: 'Sensación de tirantez, textura áspera o descamación.' },
    { value: 'sensible', label: 'Normal / Sensible', hint: 'Rojeces, picor o reacciones a productos.' },
  ],
  mainConcern: [
    { value: 'acne', label: 'Acné / Puntos negros', hint: 'Imperfecciones, brotes y comedones.' },
    { value: 'firmeza', label: 'Líneas finas / Firmeza', hint: 'Pérdida de elasticidad y primeras arrugas.' },
    { value: 'manchas', label: 'Manchas / Tono irregular', hint: 'Hiperpigmentación y tono apagado.' },
    { value: 'deshidratacion', label: 'Deshidratación / Tirantez', hint: 'Piel que "pide" agua y se ve mate.' },
  ],
  priorityArea: [
    { value: 'rostro', label: 'Rostro general', hint: 'Todo el equilibrio y textura facial.' },
    { value: 'ojos', label: 'Contorno de ojos', hint: 'Ojeras, bolsas y líneas de expresión.' },
    { value: 'cuello', label: 'Cuello y escote', hint: 'Firmeza y prevención en esa zona.' },
    { value: 'corporal', label: 'Corporal', hint: 'Cuerpo: reductores, reafirmantes y celulitis.' },
  ],
  sensitivity: [
    { value: 'baja', label: 'Baja / Resistente', hint: 'Soporta activos y aparatología sin problema.' },
    { value: 'media', label: 'Media', hint: 'Algunas reacciones puntuales a ciertos productos.' },
    { value: 'alta', label: 'Alta / Reactiva', hint: 'Enrojecimiento fácil, prioridad a la calma.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Motor algorítmico de recomendación                                  */
/* ------------------------------------------------------------------ */

const toTitleLabel: Record<string, string> = {
  grasa: 'Grasa',
  mixta: 'Mixta',
  seca: 'Seca',
  normal: 'Normal',
  sensible: 'Sensible',
  acne: 'Acné / Puntos negros',
  firmeza: 'Líneas finas / Firmeza',
  manchas: 'Manchas / Tono irregular',
  deshidratacion: 'Deshidratación / Tirantez',
  rostro: 'Rostro general',
  ojos: 'Contorno de ojos',
  cuello: 'Cuello y escote',
  corporal: 'Corporal',
  baja: 'Baja / Resistente',
  media: 'Media',
  alta: 'Alta / Reactiva',
};

const pick = <T,>(candidates: T[], seed: number): T =>
  candidates[Math.abs(seed) % candidates.length];

export function computeRecommendation(quiz: QuizState): Recommendation {
  const skinType = quiz.skinType ?? 'normal';
  const concern = quiz.mainConcern ?? 'manchas';
  const area = quiz.priorityArea ?? 'rostro';

  const isSensitive = quiz.sensitivity === 'alta';
  const isOily = skinType === 'grasa';
  const isDry = skinType === 'seca' || skinType === 'sensible';

  let practitioner: Practitioner;
  if (area === 'ojos' || (area === 'cuello' && concern === 'firmeza')) {
    practitioner = practitioners.find((p) => p.id === 'nayareth')!;
  } else if (area === 'rostro' && (isSensitive || isDry)) {
    practitioner = practitioners.find((p) => p.id === 'paz')!;
  } else if (concern === 'acne' || concern === 'manchas') {
    practitioner = practitioners.find((p) => p.id === 'catalina')!;
  } else {
    practitioner = practitioners[0];
  }

  const candidateProducts = (() => {
    const ids: string[] = [];
    if (concern === 'acne') {
      ids.push('fbt-niacinamida', 'drm-peeling-enzimatico', 'lsr-glicolico');
      if (area === 'corporal') ids.push('drm-adiposuction');
    } else if (concern === 'firmeza') {
      ids.push('fbt-caviar', 'drm-cellmater', 'drm-botulift');
    } else if (concern === 'manchas') {
      ids.push('lsr-vitamina-c', 'fbt-niacinamida', 'fbt-retinol');
    } else {
      ids.push('fbt-h2', 'drm-hialuronic', 'lsr-celulas-madre');
    }
    if (area === 'ojos') ids.push('drm-botulift');
    if (area === 'cuello') ids.push('fbt-caviar');
    if (area === 'corporal') ids.push('fbt-adipocell');
    if (isSensitive) ids.push('lsr-agua-avena');
    if (isOily) ids.push('fbt-niacinamida');
    return Object.fromEntries(ids.map((id, i) => [id, i]));
  })();

  const orderedProducts = Object.keys(candidateProducts)
    .map((id) => productById(id))
    .sort((a, b) => candidateProducts[a.id] - candidateProducts[b.id])
    .slice(0, 3);

  const protocolSeed =
    skinType.charCodeAt(0) + concern.charCodeAt(0) * 2 + area.charCodeAt(0) * 3;
  const protocol = pick(
    protocols.filter((p) => {
      if (area === 'corporal') return p.category === 'corporal' || p.id === 'higiene-facial';
      if (isSensitive) return p.id === 'drenaje-facial' || p.id === 'diagnostico-wood';
      if (concern === 'acne') return p.id === 'higiene-facial';
      if (concern === 'firmeza') return p.id === 'tensor-lifting';
      if (concern === 'manchas') return p.id === 'diagnostico-wood' || p.id === 'tensor-lifting';
      return p.id === 'drenaje-facial';
    }),
    protocolSeed,
  );

  const associatedBrandIds = orderedProducts
    .map((p) => p.brandId)
    .filter((id, i, arr) => arr.indexOf(id) === i);
  const brandList = associatedBrandIds.map((id) => brandById(id));

  const clinicalTips = (() => {
    const tips: string[] = [];
    if (isSensitive || isDry) {
      tips.push(
        'Limpiá con agua micelar suave y evitá friccionar; la barrera de tu piel necesita reposo, no agresión.',
      );
    } else {
      tips.push('El sol es el primer enemigo de tu piel: usá filtro solar amplio todos los días, llueva o no.');
    }
    tips.push(
      concern === 'acne'
        ? 'No reventés los granos: eso activa la inflamación y deja huellas. La desincrustación en cabina lo hace por vos.'
        : 'Aplicá los activos sobre piel húmeda para mejorar la absorción y estirar al máximo cada gota.',
    );
    tips.push(
      concern === 'manchas'
        ? 'Las manchas desaparecen más rápido si combinás despigmentantes con protección solar estricta.'
        : concern === 'firmeza'
          ? 'La firmeza también se entrena: incluí masaje facial y aparatología que estimule el colágeno.'
          : 'Dormí las 7-8 horas: la piel se repara de noche, cuando más activos necesita.',
    );
    return tips;
  })();

  const routineSummary = [
    `Biotipo: ${toTitleLabel[skinType]}`,
    `Preocupación: ${toTitleLabel[concern]}`,
    `Zona prioritaria: ${toTitleLabel[area]}`,
    `Sensibilidad: ${toTitleLabel[quiz.sensitivity ?? 'media']}`,
  ];

  const headline = `Ritual ${skinType === 'grasa' || skinType === 'mixta' ? 'equilibrante' : skinType === 'seca' || skinType === 'sensible' ? 'calmante' : 'luminoso'} para tu piel`;

  return {
    practitioner,
    brands: brandList,
    products: orderedProducts,
    protocol,
    clinicalTips: tipsFormat(clinicalTips),
    routineSummary,
    headline,
  };
}

function tipsFormat(tips: string[]): string[] {
  return tips.slice(0, 3);
}

/* ------------------------------------------------------------------ */
/* Horarios y secciones para navegación                                */
/* ------------------------------------------------------------------ */

export const navSections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'practicantes', label: 'Practicantes' },
  { id: 'laboratorios', label: 'Laboratorios' },
  { id: 'catalogo', label: 'Catálogo' },
  { id: 'protocolos', label: 'Protocolos' },
  { id: 'contacto', label: 'Contacto' },
];