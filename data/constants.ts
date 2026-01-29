

export const CATEGORIES = [
  'Makanan & Minuman', 'Fashion & Aksesori', 'Kosmetik & Skincare', 
  'Perhiasan & Luxury', 'Elektronik & Gadget', 'Produk Rumah Tangga', 
  'Herbal & Kesehatan', 'Mainan & Anak', 'Lainnya', 'Isi Sendiri'
];

// --- WORD ART SETTINGS ---
export const AD_LANGUAGES = [
  'Indonesia (Casual/Gaul)',
  'Indonesia (Formal/Profesional)',
  'Indonesia (Soft/Puitis)',
  'English (Modern)',
  'English (Professional)',
  'Jawa (Lokal)'
];

export const TARGET_AUDIENCES = [
  'Umum (General)',
  'Gen Z (Trendy & Fun)',
  'Millennials (Modern & Active)',
  'Profesional / Bisnis',
  'Ibu Rumah Tangga / Family',
  'Pecinta Kuliner (Foodies)',
  'Beauty Enthusiast',
  'Gamer / Tech Savvy'
];

// --- 1. TRENDY & AESTHETIC ---
export const ADV_STYLES_TRENDY = [
  'Danish Pastel Room', 
  'Y2K Liquid Chrome', 
  'Dreamy Soft Glow', 
  'Dark Academia Desk', 
  'Fairycore Forest', 
  'Cyberpunk Neon', 
  'Golden Hour Shadows', 
  'Underwater Ethereal', 
  'Disco Glitter Party', 
  'Abstract Memphis'
];

// --- 2. STUDIO & CLEAN ---
export const ADV_STYLES_STUDIO = [
  'Studio Clean', 'Hard Light & Geometric Shadow', 'Monochrome / B&W', 
  'Reflection / Mirror Shot'
];

// --- 3. NATURAL & LIFESTYLE (UPDATED) ---
export const ADV_STYLES_NATURAL = [
  'Natural & Bright', 
  'Rustic Natural', 
  'Korean Cafe Aesthetic', 
  'Lifestyle Sosial Media', 
  'Aesthetic Minimalis', 
  'Cozy Home Diary', 
  'Korean Aesthetic Desk'
];

// --- 4. POP & RETRO ---
export const ADV_STYLES_POP = [
  'Pop Color / High Saturation', 'Pop Grafis (Grid/Checkers)', 
  'Flatlay Grafis (Hard Light)', 'Piknik Retro (Hard Light)', 
  'Retro / Vintage Film Look', 'Flat Pop Icon',
  'Miniature World', 'World Tour Diorama', 'Fantasy Floating Island',
  'Glass Terrarium', 'Lego Brick Land', 'Papercraft Pop-Up',
  'Isometric 3D Room', 'Retro Pop Tile Studio', 'Kitchen Diorama',
  'Surreal Adventure Bottle', "Nature's Biosphere"
];

// --- 5. CINEMATIC & MOODY ---
export const ADV_STYLES_CINEMATIC = [
  'Dark & Moody', 'Cinematic / Filmic Lighting', 'Play with Shadow', 
  'Sunlight & Shadow Play', 'Smoke / Vapor Effect'
];

// --- 6. DYNAMIC ACTION (UPDATED) ---
export const ADV_STYLES_DYNAMIC = [
  'Splash Shot (Cairan)', 
  'Action Shot (Padat)', 
  'Levitation / Floating', 
  'Vivid & Icy Burst', 
  'Splash Vortex & Levitasi'
];

// --- 7. EDITORIAL & LUXURY (UPDATED) ---
export const ADV_STYLES_EDITORIAL = [
  'Luxury Premium', 
  'Luxe Floral Editorial', 
  'Aesthetic Stone Tray', 
  'Texture Focus (fabric, leather)', 
  'Conceptual / Editorial'
];

// --- 8. SPECIFIC (FOOD & NICHE) ---
export const ADV_STYLES_SPECIFIC = [
  'Flat Lay', 'Creator Workspace POV', 'POV Cafe Workspace', 
  'Food Styling Professional'
];

