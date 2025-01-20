import * as Client from '@web3-storage/w3up-client';

let storageClient = null;

export const initializeStorage = async () => {
  try {
    if (!storageClient) {
      // Check for required environment variable
      const spaceDID = process.env.REACT_APP_WEB3_STORAGE_SPACE_DID;
      
      if (!spaceDID) {
        throw new Error('Missing environment variable: REACT_APP_WEB3_STORAGE_SPACE_DID');
      }

      // Step 1: Create client with persistent storage
      console.log('Creating new storage client...');
      storageClient = await Client.create();
      
      // Step 2: Use the shared space directly
      console.log('Setting up shared space...');
      await storageClient.setCurrentSpace(spaceDID);

      // Verify space is properly set up
      const currentSpace = await storageClient.currentSpace();
      if (!currentSpace || currentSpace.did() !== spaceDID) {
        throw new Error('Failed to initialize storage space');
      }
      
      console.log('Space setup complete');
    }
    
    return storageClient;
  } catch (error) {
    console.error('Failed to initialize storage:', error);
    throw error;
  }
};

export const uploadToIPFS = async (imageBlob) => {
  try {
    console.log('Starting IPFS upload...');
    const client = await initializeStorage();
    
    // Create a File object from the Blob
    const filename = `aryart_${Date.now()}.png`;
    const imageFile = new File([imageBlob], filename, { type: 'image/png' });
    
    // Get current space and verify it's the correct one
    const space = await client.currentSpace();
    const spaceDID = process.env.REACT_APP_WEB3_STORAGE_SPACE_DID;
    if (!space || space.did() !== spaceDID) {
      throw new Error('Incorrect space for upload');
    }

    // Upload file
    console.log('Uploading file to space:', spaceDID);
    const cid = await client.uploadFile(imageFile);
    console.log('Upload complete, CID:', cid);

    // Get the IPFS URL using content CID format
    const url = `https://${cid}.ipfs.w3s.link`;
    console.log('IPFS URL:', url);

    return {
      cid: cid.toString(),
      url: url
    };
  } catch (error) {
    console.error('Failed to upload to IPFS:', error);
    throw error;
  }
};
