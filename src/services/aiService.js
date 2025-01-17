import { uploadToIPFS } from './storageService';

// Stable Diffusion API configuration
const SD_API_ENDPOINT = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
const SD_API_KEY = process.env.REACT_APP_STABILITY_API_KEY;

const defaultParams = {
  cfg_scale: 7,
  height: 1024,
  width: 1024,
  samples: 1,
  steps: 30,
};

export const generateImage = async (prompt, style) => {
  if (!SD_API_KEY) {
    throw new Error('Stability API key is not configured');
  }

  try {
    const response = await fetch(SD_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${SD_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: `${style} style, ${prompt}`,
            weight: 1,
          },
        ],
        ...defaultParams,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate image');
    }

    const result = await response.json();
    
    // The API returns an array of generated images
    // We're only requesting one sample, so we'll get the first result
    const generatedImage = result.artifacts[0];
    
    // Convert the base64 image data to a data URL
    const imageDataUrl = `data:image/png;base64,${generatedImage.base64}`;
    
    // Return the data URL directly for immediate display
    return imageDataUrl;
    
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};
