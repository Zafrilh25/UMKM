

export interface ImageData {
  mimeType: string;
  data: string; // Base64 string
}

export interface AppState {
  photoCurrentStep: number;
  inputType: 'upload' | 'describe' | 'prompt-generator' | null;
  productDescription: string;
  uploadedImageBase64: ImageData | null;
  selectedCategory: string;
  customCategoryInput: string; // Added for "Isi Sendiri"
  selectedStyle: string;
  baseStyle: string;
  customStyleDetails: string; // NEW: Dedicated field for manual style details
  generatedImages: string[];
  selectedImageForEditing: string | null;
  sceneImageBase64: ImageData | null; // For Reference Swap
  objectToReplace: string; // For Reference Swap
  yourProductDescription: string; // For Reference Swap
  selectedDoodleStyle: string;
  
  // New: Generation Count
  generationCount: number;

  // Style Mode
  styleMode: 'selection' | 'advanced' | 'reference' | 'custom' | 'manual';

  // Word Art State
  wordArtActive: boolean;
  selectedWordArtStyle: string;
  wordArtSource: 'ai' | 'custom';
  wordArtLanguage: string; // Changed to string to support more options
  wordArtTargetAudience: string; // NEW
  wordArtColor: 'solid' | 'colorful';
  wordArtHeadline: string;
  wordArtPunchline: string;
  wordArtHeadlineStyle: string;
  wordArtPunchlineStyle: string;
  wordArtHeadlineLines: string;
  wordArtPunchlineLines: string;

  // Manual Mode State
  manualAperture: string;
  manualLight: string;
  manualShadow: string;
  manualAngle: string;
  manualComposition: string;
  manualBackground: string;
  manualColor: string;
  manualProps: string;

  // Talent State
  talentSource: 'ai' | 'upload' | 'custom';
  talentGender: string;
  talentSegment: string;
  talentRace: string;
  talentHijab: boolean;
  talentUploadedImageBase64: ImageData | null;
  talentChangeOutfit: boolean;
  talentCustomDescription: string;
  isWearable: boolean;
  
  // Effects
  makeSubjectKawaii: boolean;
  
  // Loading State
  loadingMessage: string;
}

export const initialState: AppState = {
  photoCurrentStep: 1,
  inputType: null,
  productDescription: '',
  uploadedImageBase64: null,
  selectedCategory: '',
  customCategoryInput: '',
  selectedStyle: '',
  baseStyle: '',
  customStyleDetails: '', // Initialize empty
  generatedImages: [],
  selectedImageForEditing: null,
  sceneImageBase64: null,
  objectToReplace: '',
  yourProductDescription: '',
  selectedDoodleStyle: 'none',
  
  generationCount: 1, // Default to 1 for quota efficiency

  styleMode: 'selection',
  
  wordArtActive: false,
  selectedWordArtStyle: 'fun-retro',
  wordArtSource: 'ai',
  wordArtLanguage: 'Indonesia (Casual)',
  wordArtTargetAudience: 'Umum (General)',
  wordArtColor: 'solid',
  wordArtHeadline: '',
  wordArtPunchline: '',
  wordArtHeadlineStyle: 'fun-retro',
  wordArtPunchlineStyle: 'social-script',
  wordArtHeadlineLines: 'auto',
  wordArtPunchlineLines: 'auto',

  // Manual Mode Defaults
  manualAperture: 'Medium',
  manualLight: 'Front',
  manualShadow: 'Soft',
  manualAngle: 'Eye-level',
  manualComposition: 'Rule of Thirds',
  manualBackground: 'Solid Color',
  manualColor: '',
  manualProps: '',
  
  talentSource: 'ai',
  talentGender: 'wanita',
  talentSegment: 'dewasa',
  talentRace: 'Indonesia',
  talentHijab: false,
  talentUploadedImageBase64: null,
  talentChangeOutfit: false,
  talentCustomDescription: '',
  isWearable: false,
  
  makeSubjectKawaii: false,
  loadingMessage: ''
};