import * as Client from '@web3-storage/w3up-client';

let storageClient = null;

const initializeStorage = async () => {
  try {
    if (!storageClient) {
      // Check for required environment variables
      const loginEmail = process.env.REACT_APP_WEB3_STORAGE_EMAIL;
      const spaceDID = process.env.REACT_APP_WEB3_STORAGE_SPACE_DID;
      
      if (!loginEmail || !spaceDID) {
        const missing = [];
        if (!loginEmail) missing.push('REACT_APP_WEB3_STORAGE_EMAIL');
        if (!spaceDID) missing.push('REACT_APP_WEB3_STORAGE_SPACE_DID');
        throw new Error(`Missing environment variables: ${missing.join(', ')}`);
      }

      // Step 1: Create client
      console.log('Creating new storage client...');
      storageClient = await Client.create();
      
      // Step 2: Login with email
      console.log('Logging in...');
      await storageClient.login(loginEmail);

      // Step 3: Find target space by DID
      console.log('Listing spaces...');
      const spaces = await storageClient.spaces();
      const spaceDIDs = spaces.map(s => s.did());
      console.log('Available spaces:', spaceDIDs);

      if (!spaceDIDs.includes(spaceDID)) {
        throw new Error(`Target space ${spaceDID} not found in available spaces: ${spaceDIDs.join(', ')}`);
      }

      // Step 4: Set target space as current
      console.log('Setting target space as current...');
      await storageClient.setCurrentSpace(spaceDID);

      // Verify space is properly set up
      const currentSpace = await storageClient.currentSpace();
      if (!currentSpace || currentSpace.did() !== spaceDID) {
        throw new Error('Failed to initialize correct storage space');
      }
      
      console.log('Space setup complete');
    }
    
    return storageClient;
  } catch (error) {
    console.error('Storage initialization error:', error);
    throw new Error(`Storage initialization failed: ${error.message}`);
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

    // Step 5: Upload file
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
    console.error('Upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
}
