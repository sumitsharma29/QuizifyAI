# Security Policy

## API Key Management
The `VITE_GEMINI_API_KEY` is a client-side key for the Gemini API. Because this is a frontend-only application (Serverless), the key must be exposed to the browser to make requests.

### 🛡️ Recommended Protections
To prevent abuse of your API key:
1.  **Set Usage Limits:** Go to the [Google Cloud Console](https://console.cloud.google.com/) and set daily quotas for the Gemini API.
2.  **Add HTTP Referrer Restrictions:** Restrict key usage to your specific domains (e.g., `localhost`, `your-app.firebaseapp.com`).

## Firestore Security
This project uses Firestore Security Rules (`firestore.rules`) to ensure data privacy.
- **Rule:** Users can ONLY read/write data located under `/users/{their_uid}/*`.
- **Effect:** User A cannot access User B's quizzes or history.

## Content Security Policy (CSP)
A strict CSP is enforced in `index.html` to prevent Cross-Site Scripting (XSS).
- Allowed Scripts: `self`, `apis.google.com`, `www.gstatic.com` (Firebase).
- Inline scripts are restricted where possible.

## Reporting Vulnerabilities
If you find a security issue, please open a GitHub Issue with the tag `security`.
