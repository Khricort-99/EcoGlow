Actúa como un Desarrollador Frontend Senior y Diseñador UI/UX experto. Desarrolla una aplicación web completa, reactiva, elegante y profesional para "EcoGlow - Centro de Estética & Dermocosmética", una plataforma clínica de estética integral, cosmetología y dermocosmética profesional en Chile.

---

### 1. STACK TECNOLÓGICO Y LIBRERÍAS
- **Framework**: React 18/19 con TypeScript y Vite.
- **Estilos**: Tailwind CSS con fuentes Google Fonts:
  - Display / Títulos: `'Playfair Display', Georgia, serif`
  - Cuerpo / Textos: `'Plus Jakarta Sans', system-ui, sans-serif`
- **Iconografía**: `lucide-react` para todos los íconos clínicos y de interfaz.
- **Animaciones**: `motion` (o transiciones fluidas de Tailwind) para modales y microinteracciones.
- **Paleta de Colores**: Tonos neutros sofisticados piedra/marfil (`stone-50`, `stone-100`, `stone-800`), acentos cálidos y botánicos en rosa empolvado (`rose-100`, `rose-600`), ámbar suave (`amber-50`, `amber-700`), esmeralda clínico (`emerald-50`, `emerald-700`) e índigo farmacéutico (`indigo-50`, `indigo-700`). Sin colores saturados artificiales.

---

### 2. ESTRUCTURA DE ARCHIVOS Y MÓDULOS
Organiza el proyecto de forma limpia y modular:
- `/src/types.ts`: Modelos de datos de Practicantes, Marcas, Productos, Protocolos de Cabina, Estado del Quiz y Recomendaciones.
- `/src/data/cosmeticsData.ts`: Base de datos completa en español de practicantes, laboratorios, catálogo de cosméticos y protocolos de gabinete.
- `/src/components/Navbar.tsx`: Navegación fija con selector de sección, botón de Test de Piel y CTA de Reserva.
- `/src/components/Hero.tsx`: Cabecera editorial de alto impacto con credenciales, métricas y accesos directos.
- `/src/components/PractitionersSection.tsx`: Perfiles de las 3 practicantes con su rol, enfoque clínico, técnicas de aparatología y botón de agendamiento directo.
- `/src/components/BrandsSection.tsx`: Presentación de los 3 laboratorios líderes (Lasserre, Dermik, Dr. Fontboté) con sus líneas y filtro enlazado al catálogo.
- `/src/components/ProductsCatalog.tsx`: Catálogo interactivo con buscador en tiempo real, filtros por marca y categoría (Facial, Tónicos, Corporal, Capilar), ficha técnica de activos, fototipos recomendados y consulta en gabinete.
- `/src/components/CabinProtocolsSection.tsx`: Protocolos clínicos de cabina con duración, pasos técnicos, principios activos y practicante a cargo.
- `/src/components/SkinDiagnosticQuiz.tsx`: Modal interactivo de diagnóstico cutáneo en 4 pasos (biotipo, afección principal, área prioritaria, sensibilidad) que calcula una prescripción personalizada con practicante idónea, marcas recomendadas, productos y rutina.
- `/src/components/BookingModal.tsx`: Modal interactivo de reserva que permite seleccionar practicante preseleccionada, servicio/protocolo, fecha, hora, observaciones y genera confirmación con enlace directo a WhatsApp.
- `/src/components/Footer.tsx`: Enlaces rápidos, horarios de atención, ubicación y aviso de bioseguridad.
- `/src/App.tsx`: Orquestación global del estado y modales.

---

