import * as Client from '@web3-storage/w3up-client';
import { initializeStorage } from './storageService';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const fetchSpaceImages = async () => {
  try {
    // Use the shared storage client
    const client = await initializeStorage();
    
    if (!client) {
      throw new Error('Failed to initialize storage client');
    }

    // Get current space and list uploads
    const space = await client.currentSpace();
    console.log('Fetching uploads from space:', space.did());
    
    // List all uploads in the space with pagination
    console.log('Listing uploads...');
    const uploadList = await client.capability.upload.list({ size: 100 });
    console.log('Total uploads found:', uploadList?.results?.length || 0);

    const images = [];

    // Process uploads from the results array
    if (uploadList && uploadList.results && Array.isArray(uploadList.results)) {
      for (const upload of uploadList.results) {
        if (!upload || !upload.root) {
          console.log('Skipping upload - missing data:', upload);
          continue;
        }

        try {
          const url = `https://${upload.root.toString()}.ipfs.w3s.link`;
          images.push({
            cid: upload.root.toString(),
            url: url,
            uploadedAt: new Date(upload.insertedAt || upload.updatedAt)
          });
        } catch (err) {
          console.warn('Failed to process upload:', err);
        }
      }
    }

    console.log('Successfully processed images:', images.length);

    // Sort by upload date
    images.sort((a, b) => b.uploadedAt - a.uploadedAt);
    return images;
  } catch (error) {
    console.error('Failed to fetch images:', error);
    throw new Error(error.message || 'Failed to fetch images');
  }
};
