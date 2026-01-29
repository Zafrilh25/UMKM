import { AppState } from '../types';

// --- HELPER FUNCTIONS ---

const getDoodlePromptAddition = (isOverlay = false, forceStyle: string | null = null, state: AppState) => {
    const overlayPrefix = isOverlay ? "After creating the base image, overlay it" : "";
    const style = forceStyle || state.selectedDoodleStyle; 
    
    switch (style) {
        case 'interactive':
            return `${overlayPrefix} with illustrative hand-drawn doodle elements that creatively interact with the product. For example, doodles representing ingredients flowing towards or swirling around the product, or simple characters reacting to it. The style is playful yet clean, using a limited color palette derived from the product or background. Ensure the doodles feel integrated and enhance the product's story, not just placed randomly.`;
        case 'shape-line':
             return `${overlayPrefix} with minimalist, clean, hand-drawn doodle elements like geometric shapes (circles, squares), simple lines, and sparkles. Use primarily white or a single accent color. The doodles should be strategically placed to highlight key features or add a touch of elegance and visual interest without overwhelming the product.`;
        case 'character':
            return `${overlayPrefix} by incorporating cute, simple, hand-drawn characters (like faces, small animals, or abstract beings) interacting with or reacting to the product. The characters should have a distinct, consistent illustration style (e.g., thick outlines, simple features) and use a playful color palette. Position them naturally within the composition, perhaps peeking from behind the product or expressing joy/curiosity towards it.`;
        case 'outline':
             return `${overlayPrefix} by enhancing the image with simple, clean, hand-drawn outline doodles that trace or emphasize parts of the product or its surrounding elements. Use a thin, consistent line weight, typically in white or black, to create a subtle, illustrative layer that adds definition and a touch of artistic flair without obscuring details.`;
        case 'korean-art':
            let prompt = `${overlayPrefix} by incorporating cute, simple, hand-drawn kawaii elements inspired by Korean art style references. This includes:
            - Small, simple line-art doodles (like sparkles ✨, music notes 🎶, hearts ❤️, simple lines, 'Woo', 'Happy').
            - Cute, simple hand-drawn characters (like small smiling faces 😊, suns ☀️, animals 🐰) interacting with or reacting to the product.
            - Playful hand-drawn text labels or speech bubbles (e.g., 'HAPPY', 'Hi', 'Yum', 'Cheer') using a bubbly, rounded, or cute handwritten font.
            - Some text MUST be in Korean (e.g., '행복', '맛있는', '가입', '오늘').
            The elements must be composed aesthetically, similar to the reference images, creating a busy but cute and balanced composition. Use a mix of white, black, and pastel accent colors (like yellow, pink, baby blue).`;
            
            if (state.makeSubjectKawaii) {
                prompt += `
                **CRITICAL:** Also, transform the main product itself into a kawaii character. Give the product:
                - Simple, cute cartoon eyes (like ovals, dots, or '^^').
                - A small, simple mouth (like a 'w', 'o', or '3').
                - Simple, thin, "stick-figure" style arms and legs, often wearing gloves or shoes.
                - Sometimes add simple blush marks (like ovals or lines) on its 'cheeks'.
                The character should look alive and happy, interacting with its environment (e.g., holding something, waving, lifting weights, wearing headphones).`;
            }
            return prompt;
        
        case 'line-art-people':
            return `${overlayPrefix} with minimalist, thin, single-line art illustrations of people interacting with the scene (e.g., sitting at a table, holding a coffee, etc.), as seen in the references. The style is clean, simple, and 'sketch-like', meant to add a human presence. The line color MUST be **solid white**.`;
        case 'sticker-pack':
            return `${overlayPrefix} with bold, cartoon-like, illustrative doodles, as seen in the references. **CRITICAL:** These doodles MUST have a **thick, solid white outline border** around them, making them look exactly like die-cut stickers. The doodle fill should use a limited, bold color palette (like black or red). Style is graphic and chunky.`;
        case 'comic-book':
            return `${overlayPrefix} with illustrative doodles of people or characters in a comic book style, as seen in the references. **CRITICAL:** The style MUST have a **thick, solid black outline** AND a **solid, opaque white fill**. This makes the characters "pop" from the background. May also include speech bubbles in the same style.`;
        case 'neon-glow':
            return `${overlayPrefix} with glowing, neon-style doodle lines. The lines should look like illuminated light tubes in bright colors like neon pink, electric blue, or cyan. Add glowing scribbles, arrows, or abstract shapes that frame the product. Vibe is futuristic and nightlife.`;
        case 'botanical-line':
            return `${overlayPrefix} with elegant, fine-line botanical illustrations. Draw delicate leaves, vines, or flowers intertwining with or framing the product. The style should be organic, sophisticated, and clean, using thin lines (white or black) without heavy fill.`;
        case 'graffiti-tag':
            return `${overlayPrefix} with edgy, urban street-style graffiti tags and doodles. Include spray paint textures, drips, arrows, and bold, wild lettering style shapes. Vibe is cool, youthful, and energetic.`;
        case 'blueprint-tech':
            return `${overlayPrefix} with technical blueprint-style markings. Add measurement lines, grid patterns, technical arrows, and data overlay elements in white or cyan. Vibe is engineered, precise, and high-tech.`;
        case 'cosmic-sparkle':
            return `${overlayPrefix} with dreamy, cosmic doodles. Include hand-drawn stars, planets, crescent moons, and constellations scattered around the product. Add magical sparkle effects. Vibe is mystical and dreamy.`;
        case 'chalk-texture':
            return `${overlayPrefix} with white chalk-style doodles, as if drawn on a blackboard. The lines should have a rough, dusty chalk texture. Include handwritten cafe-style menu elements or rustic arrows. Vibe is artisanal and cafe-like.`;
        case 'grime-art':
            return `${overlayPrefix} with a **"Grime Art" / Streetwear Graffiti** style.
            **CRITICAL INTERACTION:** Draw thick, cartoon-style **melting drips** (like slime or wax) flowing *down* from the top or sides of the product.
            **ELEMENTS:** Add "zombie skin" textures, oozing slime, or exposed cartoon eyeballs/teeth interacting directly with the product's surface.
            **COLOR:** Use neon, high-contrast colors (Slime Green, Hot Pink, Electric Purple) with heavy black outlines.
            **VIBE:** Edgy, streetwear fashion, rebellious.`;
        case 'scribble-animation':
            return `${overlayPrefix} with a high-energy **"Scribble Animation"** style.
            **CRITICAL INTERACTION:** Draw rough, energetic, hand-drawn **scribble lines (spirals, zig-zags, speed lines)** that physically *wrap around* or spiral *behind* the product to convey motion and power.
            **ELEMENTS:** Add glowing "electric" bolts or impact bursts emanating from the product.
            **TEXT:** Include sketchy, hand-written motivational words (e.g., "POWER", "FAST", "GO") floating near the product.
            **VIBE:** Music video, sports commercial, high voltage.`;
        case 'surreal-pop':
            return `${overlayPrefix} with a **"Surreal Pop Art Illustration"** style.
            **CRITICAL INTERACTION:** Create a collage-like scene where **flat, solid-colored 2D vector elements** physically interact with the 3D real photo.
            **SCENARIO:** For example, giant 2D cartoon hands *holding* the real product, or the product resting inside a 2D vector cloud or mouth.
            **STYLE:** Clean lines, solid bold colors (no shading), and absurd/dreamlike combinations.
            **VIBE:** Modern surrealism, artistic advertising, quirky.`;
        case 'horror-vacui':
            return `${overlayPrefix} with a **"Doodle Art / Horror Vacui"** style (Mr. Doodle inspired).
            **CRITICAL INTERACTION:** Fill the **ENTIRE negative space and background** *surrounding* the product with a dense, interlocking pattern of tiny black-and-white cartoon monsters, faces, and shapes.
            **CONSTRAINT:** The doodles should appear to be crowding *around* the product and peeking from behind it, creating a "packed" feeling, but **MUST NOT cover** the main product details.
            **STYLE:** Black thick lines on white (or vice versa), continuous line drawing feel.`;
        case 'cartoon-overlay':
            return `${overlayPrefix} with a **"Mixed Media Cartoon Overlay"** style.
            **CRITICAL INTERACTION:** Insert fully shaded, colorful **cartoon characters** (like from a modern TV show) into the real scene.
            **ACTION:** The characters MUST be *actively using, holding, hugging, or looking at* the product. They should have shadows that match the photo's lighting to look somewhat integrated.
            **STYLE:** Complex shading (not just outlines), vibrant colors, expressive faces.
            **VIBE:** Roger Rabbit style, playful, character-driven.`;
        case 'digital-collage':
            return `${overlayPrefix} with a **"Digital Scrapbook Collage"** aesthetic.
            **CRITICAL INTERACTION:** Apply a **'ripped paper' effect** to the edges of the product image or place the product on a torn paper texture.
            **ELEMENTS:** Layer realistic textures like pieces of **washi tape** holding the product corners, torn notebook paper with notes, and receipt scraps *over* or *behind* the product.
            **TYPOGRAPHY:** Use "Ransom Note" style letters (cut from magazines) for any text.
            **VIBE:** DIY, memory keeping, textured, analog.`;
        case 'white-outline':
            return `${overlayPrefix} with an **"Aesthetic White Outline"** / Minimalist Scribble style.
            **CRITICAL INTERACTION:** Trace the key contours and edges of the product with a **simple, dashed, or imperfect white brush stroke**.
            **ELEMENTS:** Add small, delicate white doodles (stars, sparkles, hearts, cursive lines) floating *around* the product to highlight it.
            **STYLE:** Minimalist, Instagram-story aesthetic, clean.`;
        case 'kidcore-y2k':
            return `${overlayPrefix} with a **"Kidcore / Cyber Y2K"** Sticker Art aesthetic.
            **CRITICAL INTERACTION:** Decorate the scene with a cluttered mess of digital stickers that appear to be **stuck ONTO the product** or floating in a chaotic cloud around it.
            **ELEMENTS:** Rainbows, smiley faces, butterflies, pixel hearts, flip phones, Tamagotchis, and bubbly glossy text.
            **VIBE:** 2000s teen magazine, bright, messy, nostalgic, maximalist.`;
        default:
            return "**POSITION:** The AI should determine the most creative and aesthetic placement.";
    }
};

const getWordArtLineBreakPrompt = (text: string, lineKey: string, styleKey: string) => {
    const tightStyles = ['fun-retro', 'bold-modern', 'playful-interactive', 'social-script', 'bubble-outline', 'bold-foodie-poster', 'minimalist-soft-sans', 'elegant-serif-mix', 'artisanal-groovy', 'glitch-art', 'neon-cyber', 'cute-pastel-3d', 'y2k-chrome', 'retro-sticker', 'pixel-art', 'cloud-bubble', 'retro-collage-zine', 'pop-art-comic', 'disco-stripes', 'psychedelic-poster', 'mid-century-sign', '80s-metal-band'];
    const looseStyles = ['natural-script', 'minimal-clean', 'cinematic-glow', 'doodle-sketch-text', 'soft-serif-italic', 'vintage-typewriter', 'handwritten-marker', 'vaporwave-statue', 'rubber-stamp', 'art-deco-gold', 'tech-startup-sans', 'brush-calligraphy'];
    const noStackStyles = ['handwritten-labels', 'editor-ui', 'film-subtitle', 'embossed-label'];

    if (noStackStyles.includes(styleKey)) return "";

    let spacingInstruction = "";
    if (tightStyles.includes(styleKey)) spacingInstruction = "The stacked lines **MUST have EXTREMELY TIGHT, almost touching or slightly overlapping vertical line spacing (jarak antar baris sangat-sangat rapat)**.";
    else if (looseStyles.includes(styleKey)) spacingInstruction = "The stacked lines **MUST have natural, slightly loose, and readable line spacing**.";

    switch (lineKey) {
        case '1': return `**MANDATORY LAYOUT RULE:** The text "${text}" **MUST remain on ONE SINGLE LINE**. **DO NOT** break it into multiple lines. Keep it horizontal and continuous.`;
        case '2': return `**MANDATORY LAYOUT RULE:** You **MUST break/split** the text "${text}" into exactly **TWO (2) lines** (stacked vertically). ${spacingInstruction}`;
        case '3': return `**MANDATORY LAYOUT RULE:** You **MUST break/split** the text "${text}" into exactly **THREE (3) lines** (stacked vertically). ${spacingInstruction}`;
        case '4': return `**MANDATORY LAYOUT RULE:** You **MUST break/split** the text "${text}" into exactly **FOUR (4) lines** (stacked vertically). ${spacingInstruction}`;
        default: 
            if (tightStyles.includes(styleKey) || looseStyles.includes(styleKey)) {
                return `**CRITICAL COMPOSITION (Stacking):** If the text "${text}" contains more than one word, you **MUST stack the words vertically** (one word per line). ${spacingInstruction}`;
            }
            return "";
    }
};

