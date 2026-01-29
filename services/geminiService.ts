import { GoogleGenAI } from "@google/genai";
import { ImageData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const callGeminiAPI = async (
  prompt: string,
  imageInput: ImageData | ImageData[] | null = null,
  type: 'text' | 'image' | 'image_swap' = 'text'
): Promise<string | string[] | null> => {
  
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    try {
      if (type === 'text') {
        // Text generation / Image Analysis using Nano Banana (Flash) for efficiency
        const parts: any[] = [{ text: prompt }];
        
        if (imageInput) {
          const images = Array.isArray(imageInput) ? imageInput : [imageInput];
          images.forEach(img => {
            parts.push({
              inlineData: {
                mimeType: img.mimeType,
                data: img.data
              }
            });
          });
        }

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: { parts },
        });
        
        return response.text || null;
      } 
      else if (type === 'image' || type === 'image_swap') {
        // Image Generation
        
        const model = 'gemini-2.5-flash-image'; 
        const parts: any[] = [{ text: prompt }];

        if (imageInput) {
          const images = Array.isArray(imageInput) ? imageInput : [imageInput];
          images.forEach(img => {
            parts.push({
              inlineData: {
                mimeType: img.mimeType,
                data: img.data
              }
            });
          });
        }

        const response = await ai.models.generateContent({
          model: model,
          contents: { parts },
          config: {
            responseModalities: ['IMAGE'], 
          }
        });

        const images: string[] = [];
        if (response.candidates && response.candidates.length > 0) {
          for (const candidate of response.candidates) {
            if (candidate.content && candidate.content.parts) {
              for (const part of candidate.content.parts) {
                if (part.inlineData && part.inlineData.data) {
                  images.push(part.inlineData.data);
                }
              }
            }
          }
        }
        
        return images;
      }
      
      return null;

    } catch (error: any) {
      // Analyze Error
      const errorMessage = error.message || JSON.stringify(error);
      const isQuotaError = errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('quota');
      const isServerOverload = errorMessage.includes('503') || errorMessage.includes('500') || errorMessage.includes('Overloaded');

      if ((isQuotaError || isServerOverload) && attempt < MAX_RETRIES) {
        attempt++;
        // Exponential backoff: 2s, 4s, 8s... + random jitter
        const delay = Math.pow(2, attempt) * 2000 + (Math.random() * 1000);
        console.warn(`Gemini API Error (Attempt ${attempt}/${MAX_RETRIES}): ${errorMessage}. Retrying in ${Math.round(delay)}ms...`);
        await wait(delay);
        continue;
      }

      // If we ran out of retries or it's a different error, handle user-friendly messages
      console.error("Gemini API Fatal Error:", error);

      if (errorMessage.includes('SAFETY')) {
         throw new Error("Generasi gambar diblokir oleh filter keamanan AI (Safety). Cobalah mengubah prompt atau gunakan foto produk yang berbeda.");
      }
      
      if (isQuotaError) {
         throw new Error("Server sedang sibuk (Limit Kuota Tercapai). Mohon kurangi 'Jumlah Variasi Foto' menjadi 1 atau tunggu beberapa saat sebelum mencoba lagi.");
      }

      throw error;
    }
  }
  return null;
};