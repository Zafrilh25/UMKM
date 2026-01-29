import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Upload, Sparkles, AlertCircle, RotateCcw, 
  Download, ArrowLeft, Sun, MessageSquare, SlidersHorizontal, 
  Image as ImageIcon, PenTool, Settings, ChevronRight, ChevronDown,
  User, Hand, Smartphone, Coffee, ShoppingBag, Eye, Zap, 
  Aperture, Grid, Scissors, Layers, Star, Globe, Box, Heart, Wand2, CheckSquare, Square
} from 'lucide-react';
import { CATEGORIES, STYLE_CATEGORIES, WORD_ART_STYLES, DOODLE_STYLES, LOADING_MESSAGES, TALENT_MODEL_STYLES, STYLES_WITH_TALENT, AD_LANGUAGES, TARGET_AUDIENCES, STYLE_DESCRIPTIONS } from './data/constants';
import { initialState, AppState } from './types';
import { toBase64, checkWordCount } from './utils/helpers';
import { callGeminiAPI } from './services/geminiService';
import { generateImagePrompts } from './utils/promptUtils';

export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modals
  const [showModal, setShowModal] = useState(false);
  const [showKawaiiModal, setShowKawaiiModal] = useState(false);
  
  // Info Modal State
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Filters for Modal
  const [wordArtFilter, setWordArtFilter] = useState('all');
  const [doodleFilter, setDoodleFilter] = useState('all');
  
  // Refs
  const editorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [brightness, setBrightness] = useState(100);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);

  // --- EFFECT: CHECK LOCAL STORAGE FOR INFO MODAL ---
  useEffect(() => {
    const isHidden = localStorage.getItem('hide_info_modal_v1.8');
    if (!isHidden) {
      setShowInfoModal(true);
    }
  }, []);

  const handleCloseInfoModal = () => {
    if (dontShowAgain) {
      localStorage.setItem('hide_info_modal_v1.8', 'true');
    }
    setShowInfoModal(false);
  };

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // --- LOGIC: DOWNLOAD IMAGE WITH FILTERS ---
  const handleDownload = () => {
    if (!state.selectedImageForEditing) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Enable CORS to allow drawing external images to canvas
    img.crossOrigin = "anonymous"; 
    img.src = state.selectedImageForEditing;

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      if (ctx) {
        // Apply brightness filter
        ctx.filter = `brightness(${brightness}%)`;
        ctx.drawImage(img, 0, 0);

        // Trigger download
        const link = document.createElement('a');
        link.download = `hype-studio-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };

    img.onerror = () => {
      setError("Gagal memproses gambar untuk diunduh.");
    };
  };

  // --- LOGIC: STYLE ICONS HELPER ---
  const getStyleIcon = (styleName: string) => {
      const s = styleName.toLowerCase();
      if (s.includes('model')) return <User className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('hand')) return <Hand className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('food') || s.includes('cafe')) return <Coffee className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('bag') || s.includes('shop')) return <ShoppingBag className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('tech') || s.includes('phone')) return <Smartphone className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('eye') || s.includes('view')) return <Eye className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('neon') || s.includes('flash')) return <Zap className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('studio') || s.includes('light')) return <Aperture className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('grid') || s.includes('tile')) return <Grid className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('collage') || s.includes('paper') || s.includes('craft')) return <Scissors className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('layer') || s.includes('3d') || s.includes('isometric')) return <Layers className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('miniature') || s.includes('diorama') || s.includes('lego')) return <Box className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('world') || s.includes('island') || s.includes('biosphere') || s.includes('terrarium')) return <Globe className="w-8 h-8 stroke-1 text-gray-700" />;
      if (s.includes('kawaii') || s.includes('cute')) return <Heart className="w-8 h-8 stroke-1 text-gray-700" />;
      return <Sparkles className="w-8 h-8 stroke-1 text-gray-700" />;
  };

  const shouldShowTalentSection = (style: string) => {
    return STYLES_WITH_TALENT.includes(style) || STYLES_WITH_TALENT.some(s => style.includes(s));
  };

  const isStyleVisible = (styleName: string, category: string): boolean => {
    // 1. Gaya Universal (Selalu tampil untuk semua kategori)
    const universalStyles = [
        'Danish Pastel Room', 'Y2K Liquid Chrome', 'Dreamy Soft Glow', 
        'Dark Academia Desk', 'Fairycore Forest', 'Cyberpunk Neon', 
        'Golden Hour Shadows', 'Underwater Ethereal', 'Disco Glitter Party', 
        'Abstract Memphis',
        'Studio Clean', 'Hard Light & Geometric Shadow', 'Monochrome / B&W', 
        'Reflection / Mirror Shot',
        'Natural & Bright', 'Rustic Natural', 'Korean Cafe Aesthetic', 
        'Lifestyle Sosial Media', 'Aesthetic Minimalis', 'Cozy Home Diary', 
        'Korean Aesthetic Desk',
        'Pop Color / High Saturation', 'Pop Grafis (Grid/Checkers)', 
        'Flatlay Grafis (Hard Light)', 'Piknik Retro (Hard Light)', 
        'Retro / Vintage Film Look', 'Flat Pop Icon',
        'Miniature World', 'World Tour Diorama', 'Fantasy Floating Island',
        'Glass Terrarium', 'Lego Brick Land', 'Papercraft Pop-Up',
        'Isometric 3D Room', 'Retro Pop Tile Studio', 'Kitchen Diorama',
        'Surreal Adventure Bottle', "Nature's Biosphere",
        'Dark & Moody', 'Cinematic / Filmic Lighting', 'Play with Shadow', 
        'Sunlight & Shadow Play', 'Smoke / Vapor Effect',
        'Splash Shot (Cairan)', 'Action Shot (Padat)', 'Levitation / Floating', 
        'Vivid & Icy Burst', 'Splash Vortex & Levitasi',
        'Luxury Premium', 'Luxe Floral Editorial', 'Aesthetic Stone Tray', 
        'Texture Focus (fabric, leather)', 'Conceptual / Editorial',
        'Flat Lay', 'Creator Workspace POV', 'POV Cafe Workspace', 
        'Food Styling Professional',
        'Full model', 'Hand-in-Frame', 'Half body', 'Reviewer Style', '90s Lens Style', 
        'Ice Cooler (Hand-in-Frame)', 'Floating POV Style', 'Model Pop Color (Gaya Referensi)',
        'Pop Up Angle (Gaya Referensi)', 'Faceless OOTD Focus',
        'Monochrome Bag Pop', 'Dynamic Street Snap', 'Mid-Demo Motion', 'Urban Freeze Motion',
        'JDM Street Style', 'Neon Light Trails',
        'Airport Jetsetter Style', 'Flower Market Style', 'Luxury Hotel Lobby Style', 'Vintage Convertible Style', 
        'Coffee Shop Work Style', 'Escalator Motion Style', 'Grocery Run Aesthetic Style', 'Tennis Court Sporty Style', 
        'Library Dark Academia Style', 'Rainy Car Window Style',
        'Kodak Gold Memories Style', 'Cinestill Night Style', 'Polaroid Flash Style', 'Lomo Vignette Style', 'Disposable Camera Style',
        'Super 8 Roadtrip Style', 'Expired Film Leak Style', 'Classic Noir BW Style', 'Fisheye 90s Style', 'VHS Glitch Style',
        '90s Flash Party Style', 'Retro Diner Date Style', 'Old Money Aesthetic Style', 'Analog Film Grain Style',
        'Subway Commute Style', 'Rooftop Golden Hour Style', 'Concrete Street Style', 'Night City Bokeh Style',
        'Picnic Date Style', 'Art Gallery Minimalist Style'
    ];

    if (universalStyles.includes(styleName)) return true;
    if (universalStyles.some(u => styleName.includes(u))) return true;

    // 2. Tentukan Kata Kunci & Gaya Spesifik per Kategori
    let relevantKeywords: string[] = [];
    let relevantExactMatches: string[] = [];

    if (category === 'Makanan & Minuman') {
        relevantKeywords = ['Food', 'Kitchen', 'Cafe', 'Diner', 'Picnic', 'Splash', 'Ice', 'Drink', 'Mukbang', '90s Lens', 'Reviewer', 'Fruit', 'Liquid', 'Burst', 'Biosphere', 'Adventure'];
        relevantExactMatches = ['Rustic Natural', 'Pop Grafis (Grid/Checkers)', 'Retro / Vintage Film Look', 'Aesthetic Minimalis', 'Cozy Home Diary', 'Flatlay Grafis (Hard Light)', '90s Flash Party Style'];
    } 
    else if (category === 'Fashion & Aksesori') {
        relevantKeywords = ['Street', 'OOTD', 'Mirror', 'Bag', 'Luxury', 'Editorial', 'Texture', 'Model', 'Portrait', 'Flash', 'Subway', 'Rooftop', 'Concrete', 'Night City', 'Gallery', 'Old Money', 'Analog', 'Retro Pop'];
        relevantExactMatches = ['Lifestyle Sosial Media', 'Aesthetic Minimalis', 'Reflection / Mirror Shot', 'Retro / Vintage Film Look', 'Pop Grafis (Grid/Checkers)', 'Dark & Moody', 'Urban Freeze Motion', 'Mid-Demo Motion', 'Dynamic Street Snap', 'JDM Street Style', 'Neon Light Trails', 'Y2K Liquid Chrome', 'Flat Pop Icon'];
    }
    else if (category === 'Kosmetik & Skincare') {
        relevantKeywords = ['Luxury', 'Floral', 'Stone', 'Texture', 'Water', 'Glow', 'Pastel', 'Nature', 'Glass', 'Clean', 'Biosphere', 'Terrarium', 'Floating', 'Podium', 'Chrome'];
        relevantExactMatches = ['Aesthetic Minimalis', 'Cozy Home Diary', 'Korean Aesthetic Desk', 'Reflection / Mirror Shot', 'Underwater Ethereal', 'Fairycore Forest', 'Danish Pastel Room', 'Flat Pop Icon', 'Lifestyle Sosial Media'];
    }
    else if (category === 'Perhiasan & Luxury') {
        relevantKeywords = ['Luxury', 'Floral', 'Stone', 'Texture', 'Dark', 'Moody', 'Reflection', 'Mirror', 'Art Deco', 'Gallery', 'Clean', 'Gold'];
        relevantExactMatches = ['Aesthetic Minimalis', 'Dark Academia Desk', 'Conceptual / Editorial', 'Monochrome / B&W', 'Studio Clean', 'Hard Light & Geometric Shadow'];
    }
    else if (category === 'Elektronik & Gadget') {
        relevantKeywords = ['Cyber', 'Neon', 'Workspace', 'Desk', 'Tech', 'Isometric', 'Metal', 'Chrome', 'Dark', 'Gaming', 'Blueprint'];
        relevantExactMatches = ['Korean Aesthetic Desk', 'Creator Workspace POV', 'POV Cafe Workspace', 'Abstract Memphis', 'Flat Pop Icon', 'Y2K Liquid Chrome', 'Hard Light & Geometric Shadow'];
    }
    else if (category === 'Produk Rumah Tangga') {
        relevantKeywords = ['Home', 'Room', 'Kitchen', 'Desk', 'Rustic', 'Cozy', 'Minimalis', 'Wood', 'Plant', 'Diorama'];
        relevantExactMatches = ['Natural & Bright', 'Sunlight & Shadow Play', 'Korean Cafe Aesthetic', 'Danish Pastel Room', 'Lifestyle Sosial Media'];
    }
    else if (category === 'Herbal & Kesehatan') {
        relevantKeywords = ['Natural', 'Rustic', 'Nature', 'Floral', 'Green', 'Forest', 'Biosphere', 'Terrarium', 'Floating'];
        relevantExactMatches = ['Aesthetic Minimalis', 'Sunlight & Shadow Play', 'Fairycore Forest', 'Glass Terrarium', 'Lifestyle Sosial Media'];
    }
    else if (category === 'Mainan & Anak') {
        relevantKeywords = ['Miniature', 'Lego', 'Papercraft', 'Fantasy', 'Toy', 'Pop', 'Cartoon', 'Glitter', 'Isometric', 'World Tour', 'Diorama', 'Brick'];
        relevantExactMatches = ['Pop Color / High Saturation', 'Flat Pop Icon', 'Abstract Memphis', 'Y2K Liquid Chrome', 'Danish Pastel Room'];
    }
    else {
        return true;
    }

    if (relevantExactMatches.includes(styleName)) return true;

    const lowerStyle = styleName.toLowerCase();
    if (relevantKeywords.some(kw => lowerStyle.includes(kw.toLowerCase()))) {
        return true;
    }

    if (styleName === 'Aesthetic Mirror Selfie') {
        return category === 'Fashion & Aksesori';
    }

    return false;
  };

  const handleOpenStyleModal = (style: string) => {
    updateState({ 
        baseStyle: style,
        selectedStyle: style,
        customStyleDetails: '', // Reset manual details
        talentSource: 'ai',
        talentGender: 'wanita',
        talentSegment: 'dewasa',
        talentRace: 'Indonesia',
        talentHijab: false,
        talentUploadedImageBase64: null,
        talentChangeOutfit: false,
        talentCustomDescription: '',
        isWearable: false,
        wordArtActive: false,
        wordArtSource: 'ai',
        wordArtHeadline: '',
        wordArtPunchline: '',
        selectedDoodleStyle: 'none',
        makeSubjectKawaii: false,
        generationCount: 1 // Default to 1 for quota efficiency
    });
    setWordArtFilter('all');
    setDoodleFilter('all');
    setShowModal(true);
  };

  const handleEditEffects = () => {
      setShowModal(true);
  };

  const resetApp = () => {
      setState(initialState);
  };

  // 1. HANDLE UPLOAD & PROMPT GENERATOR
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'upload' | 'prompt-generator') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const base64 = await toBase64(file);
      updateState({ 
        inputType: type, 
        uploadedImageBase64: base64,
        loadingMessage: "Menganalisis gambar..."
      });

      if (type === 'upload') {
        const desc = await callGeminiAPI("Describe this product concisely for photography (in Indonesian). Focus on visual attributes.", base64, 'text');
        updateState({ productDescription: (desc as string) || "" });
      } else {
        const promptAnalysis = await callGeminiAPI(
            "Analyze this image. You are a professional photographer. Describe the visual style, lighting, camera angle, composition, background, props, and mood in a detailed prompt. CRITICAL: DO NOT describe the specific subject/product, only the STYLE. Speak in Indonesian.", 
            base64, 
            'text'
        );
        updateState({ productDescription: (promptAnalysis as string) || "" });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const handleReferenceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
        setLoading(true);
        updateState({ objectToReplace: '', loadingMessage: "Menganalisis foto referensi..." });

        const base64Data = await toBase64(file);
        
        updateState({ 
            sceneImageBase64: base64Data, 
            baseStyle: 'Reference Swap Style', 
            selectedStyle: 'ReferenceSwap' 
        });

        const analysisPrompt = "Analyze this image and identify the main product in the foreground. Describe it concisely in Indonesian. Example: 'botol cleanser putih', 'segelas kopi'.";
        const objectDescription = await callGeminiAPI(analysisPrompt, base64Data, 'text');
        
        if (typeof objectDescription === 'string') {
            updateState({ objectToReplace: objectDescription.trim() });
        }
    } catch (err: any) {
        setError("Gagal menganalisis foto referensi: " + err.message);
    } finally {
        setLoading(false);
    }
  };

  // 2. WORD ART COPY GENERATION (UPDATED ROLE)
  const generateWordArtCopy = async (): Promise<{headline: string, punchline: string} | null> => {
      // Role: Creative Copywriter Specialist
      const prompt = `You are a Creative Copywriter Specialist.
      Product: "${state.productDescription}"
      Task: Create persuasive, attractive, and "selling" ad copy.
      Target Audience: ${state.wordArtTargetAudience}
      Language Style: ${state.wordArtLanguage}
      
      Generate:
      1. One catchy Headline (Max 4 words).
      2. One punchy Punchline (Max 6 words).
      
      Output format strictly: 
      HEADLINE: [text] 
      PUNCHLINE: [text]
      
      Ensure the language is natural and fits the specific target audience chosen.`;
      
      const response = await callGeminiAPI(prompt, null, 'text');
      
      let h = "Produk Keren";
      let p = "Wajib Coba";

      if (typeof response === 'string') {
          const headlineMatch = response.match(/HEADLINE: (.*)/i);
          const punchlineMatch = response.match(/PUNCHLINE: (.*)/i);
          if (headlineMatch) h = headlineMatch[1].trim();
          if (punchlineMatch) p = punchlineMatch[1].trim();
      }
      
      updateState({ 
          wordArtHeadline: h,
          wordArtPunchline: p
      });
      
      return { headline: h, punchline: p };
  };

  // NEW: HANDLE AUTO GENERATE FOR "TULIS SENDIRI"
  const handleAutoGenerateCopy = async () => {
      setIsGeneratingCopy(true);
      try {
          await generateWordArtCopy();
      } catch (err) {
          console.error(err);
      } finally {
          setIsGeneratingCopy(false);
      }
  };

  // 3. MAIN GENERATION LOGIC
  const handleGenerateImages = async () => {
    setLoading(true);
    updateState({ photoCurrentStep: 4, generatedImages: [] });
    
    try {
      let generationContextState = { ...state };

      // Step A: Generate Word Art Copy if active and source is AI
      if (state.wordArtActive && state.wordArtSource === 'ai') {
         updateState({ loadingMessage: "✍️ Meracik copy writing..." });
         const copyResult = await generateWordArtCopy();
         if (copyResult) {
             generationContextState.wordArtHeadline = copyResult.headline;
             generationContextState.wordArtPunchline = copyResult.punchline;
         }
      } else if (state.wordArtActive && state.wordArtSource === 'custom') {
          // Check validation before generating
          const headlineCheck = checkWordCount(state.wordArtHeadline, 4);
          const punchlineCheck = checkWordCount(state.wordArtPunchline, 6);
          if (!headlineCheck.isValid || !punchlineCheck.isValid) {
              throw new Error("Jumlah kata pada Headline atau Punchline melebihi batas. Silakan perbaiki.");
          }
      }

      updateState({ loadingMessage: "🎨 Mengatur pencahayaan & komposisi..." });
      const prompts = generateImagePrompts(generationContextState);
      
      let imagesToGen: any[] = [];
      
      if (state.selectedStyle === 'ReferenceSwap' || state.selectedStyle === 'Reference Swap Style') {
          if (!state.sceneImageBase64) throw new Error("Reference image is missing for swap.");
          let productImg = state.uploadedImageBase64;
          if (productImg) {
              imagesToGen = [state.sceneImageBase64, productImg];
          } else {
              imagesToGen = [state.sceneImageBase64];
          }
      } 
      else {
          if (state.uploadedImageBase64) {
              imagesToGen.push(state.uploadedImageBase64);
          }
          
          const triggersTalent = shouldShowTalentSection(state.baseStyle);
          
          if (triggersTalent && state.talentSource === 'upload' && state.talentUploadedImageBase64) {
              imagesToGen.push(state.talentUploadedImageBase64);
          }
      }

      if (imagesToGen.length === 0) imagesToGen = null as any;

      const type = (state.selectedStyle === 'ReferenceSwap' || state.selectedStyle === 'Reference Swap Style') ? 'image_swap' : 'image';
      
      // CRITICAL FIX FOR 429 ERRORS: Execute requests SEQUENTIALLY instead of Parallel
      const flatResults: string[] = [];
      
      for (let i = 0; i < prompts.length; i++) {
          const p = prompts[i];
          updateState({ loadingMessage: `Membuat foto ${i + 1} dari ${prompts.length}...` });
          
          // Add a small delay between requests if creating multiple to be kind to the rate limit
          if (i > 0) await new Promise(r => setTimeout(r, 500));
          
          try {
              const res = await callGeminiAPI(p, imagesToGen, type);
              if (res) {
                 if (Array.isArray(res)) flatResults.push(...res);
                 else flatResults.push(res);
              }
          } catch (e: any) {
              console.error("Skipping a failed variation:", e);
              // If it's a quota error that persisted through retries, we might want to stop or just continue partial results
              if (e.message?.includes("Quota")) {
                  // If we have at least one result, break and show it. Otherwise throw.
                  if (flatResults.length > 0) break;
                  throw e; 
              }
          }
      }
      
      if (flatResults.length === 0) throw new Error("Gagal membuat gambar. Silakan coba lagi atau kurangi jumlah variasi.");

      updateState({ 
        generatedImages: flatResults.map(b64 => `data:image/png;base64,${b64}`),
        photoCurrentStep: 5 
      });

    } catch (err: any) {
      setError(err.message);
      updateState({ photoCurrentStep: 3 });
    } finally {
      setLoading(false);
    }
  };

  // --- RENDERING HELPERS ---
  const renderTalentSection = () => (
      <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4">Talent Settings</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
              <button onClick={() => updateState({ talentSource: 'ai' })} className={`p-2 border rounded-xl ${state.talentSource === 'ai' ? 'bg-gray-900 text-white' : ''}`}>AI Talent</button>
              <button onClick={() => updateState({ talentSource: 'upload' })} className={`p-2 border rounded-xl ${state.talentSource === 'upload' ? 'bg-gray-900 text-white' : ''}`}>Upload</button>
              <button onClick={() => updateState({ talentSource: 'custom' })} className={`p-2 border rounded-xl ${state.talentSource === 'custom' ? 'bg-gray-900 text-white' : ''}`}>Describe</button>
          </div>
          
          {state.talentSource === 'ai' && (
              <div className="grid grid-cols-2 gap-4">
                  <select className="p-2 border rounded-xl" value={state.talentGender} onChange={e => updateState({ talentGender: e.target.value })}>
                      <option value="wanita">Wanita</option>
                      <option value="pria">Pria</option>
                  </select>
                  <select className="p-2 border rounded-xl" value={state.talentSegment} onChange={e => updateState({ talentSegment: e.target.value })}>
                      <option value="dewasa">Dewasa</option>
                      <option value="remaja">Remaja</option>
                      <option value="anak-anak">Anak-anak</option>
                      <option value="balita">Balita</option>
                      <option value="bayi">Bayi</option>
                  </select>
                  <select className="p-2 border rounded-xl" value={state.talentRace} onChange={e => updateState({ talentRace: e.target.value })}>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Asia Timur">Asia Timur</option>
                      <option value="Bule">Bule</option>
                      <option value="Timur Tengah">Timur Tengah</option>
                      <option value="Afrika">Afrika</option>
                  </select>
                  {state.talentGender === 'wanita' && (
                      <label className="flex items-center gap-2">
                          <input type="checkbox" checked={state.talentHijab} onChange={e => updateState({ talentHijab: e.target.checked })} />
                          Hijab?
                      </label>
                  )}
              </div>
          )}
          {state.talentSource === 'upload' && (
              <div>
                  <input type="file" onChange={async (e) => {
                      if(e.target.files?.[0]) updateState({ talentUploadedImageBase64: await toBase64(e.target.files[0]) });
                  }} />
                  <label className="flex items-center gap-2 mt-2">
                      <input type="checkbox" checked={state.talentChangeOutfit} onChange={e => updateState({ talentChangeOutfit: e.target.checked })} />
                      Change Outfit?
                  </label>
              </div>
          )}
          {state.talentSource === 'custom' && (
              <div className="mt-2">
                  <textarea 
                    className="w-full p-2 border rounded-xl" 
                    placeholder="Describe your talent (e.g., 'A futuristic robot', 'A cat in a suit')..."
                    value={state.talentCustomDescription}
                    onChange={(e) => updateState({ talentCustomDescription: e.target.value })}
                  />
              </div>
          )}
          {state.selectedCategory === 'Fashion & Aksesori' && (
               <label className="flex items-center gap-2 mt-4 p-2 bg-orange-50 rounded-xl">
                  <input type="checkbox" checked={state.isWearable} onChange={e => updateState({ isWearable: e.target.checked })} />
                  <b>Wearable?</b> (Produk dipakai di badan)
              </label>
          )}
      </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 font-inter">
      <header className="py-6 px-8 flex justify-between items-center container mx-auto">
        <div className="text-3xl font-bold flex items-center gap-3">
          <span className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hard-shadow">h.</span>
          hype.
        </div>
        {state.photoCurrentStep > 1 && (
            <button onClick={resetApp} className="px-4 py-2 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-100 hard-shadow text-sm">
                Mulai Baru
            </button>
        )}
      </header>

      <main className="container mx-auto px-4 max-w-5xl">
        <div className="text-left max-w-3xl py-8 md:py-12">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter mb-6">
                hype AI Pocket Photography Studio
                <span className="block text-2xl md:text-3xl text-primary mt-2 font-bold text-[#FF6E30]">version 1.8 EXP</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">Transform Your Photos with the Power of AI – Say Hello to Hype! your all-in-one photo editor designed to elevate your product pictures with the magic of AI.</p>
        </div>
        
        {/* STEP 1: INPUT */}
        {state.photoCurrentStep === 1 && (
            <div className="step-card bg-white border-4 border-gray-900 p-8 rounded-2xl hard-shadow">
              <h2 className="text-3xl font-bold mb-6">Mulai dari mana?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className={`option-button p-6 cursor-pointer border-2 border-gray-900 rounded-2xl hover:bg-gray-100 flex flex-col items-center justify-center text-center h-40 ${state.inputType === 'upload' ? 'bg-gray-900 text-white' : ''}`}>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'upload')} />
                  <Camera className="w-10 h-10 mb-2" />
                  <h3 className="font-bold">Upload Produk</h3>
                </label>
                <button className="option-button p-6 border-2 border-gray-900 rounded-2xl hover:bg-gray-100 flex flex-col items-center justify-center text-center h-40"
                  onClick={() => updateState({ inputType: 'describe', photoCurrentStep: 2 })}>
                  <MessageSquare className="w-10 h-10 mb-2" />
                  <h3 className="font-bold">Tanpa Foto</h3>
                </button>
                <label className="option-button p-6 cursor-pointer border-2 border-gray-900 rounded-2xl hover:bg-gray-100 flex flex-col items-center justify-center text-center h-40">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'prompt-generator')} />
                  <Sparkles className="w-10 h-10 mb-2" />
                  <h3 className="font-bold">Prompt Gen</h3>
                </label>
              </div>
              
              {(state.uploadedImageBase64 || state.inputType === 'prompt-generator') && (
                <div className="mt-6">
                  {state.uploadedImageBase64 && <img src={`data:${state.uploadedImageBase64.mimeType};base64,${state.uploadedImageBase64.data}`} className="h-48 mx-auto rounded-lg border-2 border-gray-900" />}
                  <textarea 
                    className="w-full mt-4 p-3 border-2 border-gray-900 rounded-xl bg-gray-50 hard-shadow"
                    value={state.productDescription}
                    onChange={(e) => updateState({ productDescription: e.target.value })}
                    placeholder={loading ? state.loadingMessage : "Deskripsi produk..."}
                  />
                  {state.inputType === 'prompt-generator' ? (
                      <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl" onClick={() => navigator.clipboard.writeText(state.productDescription)}>Copy Prompt</button>
                  ) : (
                      <button 
                          className={`w-full mt-4 font-bold py-3 rounded-xl border-2 border-gray-900 hard-shadow ${loading || !state.productDescription ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FF6E30] text-white hover:bg-[#e55a2a]'}`} 
                          onClick={() => updateState({ photoCurrentStep: 2 })}
                          disabled={loading || !state.productDescription}
                      >
                          {loading ? 'Sedang Menganalisa...' : 'Lanjut'}
                      </button>
                  )}
                </div>
              )}
            </div>
        )}

        {/* STEP 2: CATEGORY */}
        {state.photoCurrentStep === 2 && (
            <div className="step-card bg-white border-4 border-gray-900 p-8 rounded-2xl hard-shadow">
              <h2 className="text-3xl font-bold mb-6">Langkah 2: Apa Kategori Produk Anda?</h2>
              <div id="category-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map(cat => (
                  <button key={cat} 
                    className={`category-btn p-4 border-2 border-gray-900 rounded-xl font-bold hard-shadow transition-all ${state.selectedCategory === cat ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => {
                        if (cat === 'Isi Sendiri') {
                            updateState({ selectedCategory: 'Isi Sendiri' });
                        } else {
                            updateState({ selectedCategory: cat, photoCurrentStep: 3, styleMode: 'selection' });
                        }
                    }}>
                    {cat}
                  </button>
                ))}
              </div>
              
              {state.selectedCategory === 'Isi Sendiri' && (
                  <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-xl">
                      <label className="block text-sm font-bold mb-2 text-gray-700">Tulis Kategori Produk Anda:</label>
                      <input 
                          type="text" 
                          className="w-full p-3 border-2 border-gray-900 rounded-xl bg-white hard-shadow"
                          placeholder="Contoh: Otomotif, Hewan Peliharaan, Buku..."
                          value={state.customCategoryInput || ''}
                          onChange={(e) => updateState({ customCategoryInput: e.target.value })}
                          autoFocus
                      />
                      <button 
                          className={`w-full mt-4 font-bold py-3 rounded-xl border-2 border-gray-900 hard-shadow ${!state.customCategoryInput ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FF6E30] text-white hover:bg-[#e55a2a]'}`}
                          onClick={() => updateState({ selectedCategory: state.customCategoryInput, photoCurrentStep: 3, styleMode: 'selection' })}
                          disabled={!state.customCategoryInput}
                      >
                          Lanjut dengan Kategori Ini
                      </button>
                  </div>
              )}

              <div className="flex justify-between mt-6">
                <button onClick={() => updateState({ photoCurrentStep: 1 })} className="px-6 py-2 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-100 hard-shadow">Kembali</button>
              </div>
            </div>
        )}

        {/* STEP 3: STYLE SELECTION */}
        {state.photoCurrentStep === 3 && (
            <div id="photo-step-3" className="step-card bg-white border-4 border-gray-900 p-8 rounded-2xl hard-shadow">
              <h2 className="text-3xl font-bold mb-6">Langkah 3: Pilih Gaya Fotografi</h2>
              
              {state.styleMode === 'selection' && (
                  <div id="style-type-selection" className="space-y-4">
                      <button 
                          onClick={() => handleOpenStyleModal('AI Auto Style')}
                          className="w-full p-6 border-2 border-gray-900 rounded-2xl hover:bg-gray-50 flex items-center justify-between group hard-shadow text-left"
                      >
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white">
                                  <Sparkles className="w-6 h-6" />
                              </div>
                              <div>
                                  <h3 className="text-xl font-bold">Gaya Otomatis (Rekomendasi AI)</h3>
                                  <p className="text-gray-500">Biarkan AI menganalisis produk dan memilihkan gaya terbaik.</p>
                              </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
                      </button>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <button onClick={() => updateState({ styleMode: 'advanced' })} className="p-4 border-2 border-gray-900 rounded-xl hover:bg-gray-50 flex flex-col items-center justify-center text-center h-32 hard-shadow">
                              <div className="bg-gray-100 p-3 rounded-full mb-3"><SlidersHorizontal className="w-6 h-6" /></div>
                              <h3 className="font-bold">Katalog Lengkap</h3>
                              <p className="text-xs text-gray-500 mt-1">Pilih manual</p>
                          </button>
                          <button onClick={() => updateState({ styleMode: 'reference', yourProductDescription: state.productDescription })} className="p-4 border-2 border-gray-900 rounded-xl hover:bg-gray-50 flex flex-col items-center justify-center text-center h-32 hard-shadow">
                              <div className="bg-gray-100 p-3 rounded-full mb-3"><Upload className="w-6 h-6" /></div>
                              <h3 className="font-bold">Ganti Referensi</h3>
                              <p className="text-xs text-gray-500 mt-1">Tiru foto lain</p>
                          </button>
                          <button onClick={() => updateState({ styleMode: 'custom' })} className="p-4 border-2 border-gray-900 rounded-xl hover:bg-gray-50 flex flex-col items-center justify-center text-center h-32 hard-shadow">
                              <div className="bg-gray-100 p-3 rounded-full mb-3"><PenTool className="w-6 h-6" /></div>
                              <h3 className="font-bold">Tulis Prompt</h3>
                              <p className="text-xs text-gray-500 mt-1">Ketik sendiri</p>
                          </button>
                          <button onClick={() => updateState({ styleMode: 'manual' })} className="p-4 border-2 border-gray-900 rounded-xl hover:bg-gray-50 flex flex-col items-center justify-center text-center h-32 hard-shadow">
                              <div className="bg-gray-100 p-3 rounded-full mb-3"><Settings className="w-6 h-6" /></div>
                              <h3 className="font-bold">Pro Manual</h3>
                              <p className="text-xs text-gray-500 mt-1">Setting detail</p>
                          </button>
                      </div>
                      
                      <div className="mt-6">
                          <button onClick={() => updateState({ photoCurrentStep: 2 })} className="font-bold text-gray-500 hover:text-gray-900 flex items-center gap-2">
                              <ArrowLeft className="w-4 h-4" /> Kembali ke Kategori
                          </button>
                      </div>
                  </div>
              )}

              {state.styleMode === 'advanced' && (
                  <div id="advanced-style-section" className="space-y-4 mt-4">
                    {/* Render Main Categories */}
                    {Object.entries(STYLE_CATEGORIES).map(([catName, styles]) => {
                        const visibleStyles = styles.filter(s => isStyleVisible(s, state.selectedCategory));
                        if (visibleStyles.length === 0) return null;

                        return (
                            <details key={catName} className="group border-2 border-gray-900 rounded-2xl bg-white overflow-hidden hard-shadow mb-4">
                                <summary className="flex justify-between items-center p-5 cursor-pointer list-none bg-gray-50 hover:bg-gray-100 transition-colors select-none">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-3 h-8 rounded-full ${catName.includes('Trending') ? 'bg-pink-500' : catName.includes('Studio') ? 'bg-blue-500' : catName.includes('Natural') ? 'bg-green-500' : 'bg-gray-900'}`}></span>
                                        <h3 className="font-bold text-lg text-gray-800">{catName}</h3>
                                    </div>
                                    <span className="transform group-open:rotate-180 transition-transform duration-200">
                                        <ChevronDown className="w-6 h-6 text-gray-500" />
                                    </span>
                                </summary>
                                <div className="p-4 bg-white border-t-2 border-gray-100">
                                     <div className="grid grid-cols-1 gap-3">
                                         {visibleStyles.map(style => (
                                             <button key={style} 
                                                 className="group/item flex items-start gap-4 p-4 border-2 border-gray-100 rounded-xl hover:bg-blue-50 hover:border-gray-900 transition-all text-left w-full"
                                                 onClick={() => handleOpenStyleModal(style)}>
                                                 <div className="shrink-0 p-3 bg-gray-50 rounded-lg border border-gray-200 group-hover/item:bg-white group-hover/item:border-gray-400 transition-colors">
                                                     {getStyleIcon(style)}
                                                 </div>
                                                 <div className="flex-1">
                                                     <div className="font-bold text-gray-900 group-hover/item:text-blue-700 transition-colors">{style}</div>
                                                     <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                                                         {STYLE_DESCRIPTIONS[style] || "Gaya fotografi unik untuk produk Anda."}
                                                     </div>
                                                 </div>
                                                 <div className="self-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                     <ChevronRight className="w-5 h-5 text-gray-400" />
                                                 </div>
                                             </button>
                                         ))}
                                     </div>
                                </div>
                            </details>
                        );
                    })}

                    {/* Render Talent Section as a Dropdown */}
                    <details className="group border-2 border-gray-900 rounded-2xl bg-white overflow-hidden hard-shadow mb-4">
                        <summary className="flex justify-between items-center p-5 cursor-pointer list-none bg-gray-50 hover:bg-gray-100 transition-colors select-none">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-8 rounded-full bg-indigo-600"></span>
                                <h3 className="font-bold text-lg text-gray-800">Talent / Model</h3>
                            </div>
                            <span className="transform group-open:rotate-180 transition-transform duration-200">
                                <ChevronDown className="w-6 h-6 text-gray-500" />
                            </span>
                        </summary>
                         <div className="p-4 bg-white border-t-2 border-gray-100">
                             <div className="grid grid-cols-1 gap-3">
                                {TALENT_MODEL_STYLES.map(style => {
                                    if (!isStyleVisible(style, state.selectedCategory)) return null;
                                    return (
                                        <button key={style} 
                                             className="group/item flex items-start gap-4 p-4 border-2 border-gray-100 rounded-xl hover:bg-blue-50 hover:border-gray-900 transition-all text-left w-full"
                                             onClick={() => handleOpenStyleModal(style)}>
                                             <div className="shrink-0 p-3 bg-gray-50 rounded-lg border border-gray-200 group-hover/item:bg-white group-hover/item:border-gray-400 transition-colors">
                                                 {getStyleIcon(style)}
                                             </div>
                                             <div className="flex-1">
                                                 <div className="font-bold text-gray-900 group-hover/item:text-blue-700 transition-colors">{style}</div>
                                                 <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                                                     {STYLE_DESCRIPTIONS[style] || "Gaya foto dengan model profesional."}
                                                 </div>
                                             </div>
                                             <div className="self-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                 <ChevronRight className="w-5 h-5 text-gray-400" />
                                             </div>
                                        </button>
                                    );
                                })}
                             </div>
                         </div>
                    </details>

                    <button onClick={() => updateState({ styleMode: 'selection' })} className="font-bold text-gray-500 mt-4 flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Pilihan Gaya
                    </button>
                  </div>
              )}

              {state.styleMode === 'custom' && (
                  <div>
                      <h3 className="text-xl font-bold mb-4">Tulis Prompt Kustom</h3>
                      <textarea className="w-full p-4 border-2 border-gray-900 rounded-xl h-40 hard-shadow" 
                          placeholder="Deskripsikan gaya foto yang diinginkan secara detail..." 
                          onChange={(e) => updateState({ baseStyle: e.target.value })}
                      ></textarea>
                      <button onClick={() => handleOpenStyleModal(state.baseStyle)} className="mt-4 px-6 py-3 bg-[#FF6E30] text-white font-bold rounded-xl hard-shadow">Gunakan Prompt Ini</button>
                      <button onClick={() => updateState({ styleMode: 'selection' })} className="block mt-4 font-bold text-gray-500">Kembali</button>
                  </div>
              )}

              {state.styleMode === 'reference' && (
                  <div>
                      <h3 className="text-xl font-bold mb-4">Ganti Produk di Foto Referensi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className="font-semibold text-gray-700 mb-2 block">1. Foto Referensi</label>
                              <input type="file" id="reference-file-upload" className="hidden" accept="image/*" onChange={handleReferenceUpload} />
                              <label htmlFor="reference-file-upload" id="reference-upload-label" className="upload-box aspect-square flex flex-col justify-center items-center cursor-pointer bg-gray-50 p-4 border-2 border-gray-900 hard-shadow rounded-xl border-dashed">
                                  {state.sceneImageBase64 ? (
                                      <img src={`data:${state.sceneImageBase64.mimeType};base64,${state.sceneImageBase64.data}`} className="rounded-lg h-full object-contain" />
                                  ) : (
                                      <div id="reference-placeholder" className="text-center">
                                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                          <p className="mt-2 text-sm text-gray-500">Klik untuk mengunggah</p>
                                      </div>
                                  )}
                              </label>
                              <div className="mt-4">
                                  <label htmlFor="object-to-replace-input" className="text-sm font-medium text-gray-700 mb-1 block">Objek yang Ingin Diganti (Hasil Analisa AI)</label>
                                  <input 
                                      type="text" 
                                      id="object-to-replace-input" 
                                      placeholder={loading ? state.loadingMessage : "Unggah foto referensi..."}
                                      className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 hard-shadow"
                                      value={state.objectToReplace}
                                      onChange={(e) => updateState({ objectToReplace: e.target.value })}
                                  />
                              </div>
                          </div>
                          <div>
                              <label className="font-semibold text-gray-700 mb-2 block">2. Produk Anda</label>
                              <div className="upload-box aspect-square flex justify-center items-center bg-gray-50 p-4 border-2 border-gray-900 hard-shadow rounded-xl">
                                  {state.uploadedImageBase64 ? (
                                      <img src={`data:${state.uploadedImageBase64.mimeType};base64,${state.uploadedImageBase64.data}`} className="rounded-lg h-full object-contain" />
                                  ) : (
                                      <img src="https://placehold.co/400x400/f8f7f2/333?text=Produk+Anda" className="rounded-lg h-full object-contain" />
                                  )}
                              </div>
                              <div className="mt-4">
                                  <label htmlFor="your-product-input" className="text-sm font-medium text-gray-700 mb-1 block">Deskripsi Produk Anda (Bisa Diedit)</label>
                                  <input 
                                      type="text" 
                                      id="your-product-input" 
                                      placeholder="Deskripsi produk dari langkah 1" 
                                      className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 hard-shadow"
                                      value={state.yourProductDescription}
                                      onChange={(e) => updateState({ yourProductDescription: e.target.value })}
                                  />
                              </div>
                          </div>
                      </div>
                      <button onClick={() => {
                          updateState({ 
                              baseStyle: 'Reference Swap Style',
                              selectedStyle: 'ReferenceSwap',
                              talentSource: 'ai',
                              wordArtActive: false,
                              selectedDoodleStyle: 'none'
                          });
                          setShowModal(true);
                      }} className="mt-6 w-full py-3 bg-[#FF6E30] text-white font-bold rounded-xl hard-shadow">Ganti & Buat Gambar</button>
                      <button onClick={() => updateState({ styleMode: 'selection' })} className="block mt-4 font-bold text-gray-500 text-center w-full">Kembali</button>
                  </div>
              )}

              {state.styleMode === 'manual' && (
                  <div>
                      <h3 className="text-xl font-bold mb-4">Pengaturan Manual</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700">Aperture (DOF)</label>
                              <select className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 mt-1 hard-shadow"
                                  value={state.manualAperture} onChange={(e) => updateState({ manualAperture: e.target.value })}>
                                  <option>Medium</option>
                                  <option>Low (Bokeh)</option>
                                  <option>High (Tajam)</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700">Arah Cahaya</label>
                              <select className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 mt-1 hard-shadow"
                                  value={state.manualLight} onChange={(e) => updateState({ manualLight: e.target.value })}>
                                  <option>Front</option>
                                  <option>Back</option>
                                  <option>Side</option>
                                  <option>Rim</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700">Bayangan</label>
                              <select className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 mt-1 hard-shadow"
                                  value={state.manualShadow} onChange={(e) => updateState({ manualShadow: e.target.value })}>
                                  <option>Soft</option>
                                  <option>Hard</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700">Angle Kamera</label>
                              <select className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 mt-1 hard-shadow"
                                  value={state.manualAngle} onChange={(e) => updateState({ manualAngle: e.target.value })}>
                                  <option>Eye-level</option>
                                  <option>Top-down (Flat lay)</option>
                                  <option>45-degree</option>
                                  <option>Low angle</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700">Komposisi</label>
                              <select className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 mt-1 hard-shadow"
                                  value={state.manualComposition} onChange={(e) => updateState({ manualComposition: e.target.value })}>
                                  <option>Rule of Thirds</option>
                                  <option>Centered</option>
                                  <option>Diagonal</option>
                                  <option>Symmetry</option>
                                  <option>Asymmetrical Balance</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700">Material Background</label>
                              <select className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 mt-1 hard-shadow"
                                  value={state.manualBackground} onChange={(e) => updateState({ manualBackground: e.target.value })}>
                                  <option>Solid Color</option>
                                  <option>Wood</option>
                                  <option>Linen</option>
                                  <option>Marble</option>
                                  <option>Photorealistic</option>
                              </select>
                          </div>
                          <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Color Grading</label>
                              <input type="text" className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 mt-1 hard-shadow" 
                                  placeholder="Contoh: warm cinematic tones..."
                                  value={state.manualColor} onChange={(e) => updateState({ manualColor: e.target.value })} />
                          </div>
                          <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Tambahkan Properti</label>
                              <input type="text" className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl p-2 mt-1 hard-shadow" 
                                  placeholder="Contoh: a sprig of rosemary..."
                                  value={state.manualProps} onChange={(e) => updateState({ manualProps: e.target.value })} />
                          </div>
                      </div>
                      <button onClick={() => {
                          const { manualAperture, manualLight, manualShadow, manualAngle, manualComposition, manualBackground, manualColor, manualProps } = state;
                          let prompt = `A professional photograph with manual settings. Use a ${manualAperture} depth of field effect. The main light source is ${manualLight} lighting, creating ${manualShadow} shadows. The camera angle is ${manualAngle} with a ${manualComposition} composition. The background is made of ${manualBackground}. `;
                          if(manualColor) prompt += `The color grading has ${manualColor}. `; 
                          if(manualProps) prompt += `Include these props in the scene: ${manualProps}.`;
                          handleOpenStyleModal(prompt);
                      }} className="mt-6 w-full py-3 bg-[#FF6E30] text-white font-bold rounded-xl hard-shadow border-2 border-gray-900 hover:bg-[#e55a2a]">Buat Gambar</button>
                      <button onClick={() => updateState({ styleMode: 'selection' })} className="font-bold text-gray-900 flex items-center gap-2 mt-4"><ArrowLeft className="w-4 h-4" /> Kembali</button>
                  </div>
              )}
            </div>
        )}
        
        {state.photoCurrentStep === 4 && (
          <div className="text-center py-20 step-card bg-white border-4 border-gray-900 p-8 rounded-2xl hard-shadow">
            <div className="animate-spin w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold">{state.loadingMessage || "AI sedang bekerja..."}</h2>
          </div>
        )}

        {state.photoCurrentStep === 5 && (
            <div className="step-card bg-white border-4 border-gray-900 p-8 rounded-2xl hard-shadow">
              <h2 className="text-3xl font-bold mb-6 text-center">Hasil Foto</h2>
              
              <div className="bg-blue-50 border-2 border-gray-900 rounded-xl p-4 mb-6 hard-shadow text-left">
                  <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-3">Detail Generasi:</h3>
                  <div className="flex flex-wrap gap-3">
                      {/* Style */}
                      <div className="bg-white px-3 py-1.5 rounded-lg border-2 border-gray-900 flex items-center gap-2">
                          <Camera className="w-4 h-4 text-[#FF6E30]" />
                          <span className="font-bold text-sm">{state.baseStyle}</span>
                      </div>

                      {/* Word Art */}
                      {state.wordArtActive && (
                          <div className="bg-white px-3 py-1.5 rounded-lg border-2 border-gray-900 flex items-center gap-2">
                              <span className="w-4 h-4 bg-gray-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold">W</span>
                              <span className="font-bold text-sm">
                                  {state.wordArtSource === 'custom' 
                                      ? 'Custom Text' 
                                      : (WORD_ART_STYLES[state.selectedWordArtStyle]?.name || 'Word Art')}
                              </span>
                          </div>
                      )}

                      {/* Doodle */}
                      {state.selectedDoodleStyle !== 'none' && (
                          <div className="bg-white px-3 py-1.5 rounded-lg border-2 border-gray-900 flex items-center gap-2">
                              <span className="w-4 h-4 bg-[#FF6E30] text-white rounded-full flex items-center justify-center text-[10px] font-bold">D</span>
                               <span className="font-bold text-sm">
                                  {DOODLE_STYLES[state.selectedDoodleStyle]?.name || 'Doodle'}
                              </span>
                          </div>
                      )}
                  </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {state.generatedImages.map((src, i) => (
                  <img key={i} src={src} className="w-full md:w-[48%] object-cover rounded-xl border-2 border-gray-900 hard-shadow cursor-pointer hover:scale-105 transition"
                    onClick={() => updateState({ selectedImageForEditing: src, photoCurrentStep: 6 })} />
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button onClick={resetApp} className="px-6 py-3 bg-[#ef4444] text-white border-2 border-gray-900 rounded-xl font-bold hard-shadow hover:bg-red-600">Buat Baru</button>
                <button onClick={() => updateState({ photoCurrentStep: 3 })} className="px-6 py-3 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-100 hard-shadow">Ganti Gaya</button>
                <button onClick={handleEditEffects} className="px-6 py-3 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-100 hard-shadow">Ganti Efek</button>
                <button onClick={handleGenerateImages} className="px-6 py-3 bg-[#FF6E30] text-white border-2 border-gray-900 rounded-xl font-bold hard-shadow hover:bg-[#e55a2a]">Buat Ulang</button>
              </div>
            </div>
        )}

        {state.photoCurrentStep === 6 && state.selectedImageForEditing && (
          <div className="step-card bg-white border-4 border-gray-900 p-8 rounded-2xl hard-shadow">
             <h2 className="text-3xl font-bold mb-6">Editor</h2>
             <img src={state.selectedImageForEditing} className="w-full max-h-[60vh] object-contain rounded-xl border-2 border-gray-900 hard-shadow" style={{ filter: `brightness(${brightness}%)` }} />
             <div className="mt-6">
               <label className="font-bold">Brightness</label>
               <input type="range" min="50" max="150" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full mt-2" />
             </div>
             <button onClick={handleDownload} className="w-full mt-6 bg-[#FF6E30] text-white font-bold py-3 rounded-xl border-2 border-gray-900 hard-shadow hover:bg-[#e55a2a]">Download</button>
             <div className="flex justify-between mt-6">
                <button onClick={() => updateState({ photoCurrentStep: 5 })} className="px-6 py-2 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-100 hard-shadow">Kembali ke Hasil</button>
                <button onClick={resetApp} className="px-6 py-2 bg-[#ef4444] text-white border-2 border-gray-900 rounded-xl font-bold hard-shadow hover:bg-red-600">Buat Baru</button>
             </div>
          </div>
        )}
        
        <div className="text-center py-12 border-t border-gray-200 mt-12">
            <p className="text-sm text-gray-500 mb-2 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Online Support & Informasi Affiliator (WhatsApp)
            </p>
            <p className="text-xl font-bold text-gray-900 tracking-tight mb-8">0851-5543-5939</p>
            <p className="text-sm text-gray-500 mb-2 font-medium tracking-wider uppercase">
                instagram | threads | tiktok
            </p>
            <p className="text-xl font-bold text-gray-900 tracking-tight">@hypecreative.id</p>
            <p className="text-xs text-gray-500 mt-6 max-w-md mx-auto leading-relaxed">
                &copy; 2024 Hype Creative Technology.<br />
                Dilarang merubah, memodifikasi, membagikan atau menjual kembali tools ini tanpa seijin Hype Creative Technology.
            </p>
        </div>
      </main>

      {/* --- IMPORTANT INFO MODAL --- */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border-4 border-gray-900 p-8 max-w-md w-full hard-shadow animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-8 h-8 text-[#FF6E30]" />
              Pemberitahuan Penting
            </h3>
            
            <div className="space-y-4 text-gray-700 text-sm leading-relaxed mb-6">
              <p>
                Sehubungan dengan kebijakan dan aturan terbaru dari Google Gemini, kami melakukan penyesuaian sistem dengan mengembangkan aplikasi lanjutan dari seri sebelumnya.
              </p>
              <p>
                Aplikasi yang saat ini Anda gunakan merupakan <b>Experimental Version</b>, yang disediakan sebagai solusi dan akan terus kami kembangkan serta sempurnakan secara bertahap.
              </p>
              <p>
                Seluruh perubahan, pembaruan fitur, dan penyesuaian sistem ke depannya sepenuhnya akan mengikuti regulasi dan kebijakan terbaru dari Google secara global.
              </p>
              <p className="font-semibold text-gray-900">
                Terima kasih atas pengertian, kepercayaan, dan dukungan Anda selama masa pengembangan ini.
              </p>
            </div>
            
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setDontShowAgain(!dontShowAgain)}>
               <div className={`w-6 h-6 border-2 border-gray-900 rounded flex items-center justify-center transition-colors ${dontShowAgain ? 'bg-gray-900 text-white' : 'bg-white'}`}>
                  {dontShowAgain && <CheckSquare className="w-4 h-4" />}
               </div>
               <label className="text-sm font-bold text-gray-800 select-none cursor-pointer">
                  Don't show again
               </label>
            </div>

            <button 
              onClick={handleCloseInfoModal}
              className="w-full py-3 bg-[#FF6E30] text-white font-bold rounded-xl border-2 border-gray-900 hard-shadow hover:bg-[#e55a2a] transition-all"
            >
              Mengerti & Lanjutkan
            </button>
          </div>
        </div>
      )}

      {/* ADDITIONAL SETTINGS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border-4 border-gray-900 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto hard-shadow">
            <h3 className="text-2xl font-bold mb-2">Sempurnakan Gaya:</h3>
            <p className="text-gray-600 mb-4 font-semibold">{state.baseStyle}</p>

            {/* NEW: GENERATION COUNT SELECTOR */}
            <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl">
                <label className="block text-sm font-bold text-gray-800 mb-2">Jumlah Variasi Foto Hasil Generasi</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map(num => (
                        <button 
                            key={num}
                            onClick={() => updateState({ generationCount: num })}
                            className={`flex-1 py-2 font-bold rounded-lg border-2 border-gray-900 transition-all ${state.generationCount === num ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-100'}`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div className="flex items-start gap-2 mt-3 text-xs text-yellow-800 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>Info: Semakin banyak foto yang dipilih, semakin besar penggunaan kuota/limit rate Gemini AI. Untuk performa optimal & hemat, disarankan 1 foto.</p>
                </div>
            </div>
            
            <label className="block text-sm font-medium text-gray-600">Tambahkan Detail Gaya (Opsional)</label>
            <textarea 
                className="w-full bg-gray-50 border-2 border-gray-900 rounded-xl py-2 px-3 text-gray-900 mt-1 hard-shadow" 
                rows={3}
                placeholder="Contoh: dengan efek uap panas, dengan tetesan air segar..."
                value={state.customStyleDetails || ''}
                onChange={(e) => updateState({ customStyleDetails: e.target.value })}
            ></textarea>
            
            {shouldShowTalentSection(state.baseStyle) && renderTalentSection()}

            <div className="space-y-6 mt-6">
              <div className="border-t pt-4">
                <h4 className="font-bold mb-2">Tambahkan Efek Word Art? (Opsional)</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button onClick={() => updateState({ wordArtActive: false })} className={`modal-option-button p-4 text-sm ${!state.wordArtActive ? 'selected bg-gray-900 text-white' : ''}`}>Tidak</button>
                  <button onClick={() => updateState({ wordArtActive: true })} className={`modal-option-button p-4 text-sm ${state.wordArtActive ? 'selected bg-gray-900 text-white' : ''}`}>Ya, Tambahkan</button>
                </div>

                {state.wordArtActive && (
                  <div className="mt-4">
                      {/* Language and Audience Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                              <label className="block text-xs font-bold mb-1 text-gray-600">Bahasa Iklan</label>
                              <select 
                                  className="w-full p-2 border-2 border-gray-900 rounded-xl text-sm bg-white"
                                  value={state.wordArtLanguage}
                                  onChange={(e) => updateState({ wordArtLanguage: e.target.value })}
                              >
                                  {AD_LANGUAGES.map(lang => (
                                      <option key={lang} value={lang}>{lang}</option>
                                  ))}
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-bold mb-1 text-gray-600">Target Audiens</label>
                              <select 
                                  className="w-full p-2 border-2 border-gray-900 rounded-xl text-sm bg-white"
                                  value={state.wordArtTargetAudience}
                                  onChange={(e) => updateState({ wordArtTargetAudience: e.target.value })}
                              >
                                  {TARGET_AUDIENCES.map(target => (
                                      <option key={target} value={target}>{target}</option>
                                  ))}
                              </select>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-2">
                          <button onClick={() => updateState({ wordArtSource: 'ai' })} className={`p-2 border rounded-xl text-xs font-bold ${state.wordArtSource === 'ai' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>Dibuatkan AI</button>
                          <button onClick={() => updateState({ wordArtSource: 'custom' })} className={`p-2 border rounded-xl text-xs font-bold ${state.wordArtSource === 'custom' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>Tulis Sendiri</button>
                      </div>

                      {state.wordArtSource === 'ai' && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {['all', 'retro', 'modern', 'handwritten'].map(f => (
                                <button key={f} 
                                    onClick={() => setWordArtFilter(f)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${wordArtFilter === f ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-300 hover:border-gray-900 hover:text-gray-900'}`}
                                >
                                    {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                      )}

                      {/* Custom Inputs Section */}
                      {state.wordArtSource === 'custom' && (
                          <div className="mb-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <div className="mb-2">
                                  <div className="flex justify-between items-center mb-1">
                                      <label className="text-xs font-bold text-gray-600">Headline</label>
                                      <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">BETA</span>
                                  </div>
                                  <input 
                                      className={`w-full p-2 border-2 rounded-xl mb-1 text-sm ${!checkWordCount(state.wordArtHeadline, 4).isValid ? 'border-red-500 bg-red-50' : 'border-gray-900'}`} 
                                      placeholder="Headline (Maks 4 kata)" 
                                      value={state.wordArtHeadline} 
                                      onChange={e => updateState({ wordArtHeadline: e.target.value })} 
                                  />
                                  <select 
                                      className="w-full p-2 border-2 border-gray-900 rounded-xl text-xs mt-1 bg-white"
                                      value={state.wordArtHeadlineLines}
                                      onChange={(e) => updateState({ wordArtHeadlineLines: e.target.value })}
                                  >
                                      <option value="auto">Auto (Default)</option>
                                      <option value="1">1 Baris</option>
                                      <option value="2">2 Baris</option>
                                      <option value="3">3 Baris</option>
                                      <option value="4">4 Baris</option>
                                  </select>
                                  {!checkWordCount(state.wordArtHeadline, 4).isValid && (
                                      <p className="text-xs text-red-500 font-bold mt-1">Maksimal 4 kata untuk Headline!</p>
                                  )}
                              </div>
                              <div className="mb-2">
                                  <div className="flex justify-between items-center mb-1">
                                      <label className="text-xs font-bold text-gray-600">Punchline</label>
                                      <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">BETA</span>
                                  </div>
                                  <input 
                                      className={`w-full p-2 border-2 rounded-xl mb-1 text-sm ${!checkWordCount(state.wordArtPunchline, 6).isValid ? 'border-red-500 bg-red-50' : 'border-gray-900'}`} 
                                      placeholder="Punchline (Maks 6 kata)" 
                                      value={state.wordArtPunchline} 
                                      onChange={e => updateState({ wordArtPunchline: e.target.value })} 
                                  />
                                  <select 
                                      className="w-full p-2 border-2 border-gray-900 rounded-xl text-xs mt-1 bg-white"
                                      value={state.wordArtPunchlineLines}
                                      onChange={(e) => updateState({ wordArtPunchlineLines: e.target.value })}
                                  >
                                      <option value="auto">Auto (Default)</option>
                                      <option value="1">1 Baris</option>
                                      <option value="2">2 Baris</option>
                                      <option value="3">3 Baris</option>
                                      <option value="4">4 Baris</option>
                                  </select>
                                  {!checkWordCount(state.wordArtPunchline, 6).isValid && (
                                      <p className="text-xs text-red-500 font-bold mt-1">Maksimal 6 kata untuk Punchline!</p>
                                  )}
                              </div>
                              
                              <button 
                                  onClick={handleAutoGenerateCopy} 
                                  disabled={isGeneratingCopy}
                                  className="w-full mt-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg border border-gray-300 flex items-center justify-center gap-2"
                              >
                                  {isGeneratingCopy ? (
                                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                      <Wand2 className="w-3 h-3" />
                                  )}
                                  Auto Generate Copy (Creative Copywriter)
                              </button>
                          </div>
                      )}

                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1">
                        {Object.entries(WORD_ART_STYLES)
                            .filter(([k, v]) => k !== 'none' && (wordArtFilter === 'all' || v.category === wordArtFilter))
                            .map(([key, style]) => (
                          <button key={key} onClick={() => updateState({ selectedWordArtStyle: key })} 
                            className={`modal-option-button !min-h-0 !p-2 !text-xs flex flex-col items-center justify-center gap-1 border-2 border-gray-900 rounded-xl ${state.selectedWordArtStyle === key ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}>
                              <span className="font-bold">{style.name}</span>
                          </button>
                        ))}
                      </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-bold mb-2">Tambahkan Efek Doodle? (Opsional)</h4>
                
                <div className="flex flex-wrap gap-2 mb-3">
                    {['all', 'cute', 'artistic', 'abstract'].map(f => (
                        <button key={f} 
                            onClick={() => setDoodleFilter(f)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${doodleFilter === f ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-300 hover:border-gray-900 hover:text-gray-900'}`}
                        >
                            {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1">
                    {Object.entries(DOODLE_STYLES)
                        .filter(([k, v]) => doodleFilter === 'all' || v.category === doodleFilter)
                        .map(([key, style]) => (
                      <button key={key} onClick={() => updateState({ selectedDoodleStyle: key })} 
                        className={`modal-option-button !min-h-0 !p-2 !text-xs flex flex-col items-center justify-center gap-1 border-2 border-gray-900 rounded-xl ${state.selectedDoodleStyle === key ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}>
                          <span className="font-bold">{style.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button onClick={() => setShowModal(false)} className="px-6 py-2 font-bold text-gray-900 border-2 border-gray-900 rounded-xl hover:bg-gray-100 hard-shadow">Batal</button>
              <button onClick={() => { 
                  if (state.wordArtActive && state.wordArtSource === 'custom') {
                      if (!checkWordCount(state.wordArtHeadline, 4).isValid || !checkWordCount(state.wordArtPunchline, 6).isValid) {
                          alert("Periksa kembali jumlah kata Headline (max 4) atau Punchline (max 6)!");
                          return;
                      }
                  }
                  setShowModal(false); 
                  if (state.selectedDoodleStyle === 'korean-art') {
                      setShowKawaiiModal(true);
                  } else {
                      handleGenerateImages(); 
                  }
              }} className="px-6 py-2 bg-[#FF6E30] text-white font-bold rounded-xl border-2 border-gray-900 hard-shadow hover:bg-[#e55a2a]">Buat Gambar</button>
            </div>
          </div>
        </div>
      )}
      
      {showKawaiiModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border-4 border-gray-900 p-8 max-w-md w-full hard-shadow text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Efek Korean Art (Kawaii)</h3>
            <p className="text-gray-600 mb-6">Apakah Anda ingin mengubah subjek produk menjadi karakter kawaii (dengan mata, tangan, kaki) seperti di referensi?</p>
            <div className="flex justify-center gap-4">
                <button onClick={() => { updateState({ makeSubjectKawaii: false }); setShowKawaiiModal(false); handleGenerateImages(); }} className="px-4 py-2 border-2 border-gray-900 rounded-xl font-bold hover:bg-gray-100 hard-shadow text-sm">Tidak, Biarkan Asli</button>
                <button onClick={() => { updateState({ makeSubjectKawaii: true }); setShowKawaiiModal(false); handleGenerateImages(); }} className="px-4 py-2 bg-[#FF6E30] text-white border-2 border-gray-900 rounded-xl font-bold hard-shadow hover:bg-[#e55a2a] text-sm">Ya, Ubah Jadi Kawaii</button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl border-4 border-gray-900 max-w-sm hard-shadow">
            <h3 className="text-xl font-bold text-red-600 mb-2">Terjadi Kesalahan</h3>
            <p className="mb-4">{error}</p>
            <button onClick={() => setError(null)} className="px-4 py-2 bg-gray-900 text-white rounded-xl hard-shadow">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}