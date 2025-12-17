import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

/**
 * Generates/Edits an image based on an input image and a text prompt.
 * Uses gemini-2.5-flash-image which is efficient for these tasks.
 */
export const generateTransformedImage = async (
  base64Image: string,
  prompt: string
): Promise<string> => {
  try {
    // Remove data:image/xxx;base64, prefix if present
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    
    // Determine mimeType (simple check, default to image/jpeg if unsure)
    let mimeType = 'image/jpeg';
    if (base64Image.startsWith('data:image/png')) mimeType = 'image/png';
    else if (base64Image.startsWith('data:image/webp')) mimeType = 'image/webp';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Recommended model for general image editing tasks
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
        ],
      },
      // Note: No responseMimeType needed for this model usually, 
      // but if we were using Imagen we would use generateImages.
      // For 2.5 flash image, it returns parts with inlineData.
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini API");
    }

    const content = response.candidates[0].content;
    
    // Find the image part in the response
    let generatedBase64 = '';
    
    if (content.parts) {
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
          generatedBase64 = part.inlineData.data;
          break;
        }
      }
    }

    if (!generatedBase64) {
      throw new Error("Model generated a response but no image data was found. It might have refused the request.");
    }

    return `data:image/png;base64,${generatedBase64}`;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};