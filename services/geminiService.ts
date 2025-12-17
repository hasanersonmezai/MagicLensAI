import { GoogleGenAI } from "@google/genai";

/**
 * Generates/Edits an image based on an input image and a text prompt.
 * Uses gemini-2.5-flash-image for better quota handling and speed.
 * 
 * @param base64Image The input image in base64 format.
 * @param prompt The prompt to apply.
 * @param customApiKey (Optional) Manually provided API key.
 */
export const generateTransformedImage = async (
  base64Image: string,
  prompt: string,
  customApiKey?: string
): Promise<string> => {
  try {
    // Determine the API key: either passed explicitly or from environment
    const apiKey = customApiKey || process.env.API_KEY;

    if (!apiKey) {
      throw new Error("API Anahtarı bulunamadı. Lütfen ayarlardan anahtarınızı girin.");
    }

    // Instantiate the client dynamically with the specific key
    // This prevents "process.env.API_KEY missing" errors at startup time
    const ai = new GoogleGenAI({ apiKey });

    // Remove data:image/xxx;base64, prefix if present
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
    
    // Determine mimeType
    let mimeType = 'image/jpeg';
    if (base64Image.startsWith('data:image/png')) mimeType = 'image/png';
    else if (base64Image.startsWith('data:image/webp')) mimeType = 'image/webp';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
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
      config: {
        imageConfig: {
          // Image size is not supported in Flash Image model, only aspect ratio
          aspectRatio: "1:1"
        }
      }
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
      throw new Error("Model generated a response but no image data was found.");
    }

    return `data:image/png;base64,${generatedBase64}`;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};