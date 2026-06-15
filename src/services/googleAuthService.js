import { GOOGLE_CONFIG } from '../utils/constants';

let googleScriptPromise;

const loadGoogleScript = () => {
  if (window.google?.accounts?.oauth2) {
    return Promise.resolve(window.google);
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${GOOGLE_CONFIG.SCRIPT_URL}"]`);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google sign-in.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = GOOGLE_CONFIG.SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error('Failed to load Google sign-in.'));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
};

const getAccessToken = async () => {
  if (!GOOGLE_CONFIG.CLIENT_ID) {
    throw new Error('Google sign-in is not configured. Add VITE_GOOGLE_CLIENT_ID to enable it.');
  }

  const google = await loadGoogleScript();

  return new Promise((resolve, reject) => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CONFIG.CLIENT_ID,
      scope: GOOGLE_CONFIG.SCOPES,
      callback: (response) => {
        if (response?.error) {
          reject(new Error(response.error_description || 'Google sign-in was cancelled.'));
          return;
        }

        if (!response?.access_token) {
          reject(new Error('Google sign-in did not return an access token.'));
          return;
        }

        resolve(response.access_token);
      },
      error_callback: () => {
        reject(new Error('Unable to continue with Google sign-in.'));
      },
    });

    tokenClient.requestAccessToken({ prompt: 'select_account' });
  });
};

const googleAuthService = {
  getAccessToken,
};

export default googleAuthService;
