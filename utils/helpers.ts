import { ImageData } from '../types';

export const toBase64 = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const [header, data] = reader.result.split(',');
        const match = header.match(/:(.*?);/);
        const mimeType = match ? match[1] : 'image/png';
        resolve({ mimeType, data });
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = error => reject(error);
  });
};

export const checkWordCount = (text: string, maxWords: number) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const isValid = words.length <= maxWords;
  return { isValid, wordCount: words.length, text: text.trim() };
};