### 3. MODELOS DE DATOS EXACTOS (`types.ts`)
```typescript
export interface Practitioner {
  id: string;
  name: string;
  role: string;
  currentSituation: string;
  clinicalFocus: string;
  professionalInterest: string;
  specialties: string[];
  equipmentAndTechniques: string[];
  initials: string;
  avatarGradient: string;
  badge: string;
  quote: string;
}

export interface Product {
  id: string;
  brandId: 'lasserre' | 'dermik' | 'fontbote';
  brandName: string;
  name: string;
  category: 'facial' | 'toners' | 'body' | 'hair';
  categoryLabel: string;
  subcategory: string;
  description: string;
  keyActives: string[];
  skinTypes: string[];
  benefits: string[];
  textureOrPresentation: string;
  clinicalNote?: string;
}

export interface BrandInfo {
  id: 'lasserre' | 'dermik' | 'fontbote';
  name: string;
  officialName: string;
  tagline: string;
  overview: string;
  philosophy: string;
  lines: { title: string; description: string; icon: string }[];
  heroPills: string[];
  badgeColor: string;
}

export interface ClinicProtocol {
  id: string;
  name: string;
  subtitle: string;
  category: 'facial' | 'corporal' | 'spa' | 'diagnostico';
  duration: string;
  leadPractitionerId: string;
  leadPractitionerName: string;
  description: string;
  associatedBrands: ('Lasserre' | 'Dermik' | 'Dr. Fontboté')[];
  indicatedFor: string[];
  steps: string[];
  keyActiveUsed: string;
}

4. CONTENIDO Y DATOS CLÍNICOS REALES (datos/cosmeticsData.ts)
A. Las 3 Practicantes:
Nayareth González:
Rol: Practicante en Cosmetología Facial y Corporal.
Situación actual: Estudiante de último año de Técnico en Cosmetología, realizando su práctica profesional en centro de estética integral.
Enfoque clínico: Protocolos de higiene facial profunda, desincrustación, aplicación de máscaras según fototipo y tratamientos corporales reductores y reafirmantes.
Equipamiento: Espátula ultrasónica, vapor de ozono, aparatología corporal con geles electroconductores, velos de colágeno y máscaras hidroplásticas.
Señales: Cosmetología Facial y Corporal (Gradiente ámbar/rosa).
Paz:
Rol: Practicante de Estética y Bienestar.
Situación actual: Alumna en etapa de práctica laboral cursando módulos de estética y técnicas de spa.
Enfoque clínico: Drenaje Linfático Manual (DLM) facial método Vodder, masoterapia estética descongestiva, relajación e hidratación profunda.
Equipamiento: Masaje miofascial, crioterapia facial con esferas descongestivas, aromaterapia botánica y digitopresión.
Señales: Estética & Bienestar Holístico (Gradiente esmeralda/verde azulado).
Catalina Cortés:
Rol: Practicante en Dermocosmética.
Situación actual: Practicante de Cosmetología enfocada en atención consultiva, evaluación de alteraciones cutáneas leves y prescripción de gabinete.
Enfoque clínico: Análisis de piel con Lámpara de Wood, biotipos, fototipos, asesoría de rutinas domiciliarias y control de bioseguridad.
Equipamiento: Lámpara de Wood (luz ultravioleta diagnóstica), sebometría de barrera hidrolipídica, formulaciones dermocosméticas.
Señales: Dermocosmética & Diagnóstico (Gradiente rosa/púrpura suave).
B. Los 3 Laboratorios y Marcas Aliadas:
Cosméticos Lasserre:
Enfoque: Soluciones cosméticas efectivas y accesibles para rostro, cuerpo y cabello con principios activos puros y probados dermatológicamente.
Líneas destacadas: Sérums de Vitamina C concentrada, exfoliantes de Ácido Glicólico, aguas cosméticas (avena, caléndula, hamamelis) y cremas con Células Madre.
Dermik / Levinia:
Enfoque: Marca dermocosmética líder en spas y gabinetes en Chile, con formulaciones electro-óptimas para trabajar con aparatología.
Líneas destacadas: Higienización con peelings enzimáticos, CellMater (células madre vegetales), Hialuronic puro, Botulift (efecto tensor) y Adiposuction corporal.
Laboratorio Dr. Fontboté:
Enfoque: Alta gama de cosmética profesional chilena que fusiona fitocosmética avanzada y biotecnología farmacéutica.
Líneas destacadas: Hidratación Activa H.2, Línea Caviar & Sirhamnose, exfoliación química con AHAs (Refinesse), concentrados puros de Niacinamida y Retinol, y línea corporal Adipocell.
C. Catálogo de productos (Al menos 9 de 12 producidos con detalles):
Incluir productos de cada marca con nombre, activos clave (ej. Vitamina C al 10%, Ácido Hialurónico reticulado, AHA 8%, Niacinamida 5%), categoría, beneficios, texturas y notas de aplicación clínica.
D. Protocolo de Cabina:
Higiene Facial Profunda & Desincrustación Ultrasónica(60 min - Nayareth Gonzales - Lasserre y Dermik).
Drenaje Linfático Facial Descongestivo & Crioterapia(50 min - Paz Valencia - Lasserre & Dr. Fontboté).
Diagnóstico con Lámpara de Wood & Prescripción Personalizada(40 min - Catherine Cortés - Dermik y el Dr. Fontboté).
Protocolo Tensor Lifting con Células Madre & Caviar(75 min - Nayareth Gonzales & Paz Valencia - Dr. Fontboté y Dermik).
5. REQUISITOS DE FUNCIONALIDAD E INTERACTIVIDAD
Filtro Cruzado Marca -> Catálogo:
Al hacer clic en "Ver productos de este laboratorio" en la sección de marcas, debe hacer scroll suave al catálogo y filtrar automáticamente por esa marca.
Buscador y Filtros de Productos:
Búsqueda por texto (nombre, principio activo o beneficio) y filtro por categoría (Todos, Facial, Tónicos, Corporal, Capilar).
Botón en cada tarjeta de producto: "Consultar en Gabinete" que abre el modal de reserva con el producto precargado en las notas.
Test de Diagnóstico Cutáneo Interactivo (Quiz Modal):
4 preguntas con opciones de selección clara:
Biotipo cutáneo (Grasa, Mixta, Seca, Normal/Sensible).
Preocupación principal (Acné/Puntos negros, Líneas finas/Firmeza, Manchas/Tono irregular, Deshidratación/Tirantez).
Zona prioritaria (Rostro general, Contorno de ojos, Cuello y escote, Corporal).
Nivel de sensibilidad (Baja/Resistente, Media, Alta/Reactiva).
Al finalizar, genera un resultado algorítmico dinámico recomendando la practicante ideal, productos sugeridos, el protocolo de cabina indicado y 3 consejos clínicos.
Botón para "Agendar Protocolo Recomendado" que traslada toda la prescripción al modal de reserva.
Modal de Reserva Integral (BookingModal):
Campos: Nombre completo, Teléfono/WhatsApp, Correo, Especialista deseada (Nayareth, Paz, Catalina o Cualquier profesional), Servicio/Protocolo seleccionado, Fecha preferente, Hora y Motivo de consulta.
Si se abre desde una practicante, producto o resultado del quiz, los campos se precargan automáticamente.
Pantalla de éxito con resumen de cita y botón directo: "Enviar confirmación por WhatsApp"con formato de mensaje codificado para la clínica.
Diseño Visual Anti-Cliché:
Evita gradientes estridentes y sombras exageradas.
Usa bordes sutiles (border-stone-200), fondos tipo lino/marfil (bg-stone-50), tipografía con espaciado óptico armónico y etiquetas tipo badge elegantes.
En móviles, botones táctiles de mínimo 44px de altura y navegación colapsable limpia.
Genera todo el código necesario y asegúrate de que compila limpiamente sin dependencias faltantes ni errores de TypeScript.

***

### Ventajas de este prompt al usarlo en OpenCode:
1. **Auto-contenido**: No requiere que el modelo adivine qué hacían las practicantes ni qué marcas se trabajaban; todo está especificado con rigor clínico y cosmetológico.
2. **Estructura Modular**: Le indica explícitamente dividir en archivos (`types.ts`, `data/`, `components/`) para evitar cortes por límite de contexto.
3. **Flujos Interactivos Conectados**: Define con precisión los vínculos de estado (del Quiz a la Reserva, de las Marcas al Catálogo y de los Productos a la consulta en Gabinete).