const getWordArtPositionPrompt = (positionKey: string) => {
    switch (positionKey) {
        case 'top-center':
            return "**CRITICAL COMPOSITION (Placement):** The text block MUST be placed at the **TOP-CENTER** of the image.";
        case 'middle-center':
            return "**CRITICAL COMPOSITION (Placement):** The text block MUST be placed in the **MIDDLE-CENTER** of the image.";
        case 'bottom-center':
            return "**CRITICAL COMPOSITION (Placement):** The text block MUST be placed at the **BOTTOM-CENTER** of the image.";
        case 'random':
        default:
            return "**CRITICAL COMPOSITION (Placement):** The text placement should be **Otomatis (Default)**, meaning the AI should choose the most creative and aesthetic position based on the style and photo composition.";
    }
};

const getWordArtStylePrompt = (text: string, styleKey: string, colorInstruction: string, source: 'ai' | 'custom') => {
    switch (styleKey) {
        case 'fun-retro': return `Incorporate the text "${text}" as a large, **psychedelic groovy headline**. The font must be **extremely bold, 'liquid', 'bouncy', and psychedelic** (like the "Keep on Truckin'", "Stolen Moon", or "NEXT LEVEL" font styles), with letters that look like they are melting or flowing together. **CRITICAL COMPOSITION (Placement):** The composition can be dynamically warped, distorted, or arched. Think retro artist. ${colorInstruction}`;
        case 'handwritten-labels': return `Incorporate the text "${text}". **CRITICAL INSTRUCTION:** Create handwritten labels based on the text. Split by commas if present, otherwise treat as single label. Font Style: clean, thin, cursive or script style. Placement: Place labels aesthetically around the product, perhaps with arrows or circles. ${colorInstruction}`;
        case 'bold-modern': return `Incorporate the text "${text}" as a large, dominant, clean, bold, modern headline. The font MUST be a heavy sans-serif (like Helvetica Bold or Nike's own font), in all-caps. **CRITICAL COMPOSITION:** Large, top-centered, with whitespace. ${colorInstruction}`;
        case 'playful-interactive': return `Incorporate the text "${text}" as playful, bouncy text. The font should be fun and rounded. **CRITICAL COMPOSITION:** The text block **MUST be playfully warped, distorted, and bent to literally **wrap around** (mengitari) the contours and shape of the product**. ${colorInstruction}`;
        case 'social-script': return `Incorporate the text "${text}" as a casual, friendly headline using a brush script or handwritten-style font. **CRITICAL COMPOSITION:** Dynamic, tilted or curved. ${colorInstruction}`;
        case 'bubble-outline': return `Incorporate the text "${text}" as a fun, playful headline using a 'bubble' font with a thick, clean outline. The font should be rounded, puffy, and cartoony. **CRITICAL COMPOSITION:** Playful, tilted, arched. ${colorInstruction}`;
        case 'bold-foodie-poster': return `As a retro typography artist, incorporate the text "${text}" as a large, dominant headline. The font must be a **super bold, heavy, chunky, slightly-rounded sans-serif** (like 'The Cake Club' reference). **CRITICAL COMPOSITION:** Bold and slightly tilted. It MUST have a **strong, hard drop shadow** behind the text for a 3D pop effect. ${colorInstruction}`;
        case 'minimalist-soft-sans': return `Incorporate the text "${text}" using a **clean, bold, and soft rounded sans-serif font** (like the 'Soyo Matcha' or 'Casa Coco' references). **CRITICAL COMPOSITION:** Clean, minimalist, and aesthetic. Unconventional but balanced placement with ample negative space. ${colorInstruction}`;
        case 'elegant-serif-mix': return `Incorporate the text "${text}" using a sophisticated combination of two font styles: a **high-contrast, elegant Serif font** (Didone style) for main words, and a **flowing, thin, calligraphic Script font** for connecting words. **CRITICAL COMPOSITION:** Elegant and dynamic, potentially overlapping the subject. ${colorInstruction}`;
        case 'artisanal-groovy': return `Incorporate the text "${text}" using a **bold, unique, 70s-style groovy font**. The font must have **strong character, 'swirly' ligatures, and liquid-like curves**. **CRITICAL COMPOSITION:** Creative and dynamic, overlapping subject. **SHADOW:** Strong, hard drop shadow. ${colorInstruction}`;
        case 'natural-script': return `Incorporate the text "${text}" as a headline using a **modern, casual, handwritten brush script font**. The font MUST look natural, flowing, and elegant (like 'Good in all things'). **CRITICAL COMPOSITION:** Clean and centered. ${colorInstruction}`;
        case 'minimal-clean': return `Incorporate the text "${text}" using a **super thin, ultra-minimalist Sans-Serif font** (like Helvetica Light or Futura). **CRITICAL TYPOGRAPHY:** The letters MUST have **very wide kerning (tracking)** (jarak antar huruf sangat lebar). **CRITICAL COMPOSITION:** Place the text small and discreetly in a corner or centered at the bottom/top with lots of breathing room (whitespace). Vibe: High-end fashion magazine or luxury perfume ad. ${colorInstruction}`;
        case 'editor-ui': return `Incorporate the text "${text}" designed to look like a **trendy Photo Editor UI or Music Player interface overlay**. **STYLE:** Use a clean, small, system-style Sans-Serif font. **DECORATION:** Add graphical UI elements like a 'Play' button (▶), a thin progress bar line, or small icons like '♡' or 'Share' next to the text. **COMPOSITION:** The text should look like a floating interface layer over the photo. ${colorInstruction}`;
        case 'cinematic-glow': return `Incorporate the text "${text}" as a **dreamy, cinematic movie title**. **FONT:** Use a classic, elegant Serif font. **EFFECT (CRITICAL):** The text MUST be have a **strong, soft, dreamy outer glow (haliation)** diffusion effect. The text should look like it is glowing light. **COMPOSITION:** Centered, cinematic scaling. Vibe: Nostalgic movie poster. ${colorInstruction}`;
        case 'film-subtitle': return `Incorporate the text "${text}" styled exactly like **vintage film subtitles**. **FONT:** Use a standard, slightly pixelated or soft Sans-Serif font. **COLOR:** The text MUST be **Yellow (or White)** with a **subtle black outline or drop shadow** for readability. **COMPOSITION:** Placed at the **bottom center** of the image, like a movie scene. Vibe: Retro cinema.`;
        case 'cute-pastel-3d': return `Incorporate the text "${text}" using a **soft, puffy, 3D 'Marshmallow' font**. **STYLE:** The letters should look inflated, rounded, and soft. **COLOR:** Use soft **Pastel Colors** (baby pink, mint green, lilac) with soft shading to show dimension. **COMPOSITION:** Bouncy, curved, and cute placement. Vibe: Kawaii and sweet.`;
        case 'doodle-sketch-text': return `Incorporate the text "${text}" as if it were **hand-sketched with a messy pencil or marker**. **FONT:** Scratchy, imperfect, handwritten, artistic scribbles. **STYLE:** Add scribble underlines or circles around the text. **COMPOSITION:** Casual and organic placement, like a note on a sketchbook. ${colorInstruction}`;
        case 'neon-cyber': return `Incorporate the text "${text}" as **glowing neon light tubes**. **STYLE:** The text should look like physical glass neon signs. **COLOR:** High contrast, electric colors (Hot Pink, Cyan, Electric Purple) that cast a colored glow onto the background/product. **COMPOSITION:** Center stage or framing the product. Vibe: Cyberpunk, Night Market.`;
        case 'glitch-art': return `Incorporate the text "${text}" with a **modern digital glitch effect**. **STYLE:** The text should appear distorted, sliced, or pixelated. **EFFECT:** Add **Chromatic Aberration (RGB Split)** where the colors shift slightly (Red/Blue outlines). **FONT:** Bold, modern, tech-style Sans-Serif. Vibe: Edgy, streetwear, futuristic. ${colorInstruction}`;
        case 'soft-serif-italic': return `Incorporate the text "${text}" using a **delicate, italicized Serif font**. **STYLE:** The font should look elegant, whisper-thin, and high-fashion (like 'Vogue' or luxury editorial captions). **COMPOSITION:** Place it elegantly centered or slightly off-center with generous breathing room. Vibe: Dreamy, romantic, expensive. ${colorInstruction}`;
        case 'retro-sticker': return `Incorporate the text "${text}" designed to look like a **cute, retro 90s sticker**. **STYLE:** Use a bold, rounded, playful font. **EFFECT (CRITICAL):** The text MUST be have a **thick, solid WHITE die-cut border** (outline) surrounding the letters, making them look like a physical sticker stuck onto the photo. **COMPOSITION:** Slightly tilted or rotated for a playful scrapbook feel. Vibe: Y2K, Notebook aesthetic.`;
        case 'handwritten-marker': return `Incorporate the text "${text}" as if written with a **thick, cute permanent marker or highlighter**. **STYLE:** The font should be imperfect, hand-drawn, casual, and bold (like 'Marker Felt' or 'Comic Sans' but cooler). **COMPOSITION:** Casual placement, perhaps with a simple hand-drawn underline or doodle heart next to it. Vibe: Friendly, personal note. ${colorInstruction}`;
        case 'y2k-chrome': return `Incorporate the text "${text}" using a **Y2K aesthetic Liquid Chrome or Metallic font**. **STYLE:** The letters should look like melted silver or shiny liquid metal with high-contrast reflections. **SHAPE:** Sharp, tribal, or futuristic curves. **COMPOSITION:** Bold and centered. Vibe: Futuristic, Cyber, 2000s nostalgia.`;
        case 'pixel-art': return `Incorporate the text "${text}" using a **Retro 8-bit Pixel Art font**. **STYLE:** The letters should be blocky, jagged, and digital, like text from an old Gameboy or arcade game. **COMPOSITION:** Placed in the bottom center or corner, resembling a retro game UI or dialogue box. Vibe: Gaming, playful, digital. ${colorInstruction}`;
        case 'cloud-bubble': return `Incorporate the text "${text}" formed by **soft, fluffy white clouds** OR placed inside a **soft, puffy cloud-shaped speech bubble**. **STYLE:** Dreamy, airy, and soft. **COLOR:** White or soft pastel blue/pink. **COMPOSITION:** Floating in the upper part of the image (sky area) or near the product. Vibe: Ethereal, daydream.`;
        case 'vintage-typewriter': return `Incorporate the text "${text}" using a **classic, textured Vintage Typewriter font** (Courier style). **STYLE:** The letters should look like ink stamped onto paper - slightly uneven, textured, and raw. **COMPOSITION:** Minimalist placement, often in all-lowercase or sentence case. Vibe: Poetry, classic, dark academia. ${colorInstruction}`;
        case 'retro-collage-zine': return `Incorporate the text "${text}" in a **90s Grunge "Ransom Note" Collage style**. **TYPOGRAPHY:** Each letter should look like it was cut out from different magazines or newspapers (mixing Serif, Sans-Serif, Bold, Italic). **ELEMENTS (CRITICAL):** The letters should be placed on scraps of ripped paper backgrounds. Add strips of **washi tape** or clear tape holding the text down. **COMPOSITION:** Chaotic, tilted, and messy layout. Vibe: Punk Zine, DIY aesthetic.`;
        case 'pop-art-comic': return `Incorporate the text "${text}" in a **Roy Lichtenstein Pop Art Comic style**. **TYPOGRAPHY:** Bold, italicized, heavy comic book font (like 'Bang!', 'Pow!'). **ELEMENTS:** Place the text inside a **spiky explosion speech bubble** or a cloud bubble. Add a **Halftone Dot (Ben-Day dots)** pattern texture to the text fill or shadow. **COLOR:** Primary colors (Red, Yellow, Blue) with thick black outlines. Vibe: Retro comic book action.`;
        case 'embossed-label': return `Incorporate the text "${text}" as realistic **Retro Dymo Embossed Label Tape**. **STYLE:** The text appears as raised white plastic letters on a strip of shiny plastic tape (Red, Black, or Blue tape). **ELEMENTS:** The tape strip should look imperfect, slightly peeled at the edges, or stuck onto the product/background. **COMPOSITION:** If multiple words, use one long continuous strip or multiple strips stacked messily. Vibe: Vintage organization, analog.`;
        case 'mid-century-sign': return `Incorporate the text "${text}" inspired by **1950s Googie/Motel Roadside Signs**. **TYPOGRAPHY:** Retro script mixed with bold sans-serif geometric capitals. **ELEMENTS:** Place the text inside characteristic **retro shapes** (like kidneys, boomerangs, or diamonds). Add **starburst** or 'atomic' sparkles around it. **COLOR:** Pastel pink, teal, and cream with neon outlines. Vibe: Retro diner, atomic age.`;
        case 'vaporwave-statue': return `Incorporate the text "${text}" in a **Vaporwave / 80s Aesthetic style**. **TYPOGRAPHY:** Wide-spaced Serif font (like Times New Roman) or pixelated font. **ELEMENTS:** Add **Digital Glitch effects**, a retro grid horizon line, or a floating Greek statue bust graphic nearby. Maybe some Japanese text characters (Kanji) as decoration. **COLOR:** Soft gradient of Neon Pink to Cyan. Vibe: Nostalgic, internet retro, dreamy.`;
        case 'disco-stripes': return `Incorporate the text "${text}" using a **70s Retro Striped Typography style** (like the old CNN or IBM logo style, or 70s sports jerseys). **TYPOGRAPHY:** The letters are formed by 3 or 4 parallel lines. **COMPOSITION:** Curved or arched placement. **COLOR:** Warm sunset gradient (Red -> Orange -> Yellow) for the stripes. Vibe: Disco, retro sports, warm.`;
        case 'rubber-stamp': return `Incorporate the text "${text}" looking like a **Vintage Ink Rubber Stamp**. **STYLE:** The text texture must be **distressed, faded, and gritty** (like ink running low). It is NOT solid color. **ELEMENTS:** Enclose the text in a rough stamped circle, rectangle, or oval border. **COMPOSITION:** Slightly rotated/tilted to look hand-stamped. Vibe: Postal, artisanal, rustic.`;
        case 'arcade-neon': return `Incorporate the text "${text}" in an **80s Arcade Game / Synthwave Wireframe style**. **TYPOGRAPHY:** Glowing vector-style font (like 'Tron' or 'Battlezone'). **ELEMENTS:** Add a **'Scanline' filter effect** (horizontal lines) over the text to mimic an old CRT monitor. Add glowing grid lines in the background of the text. **COLOR:** Electric Blue, Magenta, or Neon Green grid. Vibe: Retro gaming, futuristic 80s.`;
        case 'art-deco-gold': return `Incorporate the text "${text}" in a luxurious **1920s Art Deco style** (Great Gatsby vibe). **TYPOGRAPHY:** Geometric, tall, thin sans-serif font with high waists. **ELEMENTS:** Decorate with **intricate, symmetrical gold geometric borders** or fan shapes framing the text. **COLOR:** Metallic Gold texture on Black or Dark Green. Vibe: Luxury, speakeasy, expensive.`;
        case 'psychedelic-poster': return `Incorporate the text "${text}" in a **60s Psychedelic Rock Poster style** (Wes Wilson style). **TYPOGRAPHY:** The letters must be **liquid, melting, and warped** to fit into a specific shape (like a wave or a bulb). They should flow into each other. **COMPOSITION:** The text block should look fluid and organic, filling negative space creatively. **COLOR:** High contrast, vibrating colors (e.g., Purple background with Orange text). Vibe: Trippy, concert poster, organic.`;
        case '80s-metal-band': return `Incorporate the text "${text}" in a **Heavy Metal Band Logo style**. **TYPOGRAPHY:** Aggressive, sharp, spiky, and symmetrical chrome lettering. **ELEMENTS:** Add metallic reflections, lightning bolts, or bat wings. **COLOR:** Silver Chrome with Black outline. Vibe: Rock, energetic, fierce.`;
        case 'tech-startup-sans': return `Incorporate the text "${text}" using a **Modern Tech Startup style**. **TYPOGRAPHY:** Geometric, friendly, rounded sans-serif font in all lowercase. **COMPOSITION:** Clean, left-aligned or centered with ample whitespace. **COLOR:** Electric Blue or vibrant purple gradient. Vibe: Innovative, app icon, modern.`;
        case 'brush-calligraphy': return `Incorporate the text "${text}" using a **Traditional Asian Brush Calligraphy style**. **TYPOGRAPHY:** Thick, expressive black ink strokes with visible brush texture and splatters. **COMPOSITION:** Vertical or dynamic diagonal placement. **COLOR:** Deep Sumi-e Black or Red Seal stamp color. Vibe: Artisanal, bold, cultural.`;
        default: return `Incorporate the text "${text}" as a large, groovy, retro headline. ${colorInstruction}`;
    }
};

