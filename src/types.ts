export type BrandId = 'lasserre' | 'dermik' | 'fontbote';
export type BrandFilter = BrandId | 'all';

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

export type ProductCategory = 'facial' | 'toners' | 'body' | 'hair';

export interface Product {
  id: string;
  brandId: BrandId;
  brandName: string;
  name: string;
  category: ProductCategory;
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
  id: BrandId;
  name: string;
  officialName: string;
  tagline: string;
  overview: string;
  philosophy: string;
  lines: { title: string; description: string; icon: string }[];
  heroPills: string[];
  badgeColor: string;
}

export type ProtocolCategory = 'facial' | 'corporal' | 'spa' | 'diagnostico';

export interface ClinicProtocol {
  id: string;
  name: string;
  subtitle: string;
  category: ProtocolCategory;
  duration: string;
  leadPractitionerId: string;
  leadPractitionerName: string;
  description: string;
  associatedBrands: ('Lasserre' | 'Dermik' | 'Dr. Fontboté')[];
  indicatedFor: string[];
  steps: string[];
  keyActiveUsed: string;
}

export type SkinType = 'grasa' | 'mixta' | 'seca' | 'normal' | 'sensible';
export type MainConcern = 'acne' | 'firmeza' | 'manchas' | 'deshidratacion';
export type PriorityArea = 'rostro' | 'ojos' | 'cuello' | 'corporal';
export type Sensitivity = 'baja' | 'media' | 'alta';

export interface QuizState {
  skinType: SkinType | null;
  mainConcern: MainConcern | null;
  priorityArea: PriorityArea | null;
  sensitivity: Sensitivity | null;
}

export interface Recommendation {
  practitioner: Practitioner;
  brands: BrandInfo[];
  products: Product[];
  protocol: ClinicProtocol;
  clinicalTips: string[];
  routineSummary: string[];
  headline: string;
}

export interface BookingPrefill {
  practitionerId?: string;
  practitionerName?: string;
  service?: string;
  notes?: string;
  productName?: string;
}