
// Logic to determine the API URL dynamically
const getApiUrl = () => {
    // For Netlify (or any external access) to work with local backend, we use the Tunnel URL
    // NOTE: You MUST run 'npm run tunnel' locally for this to work!
    return 'https://anup-evoting-demo.loca.lt';
};

export const API_BASE_URL = getApiUrl();
