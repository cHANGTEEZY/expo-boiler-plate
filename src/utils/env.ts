const API_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Public API / Better Auth base URL (no trailing slash).
 * Set `EXPO_PUBLIC_API_URL` in `.env` (see `.env.example`).
 */
export function getApiUrl(): string {
  if (!API_URL) {
    if (__DEV__) {
      console.warn(
        "[env] EXPO_PUBLIC_API_URL is not set. API and auth requests will fail.",
      );
    }
    return "";
  }

  return API_URL.replace(/\/$/, "");
}
