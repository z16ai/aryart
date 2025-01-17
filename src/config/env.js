// Verify and export environment variables
const env = {
  WEB3_STORAGE_KEY: process.env.REACT_APP_WEB3_STORAGE_KEY,
  STABILITY_API_KEY: process.env.REACT_APP_STABILITY_API_KEY
};

// Log environment configuration status
console.log('Environment configuration status:', {
  WEB3_STORAGE_KEY: env.WEB3_STORAGE_KEY ? 'Configured' : 'Not configured',
  STABILITY_API_KEY: env.STABILITY_API_KEY ? 'Configured' : 'Not configured'
});

export default env;