// --- 9. TALENT / MODEL (Defined separately for the grid) ---
export const TALENT_MODEL_STYLES = [
  'Full model', 
  'Hand-in-Frame', 
  'Half body', 
  'Reviewer Style', 
  '90s Lens Style', 
  'Ice Cooler (Hand-in-Frame)', 
  'Floating POV Style', 
  'Model Pop Color (Gaya Referensi)',
  'Pop Up Angle (Gaya Referensi)', 
  'Aesthetic Mirror Selfie', 
  'Faceless OOTD Focus',
  'Monochrome Bag Pop', 
  'Dynamic Street Snap', 
  'Mid-Demo Motion', 
  'Urban Freeze Motion',
  'JDM Street Style', 
  'Neon Light Trails',
  
  // Product-in-Use: Vintage & Urban
  '90s Flash Party Style', 
  'Retro Diner Date Style', 
  'Old Money Aesthetic Style',
  'Analog Film Grain Style', 
  'Subway Commute Style', 
  'Rooftop Golden Hour Style',
  'Concrete Street Style', 
  'Night City Bokeh Style', 
  'Picnic Date Style', 
  'Art Gallery Minimalist Style',
  
  // Pinterest Aesthetic
  'Airport Jetsetter Style', 
  'Flower Market Style', 
  'Luxury Hotel Lobby Style',
  'Vintage Convertible Style', 
  'Coffee Shop Work Style', 
  'Escalator Motion Style',
  'Grocery Run Aesthetic Style', 
  'Tennis Court Sporty Style', 
  'Library Dark Academia Style',
  'Rainy Car Window Style',
  
  // Retro Analog Vibes
  'Kodak Gold Memories Style', 
  'Cinestill Night Style', 
  'Polaroid Flash Style',
  'Lomo Vignette Style', 
  'Disposable Camera Style', 
  'Super 8 Roadtrip Style',
  'Expired Film Leak Style', 
  'Classic Noir BW Style', 
  'Fisheye 90s Style',
  'VHS Glitch Style'
];

// Styles that trigger talent logic / UI
export const STYLES_WITH_TALENT = [
  ...TALENT_MODEL_STYLES,
  // Added Pop & Retro Styles that use talent
  'Pop Grafis (Grid/Checkers)',
  'Piknik Retro (Hard Light)',
  'Flatlay Grafis (Hard Light)',
  'Retro / Vintage Film Look',
  'Pop Color / High Saturation'
];

// This object maps the section titles to the arrays above
export const STYLE_CATEGORIES: Record<string, string[]> = {
  'Trending & Aesthetic (Pinterest)': ADV_STYLES_TRENDY,
  'Studio & Clean': ADV_STYLES_STUDIO,
  'Natural & Lifestyle': ADV_STYLES_NATURAL,
  'Pop & Retro': ADV_STYLES_POP,
  'Cinematic & Moody': ADV_STYLES_CINEMATIC,
  'Dynamic Action': ADV_STYLES_DYNAMIC,
  'Editorial & Luxury': ADV_STYLES_EDITORIAL,
  'Khusus (Food & Niche)': ADV_STYLES_SPECIFIC
};

// Styles that trigger talent logic (Prompt Utils)
export const TALENT_STYLES = TALENT_MODEL_STYLES;