const getWordArtPromptAddition = (state: AppState, isOverlay = false) => {
    const overlayPrefix = isOverlay ? "After creating the base image, overlay it" : "Incorporate";
    if (!state.wordArtActive) return "";

    const colorInstruction = state.wordArtColor === 'colorful' 
        ? "Use multiple, contrasting, solid colors for different words to make it pop. Do not use gradients."
        : "Use a single, bold, solid color (like white, yellow, or another bright/pop color) for the text. **Avoid using black text.** Do not use gradients.";
    
    let languageInstruction = "The text must be in Indonesian.";
    if (state.wordArtLanguage === 'inggris') {
        languageInstruction = "The text must be in English.";
    }
    const headline = state.wordArtHeadline.trim();
    const punchline = state.wordArtPunchline.trim();

    if (state.wordArtSource === 'custom') {
        if (!headline && !punchline) return "";
        let customPrompts = [];
        
        if (headline) {
            const headlineStyleKey = state.wordArtHeadlineStyle;
            const headlineLinesKey = state.wordArtHeadlineLines;
            const headlineStylePrompt = getWordArtStylePrompt(headline, headlineStyleKey, colorInstruction, 'custom'); 
            const headlineLineBreakPrompt = getWordArtLineBreakPrompt(headline, headlineLinesKey, headlineStyleKey); 
            const headlinePositionPrompt = getWordArtPositionPrompt('random');
            customPrompts.push(`1. Headline: ${headlineStylePrompt} ${headlineLineBreakPrompt} ${headlinePositionPrompt}`);
        }
        
        if (punchline) {
            const punchlineStyleKey = state.wordArtPunchlineStyle;
            const punchlineLinesKey = state.wordArtPunchlineLines;
            const punchlineStylePrompt = getWordArtStylePrompt(punchline, punchlineStyleKey, colorInstruction, 'custom');
            const punchlineLineBreakPrompt = getWordArtLineBreakPrompt(punchline, punchlineLinesKey, punchlineStyleKey);
            const punchlinePositionPrompt = getWordArtPositionPrompt('random');
            customPrompts.push(`2. Punchline: ${punchlineStylePrompt} ${punchlineLineBreakPrompt} ${punchlinePositionPrompt}`);
        }
        
        return `${overlayPrefix} text elements onto the image. ${languageInstruction}
        ${customPrompts.join('\n')}
        **Styling Rules:**
        * **Composition**: The composition of the text elements must be **dynamic, creative, and well-integrated** with the photo, **not just placed flatly or rigidly stacked**. Use **tilting, overlapping, or creative alignment** (seperti referensi 'Fritas' atau 'Plant Powered'). They must remain easy to read and understand.
        * **Size**: If both headline and punchline exist, the Headline ("${headline}") should generally be more prominent (larger) than the Punchline ("${punchline}").
        `;
    } else {
        const fullText = headline;
        if (!fullText) return "";
        
        const styleKey = state.selectedWordArtStyle;
        const stylePrompt = getWordArtStylePrompt(fullText, styleKey, colorInstruction, 'ai');
        const lineBreakPrompt = getWordArtLineBreakPrompt(fullText, 'auto', styleKey); 

        return `${overlayPrefix} ${stylePrompt} ${lineBreakPrompt} ${languageInstruction}`;
    }
};

// --- MAIN GENERATION FUNCTION ---

