import * as Client from '@web3-storage/w3up-client';

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
    // Create client and authenticate
    const client = await Client.create();
    const loginEmail = process.env.REACT_APP_WEB3_STORAGE_EMAIL;
    const spaceDID = process.env.REACT_APP_WEB3_STORAGE_SPACE_DID;
    
    if (!loginEmail || !spaceDID) {
      throw new Error('Missing configuration: email or space DID');
    }

    // Login and set space
    await client.login(loginEmail);
    await client.setCurrentSpace(spaceDID);

    // Get space and list uploads
    console.log('Fetching uploads from space:', spaceDID);
    const space = await client.currentSpace();
    
    // List all uploads in the space
    console.log('Listing uploads...');
    const uploadList = await client.capability.upload.list();
    console.log('Upload list:', uploadList);

    const images = [];

    // Process uploads from the results array
    if (uploadList && uploadList.results && Array.isArray(uploadList.results)) {
      uploadList.results.slice(0, 100).forEach(upload => {
        if (!upload || !upload.root) return;

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
      });
    }

    console.log(`Found ${images.length} images`);

    // Randomly shuffle the images instead of sorting by date
    return shuffleArray(images);
  } catch (error) {
    console.error('Error fetching space images:', error);
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}