export const WORD_ART_STYLES: Record<string, {name: string, category: string}> = {
  'none': { name: 'Tanpa Word Art', category: 'all' },
  'fun-retro': { name: 'Groovy Retro', category: 'retro' },
  'retro-collage-zine': { name: '90s Grunge Collage', category: 'retro' },
  'pop-art-comic': { name: 'Pop Art Comic', category: 'retro' },
  'mid-century-sign': { name: '50s Motel Sign', category: 'retro' },
  'disco-stripes': { name: '70s Disco Stripes', category: 'retro' },
  'arcade-neon': { name: '80s Arcade Wireframe', category: 'retro' },
  'psychedelic-poster': { name: 'Psychedelic Poster', category: 'retro' },
  'bold-foodie-poster': { name: 'Bold Foodie Poster', category: 'retro' },
  'retro-sticker': { name: 'Retro 90s Sticker', category: 'retro' },
  'pixel-art': { name: '8-Bit Pixel Art', category: 'retro' },
  'vintage-typewriter': { name: 'Vintage Typewriter', category: 'retro' },
  'bubble-outline': { name: 'Bubble Outline', category: 'retro' },
  '80s-metal-band': { name: '80s Heavy Metal', category: 'retro' }, // New
  
  'bold-modern': { name: 'Bold Modern Headline', category: 'modern' },
  'minimalist-soft-sans': { name: 'Minimalist Soft Sans', category: 'modern' },
  'minimal-clean': { name: 'Clean Minimalist', category: 'modern' },
  'editor-ui': { name: 'Editor UI Aesthetic', category: 'modern' },
  'cinematic-glow': { name: 'Cinematic Glow', category: 'modern' },
  'film-subtitle': { name: 'Film Subtitle', category: 'modern' },
  'neon-cyber': { name: 'Neon Cyberpunk', category: 'modern' },
  'glitch-art': { name: 'Digital Glitch', category: 'modern' },
  'y2k-chrome': { name: 'Y2K Liquid Chrome', category: 'modern' },
  'vaporwave-statue': { name: 'Vaporwave Aesthetic', category: 'modern' },
  'art-deco-gold': { name: 'Art Deco Luxury', category: 'modern' },
  'tech-startup-sans': { name: 'Tech Startup Sans', category: 'modern' }, // New

  'handwritten-labels': { name: 'Handwritten Labels', category: 'handwritten' },
  'playful-interactive': { name: 'Playful Interactive', category: 'handwritten' },
  'social-script': { name: 'Social Media Script', category: 'handwritten' },
  'elegant-serif-mix': { name: 'Elegant Serif Mix', category: 'handwritten' },
  'artisanal-groovy': { name: 'Artisanal Groovy', category: 'handwritten' },
  'natural-script': { name: 'Natural Script', category: 'handwritten' },
  'cute-pastel-3d': { name: 'Cute Pastel 3D', category: 'handwritten' },
  'doodle-sketch-text': { name: 'Doodle Sketch Text', category: 'handwritten' },
  'soft-serif-italic': { name: 'Soft Serif Italic', category: 'handwritten' },
  'handwritten-marker': { name: 'Cute Marker', category: 'handwritten' },
  'cloud-bubble': { name: 'Cloud Bubble', category: 'handwritten' },
  'embossed-label': { name: 'Label Maker Tape', category: 'handwritten' },
  'rubber-stamp': { name: 'Vintage Rubber Stamp', category: 'handwritten' },
  'brush-calligraphy': { name: 'Brush Calligraphy', category: 'handwritten' } // New
};

export const DOODLE_STYLES: Record<string, {name: string, category: string}> = {
  'none': { name: 'Tanpa Doodle', category: 'all' },
  'korean-art': { name: 'Korean Art (Kawaii)', category: 'cute' },
  'kidcore-y2k': { name: 'Kidcore / Y2K Sticker', category: 'cute' },
  'cartoon-overlay': { name: 'Cartoon Overlay', category: 'cute' },
  'character': { name: 'Character', category: 'cute' },
  'sticker-pack': { name: 'Sticker Pack', category: 'cute' },
  'comic-book': { name: 'Comic Book', category: 'cute' },
  'interactive': { name: 'Interactive', category: 'cute' },
  'grime-art': { name: 'Grime Art / Melt', category: 'artistic' },
  'scribble-animation': { name: 'Scribble Energy', category: 'artistic' },
  'surreal-pop': { name: 'Surreal Pop Art', category: 'artistic' },
  'horror-vacui': { name: 'Doodle Horror Vacui', category: 'artistic' },
  'digital-collage': { name: 'Digital Collage', category: 'artistic' },
  'line-art-people': { name: 'Line Art People', category: 'artistic' },
  'graffiti-tag': { name: 'Graffiti Tag', category: 'artistic' },
  'botanical-line': { name: 'Botanical Line', category: 'artistic' },
  'chalk-texture': { name: 'Chalk Texture', category: 'artistic' },
  'cosmic-sparkle': { name: 'Cosmic Sparkle', category: 'artistic' },
  'white-outline': { name: 'White Outline', category: 'abstract' },
  'outline': { name: 'Outline', category: 'abstract' },
  'shape-line': { name: 'Shape n Line', category: 'abstract' },
  'neon-glow': { name: 'Neon Glow', category: 'abstract' },
  'blueprint-tech': { name: 'Blueprint Tech', category: 'abstract' }
};