export const generateImagePrompts = (state: AppState): string[] => {
  const styleDescription = (state.selectedStyle && state.selectedStyle !== 'ReferenceSwap') 
    ? state.selectedStyle 
    : state.baseStyle;

  // Initial Generic Prompt
  let basePrompt = `Product photography of ${state.productDescription}. Style: ${styleDescription}.`;

  // --- SOLUSI 1: Mapping Bahasa & Deteksi Bayi ---
  const segmentMap: Record<string, string> = {
      'dewasa': 'Adult (25-40 years old)',
      'remaja': 'Teenager (16-24 years old)',
      'anak-anak': 'Child (6-12 years old)',
      'balita': 'Toddler (2-5 years old)',
      'bayi': 'Baby (0-1 years old)',
      'lansia': 'Elderly Person (60+ years old)'
  };
  const englishSegment = segmentMap[state.talentSegment] || 'Adult';
  const isBabyOrToddler = ['bayi', 'balita'].includes(state.talentSegment);
  
  // --- SOLUSI 2: Aksi Dinamis Adaptif untuk Bayi ---
  let dynamicAction = "";
  let dynamicActionShort = "";
  
  if (state.isWearable) {
      dynamicAction = `**WEARING** the product ("${state.productDescription}") as part of their outfit.`;
      dynamicActionShort = "wearing";
      if (isBabyOrToddler) {
          dynamicAction += " The product must be sized appropriately for a baby/toddler.";
      }
  } else {
      if (isBabyOrToddler) {
          dynamicAction = `**POSED NEXT TO** or **gently touching** the product ("${state.productDescription}"). The baby looks cute and curious about the product.`;
          dynamicActionShort = "with";
      } else {
          dynamicAction = `**HOLDING** or interacting with the product ("${state.productDescription}") naturally.`;
          dynamicActionShort = "holding";
      }
  }
  
  if (state.selectedStyle === 'ReferenceSwap' || state.baseStyle === 'Reference Swap Style') {
        const objectToReplace = state.objectToReplace || "object";
        const yourProduct = state.yourProductDescription || state.productDescription;
        
        let swapBasePrompt = `Task: Replace an object in a reference image with a new product while keeping the style.
        Reference Image (Image 1): Contains the style, lighting, composition, and background to be kept. The object to replace is "${objectToReplace}".
        Product Image (Image 2): Contains the user's product, which is "${yourProduct}".
        
        **CRITICAL INSTRUCTION:** This is the primary instruction. You MUST recreate the Reference Image (Image 1) **PERFECTLY**. 
        The **camera angle, composition, layout, lighting, and background MUST be an EXACT match**.
        The **ONLY** change allowed is replacing the object "${objectToReplace}" with "${yourProduct}".
        The final result should look identical to Image 1, just with the product swapped. Ensure the replacement is seamless and photorealistic.`;

        basePrompt = swapBasePrompt;
  } 
  else {
      // --- STANDARD GENERATION LOGIC ---
      let basePromptForGeneration = "";

      // --- OVERRIDE BASE PROMPT FOR POP & RETRO STYLES ---
      if (state.baseStyle === 'Pop Color / High Saturation') { 
          basePromptForGeneration = `Pop color style, high saturation, vibrant, hard lighting, strong shadows, against a solid bold color background. Product: ${state.productDescription}`; 
      }
      else if (state.baseStyle === 'Flatlay Grafis (Hard Light)') { 
          basePromptForGeneration = `A vibrant, pop-art inspired top-down flat lay photograph. The background MUST be a solid, bright, highly saturated color OR split into two contrasting bold colors. Use direct, hard studio lighting to create strong, sharp, and distinct shadows. The composition is dynamic.
    **CRITICAL INSTRUCTION for Composition:** The image MUST feature items artfully scattered, spilling, or floating around the main product. These items MUST be logically and contextually related to the main product.
    **Use this context:**
    - **Product:** ${state.productDescription}
    - **Category:** ${state.selectedCategory}
    **Logic for scattered items:**
    - If the product is a food/snack (e.g., 'kopi bubuk'), scatter its ingredients (e.g., 'biji kopi', 'daun mint') or the snack pieces themselves.
    - If the product is a bag (e.g., 'tas wanita'), scatter items typically found inside it (e.g., 'lipstick', 'kunci', 'notebook', 'airpods').
    - If the product is skincare (e.g., 'serum'), scatter its core ingredients (e.g., 'rose petals', 'water droplets').
    The overall feel is graphic, clean, and energetic.`;
      }
      
      // --- FRAMING / TALENT STYLES REFINEMENT ---
      else if (state.baseStyle === 'Hand-in-Frame') {
          basePromptForGeneration = `A professional "Hand-in-Frame" product shot (POV style).
          **CRITICAL COMPOSITION:** The frame MUST show **ONLY the hands** of the model holding or interacting with the product.
          **NEGATIVE CONSTRAINT:** NO faces, NO heads, NO full bodies visible. Focus entirely on the hands and the product.
          **ACTION:** The hands are naturally presenting the product ("${state.productDescription}") in the center.
          **VIBE:** Clean, minimal, focus on the product details.
          **LIGHTING:** Soft, high-key studio lighting.`;
      }
      else if (state.baseStyle === 'Reviewer Style') {
          basePromptForGeneration = `A "Tech/Product Influencer Review" style shot.
          **CRITICAL COMPOSITION:** The model is holding the product **forward towards the camera lens** (as if showing it to the viewer).
          **ACTION:** The model is making eye contact with the camera, with a friendly "check this out" gesture. One hand holds the product prominently in the foreground.
          **DEPTH:** Use a shallow depth of field. The product is sharp, the model's face is slightly softer but visible behind it.
          **BACKGROUND:** A blurred desk setup, studio background, or tech workspace.
          **VIBE:** Professional, engaging, YouTube thumbnail aesthetic.`;
      }
      else if (state.baseStyle === 'Half body') {
          basePromptForGeneration = `A professional "Lifestyle Portrait" (Half Body).
          **CRITICAL COMPOSITION:** The frame MUST show the model from the **WAIST UP**.
          **ACTION:** The model is posing naturally, holding the product ("${state.productDescription}") near their chest or shoulder, looking away or smiling gently (not aggressive eye contact).
          **VIBE:** Fashionable, aesthetic, soft lifestyle, less "tech review", more "daily use".
          **LIGHTING:** Natural, flattering soft light.`;
      }
      else if (state.baseStyle === 'Full model') {
          basePromptForGeneration = `A professional "Full Body" fashion/lifestyle shot.
          **CRITICAL COMPOSITION:** The frame MUST show the model from **HEAD TO TOE**.
          **CONSTRAINT:** The model's shoes/feet MUST be visible to ensure the full body is in the frame.
          **ANGLE:** Wide angle shot to capture the entire figure and the environment.
          **ACTION:** The model is standing, walking, or posing dynamically while wearing or holding the product ("${state.productDescription}").
          **SETTING:** A photorealistic environmental background suitable for the product.`;
      }
      else if (state.baseStyle === 'Floating POV Style') {
          basePromptForGeneration = `A creative "First Person View (POV)" floating product shot.
          **CRITICAL COMPOSITION:** The camera looks out at a blurred background (e.g., sky, street, nature).
          **ACTION:** The model's hands enter from the **bottom corners** of the frame, holding the product ("${state.productDescription}") up against the background.
          **EFFECT:** The product appears to be "floating" or suspended in the center of the frame, held by the hands.
          **VIBE:** Dreamy, airy, focused on the product against a scenic backdrop.`;
      }
      else if (state.baseStyle === 'Faceless OOTD Focus') {
          basePromptForGeneration = `A trendy "Faceless OOTD" aesthetic shot.
          **CRITICAL FRAMING:** The crop MUST be from the **NOSE DOWN to the WAIST/HIPS**.
          **VISIBLE:** The model's lips, chin, neck, torso, and outfit.
          **NOT VISIBLE:** The model's eyes, forehead, and hair top are CROPPED OUT.
          **FOCUS:** The product ("${state.productDescription}") is held or worn prominently in the center of the frame.
          **VIBE:** Mysterious, fashion-forward, Instagram aesthetic.`;
      }
      else if (state.baseStyle === 'Monochrome Bag Pop') {
          basePromptForGeneration = `A high-fashion "Monochrome Pop Color" editorial shot.
          **CRITICAL FRAMING:** Medium Close-Up. The frame MUST cut off at the model's eyes/forehead, but MUST SHOW the **nose tip, mouth, lips, chin, and neck** extending down to the waist. **DO NOT crop the mouth.**
          **SUBJECT:** The model is posing stylishly, holding or wearing the product ("${state.productDescription}") as the highlight.
          **STYLING:** The model is wearing a monochromatic outfit that matches the solid background color.
          **VIBE:** Bold, vibrant, editorial fashion, high-end commercial.`;
      }

      // --- MUKBANG STYLE (RENAMED TO 90s LENS STYLE) ---
      else if (state.baseStyle === '90s Lens Style' || state.baseStyle === 'Mukbang Style') {
            const drinkKeywords = ['minum', 'jus', 'kopi', 'teh', 'susu', 'botol', 'kaleng', 'gelas', 'drink', 'juice', 'coffee', 'tea', 'milk', 'bottle', 'can', 'sirup', 'syrup'];
            const isDrink = drinkKeywords.some(kw => state.productDescription.toLowerCase().includes(kw));

            if (isBabyOrToddler) {
                 basePromptForGeneration = `A candid "Baby Eating" photo.
                 **Subject:** Close up of a baby eating/drinking the product ('${state.productDescription}') with gusto.
                 **Expression:** Cheeks full, eyes wide with enjoyment, maybe a bit messy/cute.
                 **Lighting:** Bright, soft, high-key.
                 **Vibe:** Adorable, viral baby content.`;
            } else if (isDrink) {
                basePromptForGeneration = `A retro, "90s Wide Angle Lens" flash photography shot.
                **SUBJECT:** An extreme close-up of a person drinking the product ("${state.productDescription}").
                **CRITICAL BOTTLE RULE:** 
                1. The bottle/can/glass MUST be **OPEN**.
                2. **NEGATIVE CONSTRAINT:** NO BOTTLE CAP VISIBLE. The cap must be removed.
                3. Liquid should be visible or flowing.
                **ACTION:** The person is actively drinking, tilting the open bottle to their mouth.
                **STYLE:** Fisheye distortion, harsh on-camera flash, high contrast, candid party vibe.`;
            } else {
                basePromptForGeneration = `A retro "90s Wide Angle Lens" flash photography shot of a person eating "${state.productDescription}".
                **STYLE:** Shot with a wide-angle lens (fisheye effect) and direct flash.
                **ACTION:** The person is holding the food close to the lens, about to take a bite, mouth open.
                **VIBE:** Candid, energetic, retro 90s magazine aesthetic.`;
            }
      }

      // --- NATURAL & LIFESTYLE (Korean Aesthetic Desk - Fixed & Dreamy Soft Glow) ---
      else if (state.baseStyle === 'Korean Aesthetic Desk') {
        // FIX: Added specific instruction to place product clearly and use exact reference prompt
        basePromptForGeneration = `A clean, cozy, and productive **"Korean Aesthetic Desk"** workspace photography.
        **CRITICAL:** The product ("${state.productDescription}") is the **CENTRAL HERO** of the image, placed prominently on the desk. It must NOT be hidden by the laptop or books.
        **SETTING:** A white desk setup with a characteristic **white pegboard** on the wall organized with cute accessories (photos, mini shelves).
        **PROPS (MANDATORY):** A laptop (open/closed, showing a clean interface), a small vase of **white daisies**, a retro round alarm clock, and a stack of aesthetic pastel-colored books.
        **LIGHTING (CRITICAL):** Strong, warm natural **Golden Hour sunlight** streaming from the side, casting **long, soft shadows** across the desk surface.
        **VIBE:** Minimalist, studious, warm, 'studygram', organized, and very aesthetic.
        **COLOR PALETTE:** White, Beige, Light Wood, Soft Pastel accents.`;
      }
      else if (state.baseStyle === 'Dreamy Soft Glow') {
        basePromptForGeneration = `A dreamy, ethereal **"Soft Glow"** product photography of ${state.productDescription}.
        **EFFECT:** Heavy soft focus diffusion (Orton Effect) creating a heavenly halo around highlights.
        **LIGHTING:** Backlit by soft, hazy morning sunlight (contre-jour) creating a rim light on the product.
        **VIBE:** Romantic, nostalgic, memory-like, peaceful, and pastel-toned.
        **BACKGROUND:** Soft, undistracting, blurred light colors.`;
      }
      
      // --- POP & RETRO ---
      else if (state.baseStyle === 'Pop Grafis (Grid/Checkers)') {
            basePromptForGeneration = `Fotografi produk bergaya "Pop Grafis Retro" yang sangat vibrant dan stylized, terinspirasi dari estetika retro diner Korea atau K-Pop.
            -   Item retro (jika sesuai, misal: botol saus bergaya diner).
        **Nuansa Keseluruhan:** Enerjik, playful, bersih, retro, dan sangat grafis. Product: ${state.productDescription}`;
      }
      else if (state.baseStyle === 'Flat Pop Icon') {
          basePromptForGeneration = `A bold, graphic, and surreal **"Flat Pop Art Illustration"** style product photograph of ${state.productDescription}.
          **VISUAL STYLE (CRITICAL):** The image must look like a **high-end vector illustration or pop-art icon** brought to life in 3D.
          **SURFACE:** Extremely clean, matte textures. No reflections, no gloss (unless it's a specific material choice), just pure form.
          **LIGHTING (CRITICAL):** Use harsh, direct "Hard Light" that casts a **Long, Sharp, Dark Shadow** (Long Shadow trend). The shadow should be distinct and solid.
          **BACKGROUND (CRITICAL):** A **Solid, Matte, Vibrant Block Color** (e.g., Teal, Mustard Yellow, Brick Red, or Mint Green). No gradients, no patterns.
          **COMPOSITION:** Centered, iconic, and minimalist.
          **VIBE:** Witty, iconic, retro-modern, and visually satisfying.`;
      }
      else if (state.baseStyle === 'Aesthetic Minimalis') {
          basePromptForGeneration = "Aesthetic, minimalist composition with natural lighting and soft shadows. Include elements like Kinfolk magazine, a monstera leaf, or linen fabric to create a serene and sophisticated atmosphere. The color palette should be muted and earthy.";
      }

      // --- PINTEREST AESTHETIC STYLES ---
      else if (state.baseStyle === 'Airport Jetsetter Style') {
          basePromptForGeneration = `A trendy, aspirational **"Airport Jetsetter"** lifestyle photograph.
          **SETTING:** A modern airport departures terminal or lounge. Wide glass windows with airplanes visible in distance.
          **ACTION:** ${dynamicAction}
          **OUTFIT:** Comfy-chic travel wear (sweatsuit, trench coat, sunglasses).
          **VIBE:** Expensive travel, 'catch flights not feelings', clean, modern.`;
      }
      else if (state.baseStyle === 'Flower Market Style') {
          basePromptForGeneration = `A fresh, colorful **"Flower Market"** lifestyle photograph.
          **SETTING:** An outdoor street flower stall overflowing with buckets of fresh flowers (tulips, roses, daisies).
          **ACTION:** ${dynamicAction} in this setting.
          **LIGHTING:** Soft, diffused morning daylight. Fresh and airy.
          **VIBE:** Spring, romantic, European holiday, wholesome.`;
      }
      else if (state.baseStyle === 'Luxury Hotel Lobby Style') {
          basePromptForGeneration = `A sophisticated, high-end **"Luxury Hotel Lobby"** photograph.
          **SETTING:** A grand hotel lobby with marble floors, gold accents, crystal chandeliers, and plush velvet furniture.
          **ACTION:** ${dynamicAction} while waiting for an elevator or sitting in the lounge.
          **LIGHTING:** Warm, interior luxury lighting.
          **VIBE:** 'That Girl', wealthy, elegant, night out or business trip.`;
      }
      else if (state.baseStyle === 'Vintage Convertible Style') {
          const carAction = isBabyOrToddler ? "sitting safely on the leather car seat (car is stationary)" : `${dynamicAction} while enjoying the ride`;
          basePromptForGeneration = `A nostalgic, cinematic **"Vintage Convertible"** lifestyle photograph.
          **SETTING:** The model is inside a classic open-top vintage car (e.g., old Mercedes, Porsche).
          **BACKGROUND:** Blue sky, palm trees, or a scenic coastal road.
          **ACTION:** ${carAction}.
          **VIBE:** Old Hollywood, freedom, road trip, summer vacation.`;
      }
      else if (state.baseStyle === 'Coffee Shop Work Style') {
          const vibe = isBabyOrToddler ? "Cute baby snacking, relaxed" : "Freelancer, creative director, busy but aesthetic";
          const props = isBabyOrToddler ? "Baby bottle/snack, soft toy" : "Laptop (screen blurred), notebook";
          basePromptForGeneration = `A productive, aesthetic **"Coffee Shop Work"** lifestyle photograph.
          **SETTING:** A trendy cafe table with a latte with art and props.
          **PROPS:** ${props}.
          **ACTION:** ${dynamicAction}.
          **VIBE:** ${vibe}, 'work from anywhere'.`;
      }
      else if (state.baseStyle === 'Escalator Motion Style') {
          const setting = isBabyOrToddler ? "Modern elevator with glass walls or shopping mall walkway" : "Modern mall or subway station escalator with metal/glass rails";
          const action = isBabyOrToddler ? `sitting in a stylish stroller or standing safely, ${dynamicActionShort} the product` : `standing on the escalator, looking back`;
          basePromptForGeneration = `A dynamic, urban **"Escalator/Transit Motion"** photograph.
          **SETTING:** ${setting}.
          **SUBJECT:** The model is ${action}.
          **EFFECT:** Perspective lines leading the eye. Background might have slight motion blur.
          **VIBE:** City life, transit, modern architecture, candid.`;
      }
      else if (state.baseStyle === 'Grocery Run Aesthetic Style') {
          const action = isBabyOrToddler ? "sitting inside the shopping cart seat" : "pushing a cart or reaching for items";
          basePromptForGeneration = `A playful, colorful **"Grocery Run"** aesthetic photograph.
          **SETTING:** A supermarket aisle with colorful shelves of products (blurred).
          **SUBJECT:** The model is ${action}.
          **ACTION:** ${dynamicAction} as if they just picked it out.
          **LIGHTING:** Bright overhead fluorescent lighting (clean commercial look).
          **VIBE:** Daily routine, relatable, pop color, flash photography aesthetic.`;
      }
      else if (state.baseStyle === 'Tennis Court Sporty Style') {
          let courtOutfit = "Sporty chic (polo shirt, white sneakers)";
          if (state.talentGender === 'pria') {
              courtOutfit = "Sporty chic (polo shirt, tennis shorts, white sneakers)";
          } else {
              courtOutfit = "Sporty chic (pleated tennis skirt, polo, white sneakers)";
          }
          if (isBabyOrToddler) {
              courtOutfit = "Cute white baby sporty outfit";
          }
          basePromptForGeneration = `A sporty, preppy **"Tennis Court"** aesthetic photograph.
          **SETTING:** A green or clay tennis court with white lines.
          **OUTFIT:** ${courtOutfit}.
          **ACTION:** Taking a break, holding a racket and ${dynamicActionShort} the product.
          **LIGHTING:** Harsh, bright midday sun with strong shadows.
          **VIBE:** Activewear, healthy, country club, energetic.`;
      }
      else if (state.baseStyle === 'Library Dark Academia Style') {
          basePromptForGeneration = `A moody, intellectual **"Library Dark Academia"** photograph.
          **SETTING:** Between rows of tall wooden bookshelves filled with books.
          **LIGHTING:** Dim, warm, atmospheric light. Perhaps dust motes in a beam of light.
          **ACTION:** ${dynamicAction} quietly.
          **VIBE:** Mystery, knowledge, university, quiet luxury.`;
      }
      else if (state.baseStyle === 'Rainy Car Window Style') {
          basePromptForGeneration = `A moody, emotional **"Rainy Car Window"** cinematic photograph.
          **SETTING:** Inside a car at night or dusk.
          **FOREGROUND:** The car window glass is covered in rain droplets (bokeh water texture).
          **SUBJECT:** The model is inside the car, seen *through* the wet glass or sitting by the window.
          **ACTION:** Looking out pensively, ${dynamicActionShort} the product near the window/body.
          **LIGHTING:** City lights (red/orange/blue) blurring through the rain and glass.
          **VIBE:** Melancholic, music video aesthetic, safe inside, cozy.`;
      }

      // --- SPECIFIC / POV UPDATES ---
      else if (state.baseStyle === 'Creator Workspace POV') {
          basePromptForGeneration = `A high-quality top-down POV (Point of View) photography of a professional digital creator's workspace.
          **SUBJECT:** The Main Product ("${state.productDescription}") is the central focus, placed on the desk or held by hands (if appropriate).
          **PROPS:** Surrounded by arranged 'knolling' style creative gear: a mechanical keyboard, a professional camera with leather strap, a cup of black coffee, a notebook, and tech accessories.
          **VIBE:** Productive, professional, tech-savvy, moody, and organized.
          **TONE:** High contrast, desaturated cool tones, metallic greys, matte blacks, and rich leather browns.
          **LIGHTING:** Soft, diffused overhead lighting, no harsh glare.
          **ANGLE:** 90-degree top-down flat lay.`;
      }
      else if (state.baseStyle === 'POV Cafe Workspace') {
          basePromptForGeneration = `A trendy, aesthetic First-Person POV (Point of View) shot inside a cozy cafe.
          **PERSPECTIVE (CRITICAL):** Looking down (High Angle) at a wooden cafe table and the photographer's own legs/feet resting comfortably underneath the table.
          - **Legs:** Must be visible in the bottom frame, wearing stylish casual pants (like jeans, beige chinos) and clean lifestyle sneakers or loafers.
          **SUBJECT:** The product ('${state.productDescription}') is placed centrally on the wooden table, basking in natural light.
          **PROPS:** Aesthetically arranged around the product: a glass of iced latte or a cup of cappuccino, an open 'Kinfolk' style magazine with text/photos, reading glasses, and a vintage film camera or smartphone.
          **LIGHTING:** Bright, natural sunlight streaming from a nearby window, creating artistic, warm shadows on the wooden surface.
          **VIBE:** Relaxing, slow-living, 'work from cafe' lifestyle, warm and inviting.
          **COLOR TONE:** Warm wood tones, creamy whites, and soft natural colors.`;
      }
      else if (state.baseStyle === 'Food Styling Professional') {
          basePromptForGeneration = `A world-class "Food Styling Professional" photography shot.
          **SUBJECT:** The Main Product ("${state.productDescription}") is plated with extreme precision and artistry.
          **STYLING:** Use tweezers-level detail. Glistening glazes, fresh water droplets, perfect sear marks, or rising steam. The food looks appetizing and expensive.
          **PROPS:** Minimalist but premium cutlery, a linen napkin, and fresh raw ingredients (herbs, spices) scattered artistically in the background.
          **LIGHTING:** Soft, directional "Rembrandt" lighting from the side to enhance texture and volume.
          **ANGLE:** 45-degree angle (Diner's Eye) or Close-up Macro.
          **VIBE:** Michelin star, culinary magazine cover, sophisticated, mouth-watering.`;
      }
      else if (state.baseStyle === 'Flat Lay') {
          basePromptForGeneration = `A perfectly organized "Modern Flat Lay" photography.
          **ANGLE:** Strict 90-degree Top-Down view.
          **SUBJECT:** The product ("${state.productDescription}") is the hero in the center.
          **COMPOSITION:** "Knolling" style or balanced organic scattering. Objects are arranged with equal spacing and alignment.
          **PROPS:** Curated accessories relevant to the product category (e.g., if tech: cables, pens; if beauty: petals, brushes).
          **LIGHTING:** Soft, even, shadowless diffuse lighting (or very soft shadows). No harsh glare.
          **BACKGROUND:** A clean, matte solid color or a high-quality texture (marble, wood) that contrasts well.
          **VIBE:** Organized, clean, aesthetic, Pinterest-worthy.`;
      }

      // --- SET 1: VINTAGE & URBAN ---
      else if (state.baseStyle === '90s Flash Party Style') {
          const partyVibe = isBabyOrToddler ? "Baby Birthday Party with confetti and balloons" : "Youthful, sweaty, authentic, rebellious, grunge, and raw";
          const partyBackground = isBabyOrToddler ? "Colorful party decorations, soft bokeh" : "Blurred party scene, streamers, red cups, people dancing in the dark";
          
          basePromptForGeneration = `A high-energy, candid **"90s Flash Party"** vintage aesthetic photograph.
          **SUBJECT:** The model is at a lively house party/event, ${dynamicAction} casually.
          **LIGHTING:** Direct, harsh **on-camera flash** creating strong contrast, shiny skin texture, and a "red-eye" vibe (aesthetic).
          **VIBE:** ${partyVibe}.
          **BACKGROUND:** ${partyBackground}. Product: ${state.productDescription}`;
      }
      else if (state.baseStyle === 'Retro Diner Date Style') {
          const dinerVibe = isBabyOrToddler ? "Cute Family Outing, Nostalgic" : "Romantic, movie-like (Wong Kar-wai vibes), intimate";
          
          basePromptForGeneration = `A cinematic **"Retro Diner Date"** photograph.
          **SUBJECT:** The model is sitting in a red leather booth at an American-style diner, ${dynamicAction}.
          **LIGHTING:** Neon signs reflecting on the window, warm indoor lamps, cinematic teal and orange color grading.
          **VIBE:** ${dinerVibe}, cool.
          **PROPS:** Milkshake (or milk bottle) with straws, ketchup bottles, napkin dispenser on the table. Product: ${state.productDescription}`;
      }
      else if (state.baseStyle === 'Old Money Aesthetic Style') {
          let outfit = "White linen shirt, cable knit sweater over shoulders, chinos or tailored trousers"; 
          if (state.talentGender === 'wanita') {
               outfit = "White linen shirt, cable knit sweater over shoulders, tennis skirt or elegant trousers";
          }
          if (isBabyOrToddler) {
              outfit = "Classic knit baby romper, white socks";
          }
          const setting = isBabyOrToddler ? "Beautiful garden lawn or nursery" : "Country club, tennis court, or vintage convertible car";

          basePromptForGeneration = `A luxurious, quiet luxury **"Old Money Aesthetic"** lifestyle photograph.
          **SUBJECT:** The model is posing elegantly in a wealthy setting (${setting}) with the product ("${state.productDescription}").
          **LIGHTING:** Bright, sunny, natural daylight. Soft shadows.
          **VIBE:** Expensive, timeless, preppy, Ralph Lauren style, effortless wealth.
          **OUTFIT:** ${outfit}.`;
      }
      else if (state.baseStyle === 'Analog Film Grain Style') {
          basePromptForGeneration = `An artistic, moody **"Analog Film Photography"** style shot (Kodak Portra 400 emulation).
          **SUBJECT:** A candid, unposed portrait of the model with the product ("${state.productDescription}").
          **AESTHETIC:** Heavy film grain, soft focus, light leaks, and muted/nostalgic colors.
          **VIBE:** Indie movie, emotional, memory-like, raw, and imperfect.
          **BACKGROUND:** A nondescript bedroom with posters or a sunny field (golden hour).`;
      }
      else if (state.baseStyle === 'Subway Commute Style') {
          basePromptForGeneration = `A realistic, urban **"Subway Commute"** lifestyle photograph.
          **SUBJECT:** The model is standing or sitting in a subway/metro train carriage, holding/with the product ("${state.productDescription}").
          **BACKGROUND:** Subway tiles, metal handrails, blurred windows showing tunnel lights.
          **LIGHTING:** Fluorescent overhead tube lighting (slightly greenish/cool) mixed with motion blur of the train.
          **VIBE:** Daily life, authentic city living, busy.`;
      }
      else if (state.baseStyle === 'Rooftop Golden Hour Style') {
          basePromptForGeneration = `A breathtaking **"Rooftop Golden Hour"** pinterest-style photograph.
          **SUBJECT:** The model is on a city rooftop during sunset, holding the product ("${state.productDescription}") up against the sky/skyline.
          **LIGHTING:** Warm, golden, back-lit sun creating a silhouette effect and lens flares (sun stars).
          **BACKGROUND:** Out-of-focus city skyline, water tanks, horizon.
          **VIBE:** Freedom, summer evening, aspirational, beautiful.`;
      }
      else if (state.baseStyle === 'Concrete Street Style') {
          basePromptForGeneration = `A high-fashion, edgy **"Concrete Street Style"** photograph.
          **SUBJECT:** The model is posing against a raw concrete wall or brutalist architecture, showcasing the product ("${state.productDescription}").
          **AESTHETIC:** Minimalist, desaturated, cool grey tones, sharp focus.
          **VIBE:** Hypebeast, modern fashion editorial, cool, structured.
          **LIGHTING:** Soft overcast daylight (shadowless) or hard noon sun (strong shadows).`;
      }
      else if (state.baseStyle === 'Night City Bokeh Style') {
          basePromptForGeneration = `A moody, cinematic **"Night City Bokeh"** portrait.
          **SUBJECT:** The model is on a busy street at night, illuminated by shop windows or street lamps, holding the product ("${state.productDescription}").
          **BACKGROUND:** Beautiful, creamy bokeh of city car lights, traffic lights, and neon signs (circles of light).
          **LIGHTING:** Low key, moody, subject lit by a soft street light or neon glow.
          **VIBE:** Late night, mystery, romance, urban solitude.`;
      }
      else if (state.baseStyle === 'Picnic Date Style') {
          basePromptForGeneration = `A cute, cottagecore **"Picnic Date"** pinterest-style photograph.
          **SUBJECT:** The model is lying or sitting on a picnic blanket in a park, interacting with the product ("${state.productDescription}").
          **PROPS:** Gingham blanket, wicker basket, flowers, baguette, fruits.
          **LIGHTING:** Dappled sunlight filtering through tree leaves (soft shadows).
          **VIBE:** Whimsical, soft, nature-loving, spring/summer, relaxing.`;
      }
      else if (state.baseStyle === 'Art Gallery Minimalist Style') {
          basePromptForGeneration = `A clean, sophisticated **"Art Gallery"** minimalist photograph.
          **SUBJECT:** The model is standing in a white-walled art gallery or museum, looking at the product ("${state.productDescription}") like it is a piece of art.
          **BACKGROUND:** Large white walls, concrete floors, perhaps a blurred painting frame in the distance.
          **LIGHTING:** Soft, diffused, museum-quality track lighting.
          **VIBE:** Intellectual, quiet, expensive, modern art, clean girl aesthetic.`;
      }
      
      // --- SET 3: RETRO ANALOG ---
      else if (state.baseStyle === 'Kodak Gold Memories Style') {
          basePromptForGeneration = `A nostalgic, warm **"Kodak Gold 200"** film aesthetic photograph.
          **SETTING:** A sunny outdoor vacation spot (beach, park, or road trip).
          **ACTION:** ${dynamicAction}
          **FILM LOOK:** High saturation, warm yellow/golden undertones, noticeable grain, and soft highlights.
          **VIBE:** Happy memories, summer vacation, 90s family album feel, authentic.`;
      }
      else if (state.baseStyle === 'Cinestill Night Style') {
          basePromptForGeneration = `A cinematic, moody **"Cinestill 800T"** film aesthetic photograph taken at night.
          **SETTING:** A city street, gas station, or neon-lit diner exterior at night.
          **ACTION:** ${dynamicAction} under the lights.
          **FILM LOOK:** **Red Halation (glow)** around bright lights (CRITICAL), cool tungsten blue tones in shadows, cinematic grain.
          **VIBE:** Moody, atmospheric, movie still, urban exploration.`;
      }
      else if (state.baseStyle === 'Polaroid Flash Style') {
          basePromptForGeneration = `A candid, vintage **"Polaroid Instant Film"** photograph.
          **SETTING:** An indoor party, bedroom, or casual hangout spot.
          **ACTION:** ${dynamicAction} looking directly at the camera.
          **FILM LOOK:** Soft focus, slightly washed-out colors, **Harsh Direct Flash**. 
          **COMPOSITION (CRITICAL):** Full frame image, edge-to-edge coverage. **NO white border/frame**, **NO dark vignette**. The image should look like a scanned Polaroid but cropped to fill the whole frame.
          **VIBE:** Intimate, raw, unposed, memory keepsake.`;
      }
      else if (state.baseStyle === 'Lomo Vignette Style') {
          basePromptForGeneration = `An artistic, high-contrast **"Lomography (Lomo LC-A)"** toy camera style photograph.
          **SETTING:** A vibrant, colorful street scene or graffiti wall.
          **ACTION:** ${dynamicAction}.
          **FILM LOOK:** Extreme color saturation, cross-processed colors (unnatural tints), and soft edges.
          **COMPOSITION (CRITICAL):** Bright and clear edge-to-edge. **REMOVE the typical heavy dark vignette**. Keep the Lomo colors but ensure the image is full frame and visible to the corners.
          **VIBE:** Experimental, edgy, street photography, artistic.`;
      }
      else if (state.baseStyle === 'Disposable Camera Style') {
          basePromptForGeneration = `A fun, chaotic **"Disposable Camera"** party snapshot.
          **SETTING:** A crowded room, house party, or backstage.
          **ACTION:** ${dynamicAction} with energy.
          **FILM LOOK:** Cheap lens distortion, chromatic aberration, harsh flash, grainy texture, high contrast.
          **VIBE:** YOLO, youth culture, authentic, messy, fun.`;
      }
      else if (state.baseStyle === 'Super 8 Roadtrip Style') {
          basePromptForGeneration = `A dreamy, nostalgic **"Super 8 Movie Film"** still frame.
          **SETTING:** A road trip stop, open field, or vintage car interior.
          **ACTION:** ${dynamicAction} in slow motion.
          **FILM LOOK:** Low resolution, soft focus, warm sepia/orange grading, motion blur, and film scratches/dust.
          **VIBE:** Dreamy, memory, freedom, indie movie intro.`;
      }
      else if (state.baseStyle === 'Expired Film Leak Style') {
          basePromptForGeneration = `An unpredictable, artsy **"Expired 35mm Film"** photograph.
          **SETTING:** Any outdoor setting with strong sun.
          **ACTION:** ${dynamicAction}.
          **FILM LOOK:** **Strong Light Leaks** (orange/red burns overlaying the image), color shifts (purple shadows, green highlights), heavy grain.
          **VIBE:** Hipster, accidental art, faulty camera, surreal.`;
      }
      else if (state.baseStyle === 'Classic Noir BW Style') {
          basePromptForGeneration = `A dramatic, high-contrast **"Black & White Film Noir"** photograph (Ilford HP5 style).
          **SETTING:** A shadowy room with blinds, or a foggy street.
          **ACTION:** ${dynamicAction} with a serious or mysterious expression.
          **FILM LOOK:** Black and white ONLY. High contrast, deep blacks, visible distinct film grain.
          **VIBE:** Mystery, elegance, timeless, dramatic, cinematic.`;
      }
      else if (state.baseStyle === 'Fisheye 90s Style') {
          basePromptForGeneration = `A cool, distorted **"90s Full-Frame Fisheye"** skate video style photograph.
          **SETTING:** An urban skate park, wide stairs, or city plaza.
          **ACTION:** ${dynamicAction} leaning into the camera.
          **FILM LOOK:** **Extreme barrel distortion** (curved world) but **FULL FRAME**. 
          **COMPOSITION (CRITICAL):** The image must go edge-to-edge. **NO circular black borders**, **NO black vignette corners**. The fisheye distortion should stretch across the entire rectangular frame.
          **VIBE:** Beastie Boys video, 90s skate culture, edgy, fun.`;
      }
      else if (state.baseStyle === 'VHS Glitch Style') {
          basePromptForGeneration = `A lo-fi, retro **"VHS Camcorder"** video still frame.
          **SETTING:** A living room or bedroom.
          **ACTION:** ${dynamicAction}.
          **FILM LOOK:** **Scanlines** (horizontal lines), chromatic aberration (RGB split), slight static noise, date stamp in corner (e.g., 'PLAY > 1998').
          **VIBE:** Home video, found footage, cozy retro, analog horror (mild).`;
      }
      else if (state.baseStyle === 'Miniature World') {
          basePromptForGeneration = `A creative, surreal, and playful "Miniature World" macro photograph of ${state.productDescription}.
          **CONCEPT:** The product is placed as a **giant, monumental object** in a tiny, detailed miniature world.
          **SCALE CONTRAST (CRITICAL):** The product MUST look huge compared to the surroundings. The props (people, trees, cars) must be **tiny, H0 scale model figurines** (like Preiser figures).
          **CAMERA TECHNIQUE:** Use a **Tilt-Shift lens effect** with a shallow depth of field. The product is tack sharp in focus, while the foreground and far background are blurred (bokeh) to enhance the "toy world" illusion.
          **LIGHTING:** Bright, sunny, natural outdoor lighting with soft shadows. High quality, detailed, commercial finish.`;
      }
      else if (state.baseStyle === 'Retro Pop Tile Studio') {
          basePromptForGeneration = `A trendy, monochromatic **"Retro Pop Tile Studio"** product shot of ${state.productDescription}.
          **SETTING (CRITICAL):** A meticulously staged room with a **tiled wall (grid pattern)** and matching floor.
          **COLOR PALETTE (CRITICAL):** The tiles, walls, and floor MUST be painted in a **SINGLE, SOLID PASTEL COLOR** that matches or complements the product.
          - If the product is Yellow, try a Pastel Yellow or Pastel Lilac background.
          - If the product is Pink, use Pastel Pink (like the reference).
          - **DO NOT** default to pink if it clashes. Choose a harmonious monochromatic vibe.
          **PROPS:** The scene is filled with retro items (e.g., CRT TV, Anglepoise desk lamp, Alarm clock, VHS tapes) that are **painted in the SAME pastel color** as the walls, creating a seamless monochrome look.
          **STAGING:** The product is elevated on **clean white geometric pedestals/cubes/blocks** of different heights.
          **DETAILS:** Scattered popcorn, confetti, or small lifestyle items (scrunchies, clips) on the floor.
          **LIGHTING:** Soft, even studio lighting, high-key, pastel aesthetic, soft shadows.`;
      }
      else if (state.baseStyle === 'Kitchen Diorama') {
          basePromptForGeneration = `A cute, pastel-colored **"Kitchen Diorama"** product photography of ${state.productDescription}.
          **SETTING:** A stylized, miniature-like **retro kitchen counter** scene.
          **BACKGROUND (CRITICAL):** A wall with a **grid tile pattern** (white tiles with colored grout) and a **solid pastel-colored countertop** (like peach, mint, or soft pink) with **wooden drawer knobs** visible below.
          **PROPS:** Cute, retro kitchen accessories painted in matching pastel tones:
          - A round pastel wall clock.
          - A **checkered oven mitt** hanging on a hook (CRITICAL detail).
          - Ceramic canisters labeled 'COFFEE' or 'SUGAR'.
          - A tray with pastries (cupcakes/donuts).
          **LIGHTING:** Bright, warm, natural "morning window" sunlight casting soft, diagonal shadows.
          **VIBE:** Cozy, domestic, 'Cooking Mama' aesthetic, clean, organized, and adorable.`;
      }
      else if (state.baseStyle === 'Surreal Adventure Bottle') {
          basePromptForGeneration = `A high-end, surreal **"Composite Advertising"** photograph of ${state.productDescription}. The product is the **monumental centerpiece**, portrayed as a magical portal or container.
          **CONCEPT:** A seamless blend of the product with a breathtaking 3D landscape. The product stands tall in the center.
          **SCENE:** A vivid mix of majestic nature (mountains, blue ocean, green islands) and dynamic life.
          **ACTION (CRITICAL):** Include **miniature people** performing active outdoor lifestyle activities (e.g., cycling, paragliding, sliding) around the giant product.
          **DETAILS:** Hot air balloons or planes in the bright blue sky. A dynamic element like a **water slide** or waterfall spiraling around the product.
          **LIGHTING:** Bright, sun-drenched, high-key outdoor natural lighting.
          **VIBE:** Refreshing, energetic, limitless, imaginative, and adventurous.`;
      }
      else if (state.baseStyle === 'Nature\'s Biosphere') {
          basePromptForGeneration = `A surreal, eco-conscious composite product shot of ${state.productDescription}. The product is the main focus, depicted as a **transparent or cutaway container** revealing a **miniature living world inside**.
          **INTERNAL SCENE (CRITICAL):** Inside the product, there is a detailed, idyllic **miniature scene** (e.g., a tiny house with a lush garden, people gardening, or a dense forest). It represents the natural origin or purpose of the product.
          **EXTERNAL SETTING:** The product sits on a textured surface like a **weathered wooden deck** or garden table.
          **PROPS:** Surrounded by gardening tools (gloves, trowel) or natural elements (stones, soil) that complement the internal scene.
          **BACKGROUND:** A soft, bokeh-blurred lush green garden or outdoor nature setting.
          **LIGHTING:** Beautiful, dappled natural sunlight filtering through leaves (gobo effect).
          **VIBE:** Organic, wholesome, sustainable, purposeful, and magical.`;
      }
      else if (state.baseStyle === 'World Tour Diorama') {
          basePromptForGeneration = `A breathtaking, photorealistic "3D Travel Diorama" product photograph of ${state.productDescription}.
          **CONCEPT:** The product is the **GIANT HERO** placed in the center of a detailed, beautiful miniature scene representing a specific travel destination.
          **TECHNIQUE:** Use a **Macro Lens** with a soft **Tilt-Shift effect** to blur the distant background, making the scene look like a high-end miniature set or 3D render.
          **LIGHTING:** Cinematic, magical, and atmospheric (e.g., dappled sunlight, warm golden hour, or vibrant market lights).
          **VIBE:** Whimsical, adventurous, cute, and premium.`;
      }
      else if (state.baseStyle === 'Fantasy Floating Island') {
          basePromptForGeneration = `A magical, high-quality "Fantasy Floating Island" concept art style photograph of ${state.productDescription}.
          **SETTING:** The product is the centerpiece sitting on top of a **chunk of earth floating in the sky**.
          **DETAILS:** The island has tiny waterfalls falling off the edge into the clouds below, small fantasy trees, and vines hanging down.
          **BACKGROUND:** A bright, dreamy blue sky with fluffy white clouds and magical floating rocks in the distance.
          **VIBE:** Magical, Ghibli-inspired, fresh, and awe-inspiring.`;
      }
      else if (state.baseStyle === 'Glass Terrarium') {
          basePromptForGeneration = `A stunning macro photography shot of a **crystal clear glass terrarium (sphere or geometric shape)** containing ${state.productDescription}.
          **SUBJECT:** The product is nestled safely inside the glass container.
          **ENVIRONMENT:** Inside the glass, the product is surrounded by a tiny, lush ecosystem of vibrant green moss, small ferns, tiny white pebbles, and maybe a small piece of driftwood.
          **LIGHTING:** Natural sunlight filtering through the glass, creating beautiful reflections and highlights.
          **VIBE:** Organic, peaceful, protected, and eco-friendly.`;
      }
      else if (state.baseStyle === 'Lego Brick Land') {
          basePromptForGeneration = `A playful and creative product photograph of ${state.productDescription} where the ENTIRE surrounding world is **built entirely out of plastic toy building bricks (like LEGO)**.
          **CRITICAL COMPOSITION:** The frame must be **COMPLETELY FILLED** with brick elements. There should be **NO empty void, NO plain studio background, and NO negative space**. The foreground and background must be fully constructed with bricks.
          **SETTING:** The product sits on a studded brick baseplate, integrated into a dense brick scene.
          **BACKGROUND:** If outdoors, the "sky" should be built from smooth blue tiles or be a bright, vibrant backdrop consistent with a toy set. If indoors, walls must be built of bricks.
          **DETAILS:** Surrounded by tiny brick flowers, brick trees, and maybe a few tiny brick minifigures interacting with the 'giant' product.
          **TEXTURE:** High-gloss plastic texture, bright primary colors, and clear stud details.
          **VIBE:** Fun, nostalgic, creative, and colorful.`;
      }
      else if (state.baseStyle === 'Papercraft Pop-Up') {
          basePromptForGeneration = `A whimsical and artistic **"Papercraft Pop-Up Book"** style photograph of ${state.productDescription}.
          **STYLE:** The entire background and props are made of **layered, cut-out paper shapes** arranged to create depth (like a theatre stage).
          **DETAILS:** Paper clouds hanging on strings, layered paper mountains or trees in the background. The product sits on a paper 'stage' in the center.
          **LIGHTING:** Soft shadows between the paper layers to emphasize the physical depth and texture of the paper.
          **VIBE:** Artsy, handcrafted, storybook, and soft.`;
      }
      else if (state.baseStyle === 'Isometric 3D Room') {
          basePromptForGeneration = `A cute, digital art style **"Isometric 3D Room"** diorama of ${state.productDescription}.
          **COMPOSITION:** A cutaway view of a tiny cubic room (like a dollhouse or Sims room) floating in a void.
          **SUBJECT:** The product is the main piece of 'furniture' or decoration in the center of the room.
          **STYLE:** Soft, rounded 3D rendering style (like Blender 3D 'clay' render). Pastel colors, soft lighting, and cute tiny furniture props surrounding the product.
          **VIBE:** Kawaii, cozy, digital art, and organized.`;
      }
      
      // --- CINEMATIC & MOODY UPDATES ---
      else if (state.baseStyle === 'Play with Shadow') {
          basePromptForGeneration = `Dynamic and artistic product photography focused solely on the interplay of light and shadow. The main subject is the product, and a clearly defined, realistic human hand **shadow** is interacting with it. The shadow should be accurately proportioned, show all five fingers, and appear to be performing a natural action with the product (e.g., reaching for, gently touching, casting a unique silhouette over). The background should be minimalist, a solid neutral color (white, light grey, dark grey) or a subtly textured wall, to maximize the contrast and impact of the hard, sharp shadows. Use strong, directional lighting to create clear, crisp shadow patterns. The overall mood should be intriguing and engaging, with the product as the central focus within the shadow play. Ensure NO actual human hand or skin is visible, only the sharp, distinct shadow. Product: ${state.productDescription}`;
      }
      else if (state.baseStyle === 'Sunlight & Shadow Play') {
          basePromptForGeneration = `A professional, artistic product photo playing with "Sunlight & Shadow".
          **LIGHTING:** Strong, directional natural sunlight (Golden Hour or Mid-day) casting distinct shadows.
          **SHADOWS:** Creative shadows (e.g., of palm leaves, blinds, or window frames) falling across the product and background.
          **VIBE:** Warm, natural, high-end, and artistic. Product: ${state.productDescription}`;
      }

      // --- EDITORIAL & LUXURY UPDATES ---
      else if (state.baseStyle === 'Luxe Floral Editorial') {
          basePromptForGeneration = `A high-end, romantic **"Luxe Floral Editorial"** product shot.
          **COMPOSITION:** The product is surrounded by or resting on lush, expensive-looking flowers (roses, peonies, orchids) in bloom.
          **LIGHTING:** Soft, dreamy, diffuse lighting.
          **VIBE:** Perfume ad, luxury skincare, feminine, elegant, premium. Product: ${state.productDescription}`;
      }
      else if (state.baseStyle === 'Aesthetic Stone Tray') {
          basePromptForGeneration = `A minimalist, spa-like **"Aesthetic Stone Tray"** product photograph.
          **SETTING:** The product is placed on a textured natural stone, marble, or travertine tray/podium.
          **PROPS:** Simple, organic elements like a dry branch, a smooth pebble, or water ripples.
          **LIGHTING:** Soft, clean, spa-like lighting.
          **VIBE:** Calming, organic, expensive, minimalist. Product: ${state.productDescription}`;
      }
      else if (state.baseStyle === 'Texture Focus (fabric, leather)') {
          basePromptForGeneration = `A tactile, sensory **"Texture Focus"** product photograph.
          **BACKGROUND:** Rich, textured background material like crushed velvet, silk, linen, or pebbled leather.
          **LIGHTING:** Side lighting (raking light) to accentuate the texture of both the background and the product.
          **VIBE:** High-quality, material-focused, expensive, tactile. Product: ${state.productDescription}`;
      }
      else if (state.baseStyle === 'Conceptual / Editorial') {
          basePromptForGeneration = `A creative, abstract **"Conceptual Editorial"** product shot.
          **COMPOSITION:** Unconventional, gravity-defying, or geometric balancing act. The product is balanced on shapes or suspended.
          **BACKGROUND:** Solid color or simple gradient.
          **LIGHTING:** Studio lighting with distinct shadows.
          **VIBE:** Art magazine, sculpture, avant-garde, modern. Product: ${state.productDescription}`;
      }

      // --- NEW STYLES: NATURAL & LIFESTYLE ---
      else if (state.baseStyle === 'Korean Cafe Aesthetic') {
          basePromptForGeneration = "Natural, bright, and cozy lifestyle photo. The style is an aesthetic minimalist composition, often seen in Korean cafes. Use soft, natural lighting (like from a window) and warm tones. Include aesthetic props like Korean magazines, books, a coffee cup, or small, neat decor items. The background should be clean and simple (like a light-colored wall or a wooden table).";
      }
      else if (state.baseStyle === 'Cozy Home Diary') {
          basePromptForGeneration = `A warm, intimate, and aesthetic **"Cozy Home Diary"** lifestyle product photograph.
          **SETTING:** A comfortable corner of a home (living room or bedroom) near a window. Soft sunlight is streaming through **white sheer curtains**, creating a gentle, dreamy glow.
          **SUBJECT:** A **faceless model** wearing a cozy **knitted beige/cream sweater or cardigan**.
          **ACTION (CRITICAL):** The model is holding the product ("${state.productDescription}") in one hand while interacting with an **open notebook/journal** with the other hand (writing or holding a pen).
          **PROPS:** An aesthetic open journal with handwritten notes, a classic fountain pen, a ceramic mug with hot tea/coffee (maybe with steam), and **lush green indoor plants (Monstera)** in the background.
          **COLOR TONE:** Earthy, warm neutrals (Beige, Cream, Warm Brown, Sage Green). Low saturation, calming vibe.
          **VIBE:** Slow living, mindfulness, relaxing, "me time", and homey.`;
      }

      // --- NEW STYLES: DYNAMIC ACTION ---
      else if (state.baseStyle === 'Splash Vortex & Levitasi') {
          basePromptForGeneration = `A dynamic and magical composite product photograph. 
    **CRITICAL INSTRUCTION 1 (Product Placement):** The main product ('${state.productDescription}') is the central hero, sharp and perfectly lit. It MUST be placed **firmly on a surface** (like a wooden table, a stone pedestal, or a clean studio surface). **The product itself MUST NOT be levitating.**
    **CRITICAL INSTRUCTION 2 (Liquid):** A photorealistic liquid (e.g., juice, honey, water) MUST be dynamically swirling or splashing in a vortex/spiral motion *around* the product, frozen in time.
    **CRITICAL INSTRUCTION 3 (Ingredients):** The product's main ingredients (e.g., fruit slices, honeycombs, dates) MUST be artfully *levitating* or *floating* in the air around the product and the liquid swirl.
    **Background:** The background is soft, neutral, and blurred to make the splash pop.
    **Lighting:** High-speed sync flash photography, freezing motion, crystal clear.
    **Vibe:** Fresh, energetic, commercial beverage advertisement.`;
      }
      
      // --- NEW PROMPTS FOR POP STYLES WITH TALENT ---
      else if (state.baseStyle === 'Model Pop Color (Gaya Referensi)') {
          // SOLUSI: Adaptasi Pose Bayi
          let interact = "";
          if (isBabyOrToddler) {
              interact = `1. The baby is hugging the product playfully.
              2. The baby is peeking from behind the product.
              3. The baby is putting the product on their head playfully.`;
          } else {
              interact = `1. The model is holding the product to **cover one of their eyes**.
              2. The model is holding the product with **both hands** near their face, smiling.
              3. The model is holding the product **close to their cheek or mouth** (e.g., puckering lips for a kiss).`;
          }

          basePromptForGeneration = `A bright, high-energy, pop-color product lifestyle shot.
          **CRITICAL COMPOSITION:** The shot MUST be a **close-up (CU) or medium close-up (MCU)** of a playful, happy model interacting with the product ("${state.productDescription}").
          **CRITICAL BACKGROUND:** The background MUST be a **solid, vibrant, pop color** (e.g., bright orange, hot pink, vivid red, or beige).
          **CRITICAL LIGHTING:** The lighting MUST be **bright, direct, and high-key**, similar to a studio flash, creating a high-contrast, saturated look.
          **CRITICAL INTERACTION:** The model MUST be interacting playfully with the product. **You MUST choose ONE** of these interactions:
          ${interact}
          **VIBE:** Energetic, fun, playful, vibrant, and model-centric.`;
      }
      else if (state.baseStyle === 'Pop Up Angle (Gaya Referensi)') { 
          basePromptForGeneration = `A dynamic, high-energy product lifestyle shot, inspired by the "Pop Up Angle" reference images.
          **CRITICAL ANGLE (WAJIB):** The camera angle MUST be an **extreme low-angle shot (ultra wide-angle distortion)**, looking up at the talent from below. This creates a "pop-up" or "looming" effect where the talent appears tall and dynamic.
          **CRITICAL COMPOSITION:** The talent MUST be leaning or looking down towards the camera. The product ("${state.productDescription}") MUST be held out prominently towards the camera, appearing large and slightly distorted due to the wide-angle perspective.
          **CRITICAL BACKGROUND:** The background MUST be a **solid, bright, vibrant, pop color** (like bright red, yellow, pink, or blue).
          **LIGHTING:** Bright, clean, high-key studio lighting, similar to a flash.
          **VIBE:** Energetic, fun, playful, modern, and very dynamic.
          **TALENT:** The model should have a strong, energetic, and happy expression (e.g., smiling, laughing, mouth open in excitement).`;
      }
      // --- END NEW PROMPTS ---

      // --- APPLY GENERATED PROMPT ---
      // FIX: Ensure basePromptForGeneration overrides basePrompt correctly
      if (state.baseStyle === 'AI Auto Style') {
          // Keep basePrompt as handled by specific Auto Style logic if needed, 
          // but usually Auto Style is handled by leaving it flexible.
          basePrompt = `Generate a professional, high-quality, and visually stunning product photograph for: "${state.productDescription}" (Category: "${state.selectedCategory}"). **Creative Direction:** Act as a world-class creative director. You have full creative freedom to choose the best style.`;
      } else {
          // THIS IS THE FIX: Always use basePromptForGeneration if available
          const effectiveStyle = basePromptForGeneration || state.baseStyle;
          
          // Re-construct basePrompt using the detailed effectiveStyle
          // If it's a full prompt (like Model Pop Color), we use it as the core description
          if (basePromptForGeneration) {
               basePrompt = effectiveStyle;
          } else {
               basePrompt = `Product photography of ${state.productDescription}. Style: ${effectiveStyle}.`;
          }
      }
  }

  // --- DETEKSI LOGIKA TALENT ---
  // Pastikan gaya Pop Color & Pop Up Angle masuk ke dalam logika ini
  const stylesWithTalent = [
      'Full model', 'Hand-in-Frame', 'Half body', 'Reviewer Style', '90s Lens Style', 
      'Ice Cooler (Hand-in-Frame)', 'Floating POV Style', 
      'Model Pop Color (Gaya Referensi)', 'Pop Up Angle (Gaya Referensi)', 
      'Aesthetic Mirror Selfie', 'Faceless OOTD Focus',
      'Monochrome Bag Pop', 'Dynamic Street Snap', 'Mid-Demo Motion', 
      'Urban Freeze Motion', 'JDM Street Style', 'Neon Light Trails',
      // Vintage & Urban
      '90s Flash Party Style', 'Retro Diner Date Style', 'Old Money Aesthetic Style',
      'Analog Film Grain Style', 'Subway Commute Style', 'Rooftop Golden Hour Style',
      'Concrete Street Style', 'Night City Bokeh Style', 'Picnic Date Style', 
      'Art Gallery Minimalist Style',
      // Pinterest Aesthetic
      'Airport Jetsetter Style', 'Flower Market Style', 'Luxury Hotel Lobby Style',
      'Vintage Convertible Style', 'Coffee Shop Work Style', 'Escalator Motion Style',
      'Grocery Run Aesthetic Style', 'Tennis Court Sporty Style', 
      'Library Dark Academia Style', 'Rainy Car Window Style',
      // Retro Analog Vibes
      'Kodak Gold Memories Style', 'Cinestill Night Style', 'Polaroid Flash Style',
      'Lomo Vignette Style', 'Disposable Camera Style', 'Super 8 Roadtrip Style',
      'Expired Film Leak Style', 'Classic Noir BW Style', 'Fisheye 90s Style',
      'VHS Glitch Style',
      // Tambahan gaya lain yang menggunakan talent
      'Pop Grafis (Grid/Checkers)', 'Piknik Retro (Hard Light)'
  ];

  // Cek apakah gaya saat ini memerlukan talent
  if (stylesWithTalent.includes(state.baseStyle) || state.baseStyle.includes('model') || state.baseStyle.includes('Hand')) {
      
      let interactionPrompt = "";
      if (state.isWearable) {
          interactionPrompt = ` The photo must feature a model **WEARING** the product ('${state.productDescription}').
          **CRITICAL INSTRUCTION:** The product is a piece of clothing/apparel and **MUST BE FITTED ON THE MODEL'S BODY**.
          **NEGATIVE CONSTRAINT:** The model must **NOT** be holding the product in their hands. The model must NOT be holding a hanger. The hands should be posed naturally (e.g. in pockets, by sides, or touching hair) or interacting with the environment, but **NOT holding the product** itself.`;
      } else {
          interactionPrompt = ` The photo must feature a model ${dynamicActionShort} the product.`;
      }

      // FIX: Konversi Gender ke Bahasa Inggris
      const genderEnglish = state.talentGender === 'wanita' ? 'Female (Woman)' : 'Male (Man)';

      if (state.talentSource === 'ai') {
          let talentPrompt = ` ${interactionPrompt} The model is a **highly attractive, photogenic, and good-looking** ${genderEnglish}, **${englishSegment}**, ${state.talentRace} ethnicity.`;
          
          if (state.talentGender === 'wanita' && state.talentHijab) {
              talentPrompt += " The woman MUST be wearing a modern, stylish hijab. **CRITICAL MODESTY RULE:** Her arms MUST be fully covered down to the wrists, and legs fully covered. No skin should be visible on arms or legs.";

              const shortSleeveKeywords = ['lengan pendek', 'short sleeve', 'kaos', 't-shirt', 'tee', 'kutang', 'sleeveless', 'tank top', 'u can see', 'you can see', 'singlet', 'rompi', 'vest'];
              const isShortSleeve = shortSleeveKeywords.some(kw => state.productDescription.toLowerCase().includes(kw));
              const fashionKeywords = ['baju', 'wear', 'outfit', 'top', 'shirt', 'dress', 'gaun', 'atasan', 'blouse', 'tunik', 'jersey'];
              const isFashion = fashionKeywords.some(kw => state.productDescription.toLowerCase().includes(kw)) || isShortSleeve;

              if (isFashion) {
                  if (isShortSleeve) {
                      talentPrompt += " **STYLING INSTRUCTION:** Since the product ('${state.productDescription}') appears to be short-sleeved or sleeveless, she MUST be wearing a **matching long-sleeved inner top (manset)** underneath it or a stylish outer jacket to ensure her arms are fully covered to the wrists, adhering strictly to modest hijab fashion.";
                  } else {
                      talentPrompt += " Ensure her outfit styling is fully modest with long sleeves covering to the wrists.";
                  }
              }
          }
          basePrompt += talentPrompt;

      } else if (state.talentSource === 'upload' && state.talentUploadedImageBase64) {
          let outfitInstruction = "";
          if (state.talentChangeOutfit) {
              outfitInstruction = `The model's outfit MUST be changed to match the theme of the product ('${state.productDescription}') and the photography style. DO NOT keep the original outfit from the reference photo.`;
          } else {
              outfitInstruction = "The model's outfit from the reference photo MUST be kept exactly as it is. DO NOT change the clothing.";
          }

          let faceInstruction = `Use the uploaded image (Image 2) as a **CRITICAL and STRICT visual reference for the model's identity**.
**CRITICAL:** If the reference image contains **multiple people**, you MUST **recreate ALL of them** with their exact facial features, likeness, ethnicity, hair style, and skin tone.
If the reference image contains **only one person**, recreate that single person's identity.
You MUST **maintain all facial features** from the reference(s). DO NOT change the models' faces.`;
          
          basePrompt += ` ${interactionPrompt} ${faceInstruction} ${outfitInstruction}`;

      } else if (state.talentSource === 'custom') {
          if (state.talentCustomDescription && state.talentCustomDescription.trim() !== '') {
              let talentPrompt = ` ${interactionPrompt} The model is based on this description: "**${state.talentCustomDescription}**". Ensure the model is highly detailed, photorealistic, and fits the scene naturally.`;
              basePrompt += talentPrompt;
          } else {
              basePrompt += ` ${interactionPrompt} The photo features a professional model.`;
          }
      }
  }

  // --- APPLY ADDITIONS (WORD ART & DOODLE) ---
  const prompts: string[] = [];
  const variationCount = state.generationCount || 1;

  const wordArtAddition = getWordArtPromptAddition(state, false);
  const doodleAddition = state.selectedDoodleStyle !== 'none' ? getDoodlePromptAddition(false, null, state) : '';

  if (state.selectedStyle !== 'ReferenceSwap') {
      let variationPrompts: string[] = [];

      if (state.baseStyle === 'Pop Color / High Saturation') { 
          variationPrompts = [ basePrompt + " The product is arranged in a dynamic flat lay composition on a matching vibrant background.", basePrompt + " A hand with colorful nail polish is holding the product creatively.", basePrompt + " The product is displayed on solid-colored geometric blocks or pedestals of varying heights.", basePrompt + " The product is captured mid-air as if floating, with dramatic hard shadows below." ]; 
      } 
      else if (state.baseStyle === 'Play with Shadow') { 
          variationPrompts = [ 
              basePrompt + " A long, elegant shadow of a hand reaching out to delicately hold the product.", 
              basePrompt + " A hand shadow appears to be gently touching the top of the product, creating a soft, inviting interaction.", 
              basePrompt + " A dynamic shadow of a hand in motion, as if dropping a single ingredient that is relevant to the product near it.", 
              basePrompt + " A bold, graphic shadow of a hand framing the product, emphasizing its form." 
          ]; 
      }
      else if (state.baseStyle === 'Monochrome Bag Pop') {
        variationPrompts = [
            basePrompt + " **COLOR THEME: Electric Blue.** The entire scene (background, outfit) is Electric Blue. The product is the hero.",
            basePrompt + " **COLOR THEME: Hot Pink.** The entire scene (background, outfit) is Hot Pink. The product contrasts or blends stylishly.",
            basePrompt + " **COLOR THEME: Vivid Orange.** The entire scene (background, outfit) is Vivid Orange. The product is held near the chin/mouth.",
            basePrompt + " **COLOR THEME: Lime Green.** The entire scene (background, outfit) is Lime Green. The product is displayed against the torso."
        ];
        variationPrompts.sort(() => Math.random() - 0.5);
      }
      else if (state.baseStyle === 'Dynamic Street Snap') {
        variationPrompts = [
            basePrompt + " **SETTING: Zebra Cross.** The model is walking confidently across a busy city street/crosswalk. **ANGLE:** Low angle, looking up slightly. **BACKGROUND:** Blurred city traffic and buildings. Vibe: Urban Rush.",
            basePrompt + " **SETTING: Subway Station.** The model is standing or moving near subway tiles or a turnstile. **LIGHTING:** Strong Direct Flash with a slightly dark background. **ANGLE:** Eye-level, slightly tilted (Dutch angle). Vibe: Underground Cool.",
            basePrompt + " **SETTING: Concrete City Stairs.** The model is sitting casually on outdoor steps or leaning against a railing. **ANGLE:** High angle looking down. **BACKGROUND:** Concrete texture and city shadows. Vibe: Casual Hangout.",
            basePrompt + " **SETTING: Sidewalk Cafe.** The model is walking past a cafe window or sitting at an outdoor table, laughing. **VISUAL:** Slight motion blur on the passing people in background. **LIGHTING:** Natural sunlight mixed with city reflections. Vibe: Lifestyle."
        ];
        variationPrompts.sort(() => Math.random() - 0.5);
      }
      else if (state.baseStyle === 'Mid-Demo Motion') {
        variationPrompts = [
            basePrompt + " **SETTING: Busy Expo/Trade Show.** The model is standing at a booth, holding the product out towards a blurred crowd of people in the foreground. **ACTION:** Enthusiastic presenting gesture. **VISUAL:** Bokeh blur of heads/shoulders in front. Vibe: Public attention.",
            basePrompt + " **SETTING: Fashion Backstage/Dressing Room.** The model is rushing, applying or holding the product while looking in a mirror. **VISUAL:** High motion blur on the arms/background to show the rush. **LIGHTING:** Bright vanity mirror lights + Flash. Vibe: Urgent & Exclusive.",
            basePrompt + " **SETTING: Busy Urban Street Corner.** The model is holding the product high up in the air, smiling/shouting as if promoting it to passersby. **VISUAL:** Streaks of motion blur from passing cars or people behind. **ANGLE:** Low angle, heroic. Vibe: Loud & Proud.",
            basePrompt + " **SETTING: Abstract Studio.** Focus on the model's hands and torso. **ACTION:** Vigorously shaking, spraying, or opening the product. **VISUAL:** The product is sharp, but the hands have 'speed lines' motion blur. The face is laughing/excited in the background. Vibe: High Energy."
        ];
        variationPrompts.sort(() => Math.random() - 0.5);
      }
      else if (state.baseStyle === 'Urban Freeze Motion') {
        variationPrompts = [
            basePrompt + " **SETTING:** Busy Daytime Crosswalk. The blur is of commuters rushing to work. The subject stands still like an island in a river of people.",
            basePrompt + " **SETTING:** City Night Life (Busy District). **EFFECT:** Add vibrant light trails from cars and neon signs in the background along with the blurred crowd. Vibe: Cyber & Moody.",
            basePrompt + " **SETTING:** Underground Subway Station Platform. Background shows a blurred train arriving or leaving and rushing passengers on the tiles. Vibe: Urban Transit.",
            basePrompt + " **SETTING:** Rainy Urban Street at Dusk. People with umbrellas are blurred in the background. Reflections of city lights on the wet pavement. Vibe: Emotional & Cinematic."
        ];
        variationPrompts.sort(() => Math.random() - 0.5);
      }
      else if (state.baseStyle === 'Neon Light Trails') {
        variationPrompts = [
            basePrompt + " **SETTING:** Busy Intersection. Chaotic red and white car tail-light trails streaming around the model. Vibe: Urban Rush.",
            basePrompt + " **SETTING:** Tiled Urban Tunnel. The light trails are linear and perspective-leading lines on the walls and ceiling. Vibe: High Velocity.",
            basePrompt + " **SETTING:** Rainy Night Street. The wet ground reflects the neon light trails, doubling the visual chaos. Colors: Pink, Blue, and Purple neon. Vibe: Blade Runner aesthetic.",
            basePrompt + " **SETTING:** Outside a Night Club. The light trails are swirly and abstract (camera shake), mixed with bokeh city lights. The model looks effortless and cool. Vibe: Party & Flash."
        ];
        variationPrompts.sort(() => Math.random() - 0.5);
      }
      else { 
          variationPrompts = [ 
              basePrompt + " Standard view, clear composition.", 
              basePrompt + " A slightly different camera angle, adding a sense of depth.", 
              basePrompt + " With alternative complementary props that enhance the product.", 
              basePrompt + " With slightly different, more dramatic lighting." 
          ]; 
      }

      // Generate final prompts based on variation count
      for (let i = 0; i < variationCount; i++) {
          let prompt = variationPrompts[i % variationPrompts.length]; // Cycle through variations if count > variations available
          if (wordArtAddition) prompt += `\n\n${wordArtAddition}`;
          if (doodleAddition) prompt += `\n\n${doodleAddition}`;
          prompts.push(prompt);
      }
  } else {
      // Logic for Reference Swap (uses single basePrompt usually, but applies effects)
      for (let i = 0; i < variationCount; i++) {
          let finalPrompt = basePrompt;
          if (wordArtAddition) finalPrompt += `\n\n${wordArtAddition}`;
          if (doodleAddition) finalPrompt += `\n\n${doodleAddition}`;
          if (i > 0) finalPrompt += `\n\n(Variation ${i + 1}: Slight change in angle or composition)`;
          prompts.push(finalPrompt);
      }
  }

  return prompts;
};