export const LOADING_MESSAGES = [ 
  "📸 Sedang menata pencahayaan...", 
  "💡 Mengatur komposisi frame...", 
  "🎨 Menambahkan detail akhir...", 
  "✨ Hampir selesai..."
];

export const STYLE_DESCRIPTIONS: Record<string, string> = {
  // 1. TRENDY & AESTHETIC (PINTEREST)
  'Danish Pastel Room': 'Warna pastel lembut ala interior Skandinavia yang manis.',
  'Y2K Liquid Chrome': 'Estetika tahun 2000-an dengan efek metalik cair yang futuristik.',
  'Dreamy Soft Glow': 'Efek cahaya lembut (soft focus) yang mimpi dan romantis.',
  'Dark Academia Desk': 'Meja belajar klasik dengan nuansa gelap, buku tua, dan misterius.',
  'Fairycore Forest': 'Suasana hutan ajaib dengan cahaya peri dan elemen alam.',
  'Cyberpunk Neon': 'Lampu neon futuristik dengan warna pink dan biru yang kontras.',
  'Golden Hour Shadows': 'Bayangan panjang dramatis dari cahaya matahari sore keemasan.',
  'Underwater Ethereal': 'Efek bawah air yang tenang dengan pembiasan cahaya magis.',
  'Disco Glitter Party': 'Kilauan glitter dan lampu pesta disko yang meriah.',
  'Abstract Memphis': 'Bentuk geometris abstrak warna-warni ala desain Memphis 80-an.',

  // 2. STUDIO & CLEAN
  'Studio Clean': 'Tampilan studio profesional yang bersih, rapi, dan fokus penuh pada produk.',
  'Hard Light & Geometric Shadow': 'Cahaya tajam dengan bayangan geometris yang artistik dan modern.',
  'Monochrome / B&W': 'Klasik dan abadi dengan nuansa hitam putih yang dramatis dan elegan.',
  'Reflection / Mirror Shot': 'Tampilan elegan dengan pantulan cermin yang memberikan kesan mewah.',

  // 3. NATURAL & LIFESTYLE
  'Natural & Bright': 'Cerah alami seakan disinari matahari pagi yang menyegarkan.',
  'Rustic Natural': 'Sentuhan alam pedesaan dengan tekstur kayu dan elemen organik yang hangat.',
  'Korean Cafe Aesthetic': 'Suasana kafe Korea yang minimalis, manis, dan sangat instagramable.',
  'Lifestyle Sosial Media': 'Gaya santai ala influencer yang cocok banget buat feed sosmed kekinian.',
  'Aesthetic Minimalis': 'Simpel, bersih, dan menenangkan mata. Less is more.',
  'Cozy Home Diary': 'Suasana rumah yang hangat, nyaman, dan bikin betah.',
  'Korean Aesthetic Desk': 'Meja kerja rapi ala vlog belajar Korea yang produktif dan estetik.',

  // 4. POP & RETRO
  'Pop Color / High Saturation': 'Warna-warni yang \'jreng\' dan berani, bikin mata langsung melirik.',
  'Pop Grafis (Grid/Checkers)': 'Latar kotak-kotak atau grid retro yang fun, bold, dan kekinian.',
  'Flatlay Grafis (Hard Light)': 'Foto dari atas dengan penataan rapi dan bayangan yang tegas.',
  'Piknik Retro (Hard Light)': 'Vibes piknik jadul di bawah matahari terik yang ceria dan penuh warna.',
  'Retro / Vintage Film Look': 'Efek kamera analog jadul yang nostalgik dan berkarakter unik.',
  'Flat Pop Icon': 'Gaya ilustrasi pop art 3D yang unik, ikonik, dan surreal.',
  'Miniature World': 'Dunia liliput dimana produkmu jadi raksasa di antara orang-orang mini.',
  'World Tour Diorama': 'Keliling dunia dalam bentuk diorama mini yang detail dan memukau.',
  'Fantasy Floating Island': 'Pulau melayang di awan, penuh imajinasi dan keajaiban layaknya dongeng.',
  'Glass Terrarium': 'Taman kecil di dalam kaca yang cantik, asri, dan organik.',
  'Lego Brick Land': 'Dunia yang terbuat dari balok mainan plastik warna-warni yang playful.',
  'Papercraft Pop-Up': 'Seni potongan kertas berlapis yang unik seperti buku cerita pop-up.',
  'Isometric 3D Room': 'Ruangan 3D imut dilihat dari sudut atas, seperti game simulasi kehidupan.',
  'Retro Pop Tile Studio': 'Studio dengan ubin warna-warni pastel yang retro dan stylish banget.',
  'Kitchen Diorama': 'Dapur mini yang imut, penuh warna pastel, dan menggemaskan.',
  'Surreal Adventure Bottle': 'Petualangan surealis yang menjadikan produkmu pusat dunia imajinasi.',
  'Nature\'s Biosphere': 'Ekosistem alam mini yang hidup harmonis di dalam atau sekitar produk.',

  // 5. CINEMATIC & MOODY
  'Dark & Moody': 'Gelap, misterius, dan penuh emosi yang mendalam.',
  'Cinematic / Filmic Lighting': 'Pencahayaan dramatis layaknya adegan dalam film layar lebar.',
  'Play with Shadow': 'Permainan bayangan tangan atau objek yang artistik dan bikin penasaran.',
  'Sunlight & Shadow Play': 'Cahaya matahari alami yang menembus celah, menciptakan pola bayangan indah.',
  'Smoke / Vapor Effect': 'Efek asap atau uap yang menambah kesan mistis, segar, dan premium.',

  // 6. DYNAMIC ACTION
  'Splash Shot (Cairan)': 'Cipratan air atau cairan yang beku dalam waktu, terlihat sangat segar!',
  'Action Shot (Padat)': 'Momen aksi dinamis benda padat yang tertangkap sempurna.',
  'Levitation / Floating': 'Produk melayang di udara, anti gravitasi dan terlihat magis.',
  'Vivid & Icy Burst': 'Ledakan kesegaran es yang dingin, tajam, dan menyegarkan.',
  'Splash Vortex & Levitasi': 'Pusaran air yang mengangkat produk dengan epik dan bertenaga.',

  // 7. EDITORIAL & LUXURY
  'Luxury Premium': 'Kemewahan kelas atas yang elegan, mahal, dan eksklusif.',
  'Luxe Floral Editorial': 'Romantis dan mewah dengan hiasan bunga-bunga indah yang bermekaran.',
  'Aesthetic Stone Tray': 'Tatakan batu alam yang memberikan kesan spa yang tenang dan natural.',
  'Texture Focus (fabric, leather)': 'Menonjolkan detail tekstur kain atau kulit yang berkualitas tinggi.',
  'Conceptual / Editorial': 'Konsep seni yang unik dan \'nyeni\' banget, seperti majalah mode high-end.',

  // 8. SPECIFIC
  'Flat Lay': 'Foto dari atas, menata semua elemen dengan presisi dan keseimbangan.',
  'Creator Workspace POV': 'Sudut pandang kreator di meja kerjanya yang inspiratif dan produktif.',
  'POV Cafe Workspace': 'Sudut pandang orang pertama saat \'nugas\' santai di kafe.',
  'Food Styling Professional': 'Penataan makanan yang menggugah selera bak koki profesional.',

  // TALENT / MODEL
  'Full model': 'Menampilkan model seluruh badan untuk konteks pemakaian penuh.',
  'Hand-in-Frame': 'Hanya tangan model yang masuk frame, memberikan sentuhan manusia.',
  'Half body': 'Model terlihat setengah badan, fokus pada interaksi produk.',
  'Reviewer Style': 'Gaya review produk ala influencer yang meyakinkan.',
  '90s Lens Style': 'Gaya lensa lebar 90an dengan flash (Makan/Minum Candid).',
  'Ice Cooler (Hand-in-Frame)': 'Tangan memegang minuman dingin yang segar banget.',
  'Floating POV Style': 'Sudut pandang tangan memegang produk melayang di udara.',
  'Model Pop Color (Gaya Referensi)': 'Model dengan latar warna pop yang kontras dan fashion banget.',
  'Pop Up Angle (Gaya Referensi)': 'Sudut unik yang menonjol dan tidak biasa.',
  'Aesthetic Mirror Selfie': 'Selfie di cermin yang estetik ala OOTD kekinian.',
  'Faceless OOTD Focus': 'Fokus pada outfit dan produk tanpa menampilkan mata/dahi.',
  'Monochrome Bag Pop': 'Tas dengan gaya monokrom yang pop dan stylish.',
  'Dynamic Street Snap': 'Foto jalanan yang dinamis dan candid.',
  'Mid-Demo Motion': 'Sedang memperagakan penggunaan produk secara natural.',
  'Urban Freeze Motion': 'Gerakan beku di tengah kesibukan kota urban.',
  'JDM Street Style': 'Gaya jalanan Jepang yang raw dan berkarakter.',
  'Neon Light Trails': 'Jejak cahaya neon malam yang futuristik dan cepat.',
  '90s Flash Party Style': 'Pesta 90an dengan flash kamera yang hard dan raw.',
  'Retro Diner Date Style': 'Kencan romantis di diner retro yang nostalgik.',
  'Old Money Aesthetic Style': 'Gaya orang kaya lama yang klasik dan sophisticated.',
  'Analog Film Grain Style': 'Tekstur butiran film analog yang memberikan kesan vintage.',
  'Subway Commute Style': 'Gaya candid di kereta bawah tanah yang urban.',
  'Rooftop Golden Hour Style': 'Suasana sore hari di atap gedung dengan cahaya keemasan.',
  'Concrete Street Style': 'Jalanan beton urban yang industrial dan modern.',
  'Night City Bokeh Style': 'Malam kota dengan latar lampu bokeh yang cantik.',
  'Picnic Date Style': 'Kencan piknik romantis di taman yang asri.',
  'Art Gallery Minimalist Style': 'Suasana galeri seni yang minimalis dan bersih.',
  'Kodak Gold Memories Style': 'Kenangan hangat dengan tone warna khas Kodak Gold.',
  'Cinestill Night Style': 'Suasana malam sinematik dengan tone khas Cinestill.',
  'Polaroid Flash Style': 'Kilatan cahaya khas foto instan Polaroid.',
  'Lomo Vignette Style': 'Efek vignette Lomo yang unik dan artistik.',
  'Disposable Camera Style': 'Kesan raw dan spontan dari kamera sekali pakai.',
  'Super 8 Roadtrip Style': 'Perjalanan seru dengan gaya film Super 8 jadul.',
  'Expired Film Leak Style': 'Efek bocoran cahaya film kadaluarsa yang artsy.',
  'Classic Noir BW Style': 'Hitam putih Noir klasik yang penuh drama.',
  'Fisheye 90s Style': 'Lensa cembung ala video musik 90an yang unik.',
  'VHS Glitch Style': 'Efek gangguan kaset VHS yang retro dan edgy.'
};