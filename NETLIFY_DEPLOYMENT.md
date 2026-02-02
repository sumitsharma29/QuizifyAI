# Netlify Deployment Guide for QuizifyAI

## Problem Fixed
The quiz generation was failing on Netlify because the Express server (`server/index.js`) doesn't run on Netlify's static hosting. We've converted it to **Netlify Functions** (serverless).

## What Changed

### 1. Created Netlify Function
- **File**: `netlify/functions/generate.js`
- **Purpose**: Serverless function that proxies requests to Gemini API
- **Replaces**: The Express server for production deployments

### 2. Updated Configuration
- **File**: `netlify.toml`
- **Changes**:
  - Added `functions = "netlify/functions"` to build config
  - Added redirect from `/api/generate` to `/.netlify/functions/generate`

## Deployment Steps

### Step 1: Set Environment Variables on Netlify

**CRITICAL**: You must add your environment variables to Netlify:

1. Go to your Netlify dashboard
2. Navigate to: **Site settings** → **Environment variables**
3. Add the following variables:

```
VITE_GEMINI_API_KEY=AIzaSyC0lKGyxwE2gxi3ApRkCv0x9B9OAwJCwRs
VITE_DEBUG_MODE=false
VITE_FIREBASE_API_KEY=AIzaSyAvCD6I00daGE6AkP3cMakPa4uEV0_2ES4
VITE_FIREBASE_AUTH_DOMAIN=quizifyai-fc278.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=quizifyai-fc278
VITE_FIREBASE_STORAGE_BUCKET=quizifyai-fc278.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=37708923114
VITE_FIREBASE_APP_ID=1:37708923114:web:9d58b496ae154218419793
```

⚠️ **Important**: Without these environment variables, the app will not work on Netlify!

### Step 2: Push Changes to GitHub

```bash
git add .
git commit -m "Fix: Add Netlify Functions for quiz generation"
git push origin main
```

### Step 3: Deploy
Netlify will automatically deploy when you push to GitHub (if auto-deploy is enabled).

Or manually trigger a deploy from the Netlify dashboard.

### Step 4: Test
After deployment:
1. Visit your Netlify URL
2. Try generating a quiz
3. Check the browser console for any errors
4. Check Netlify Function logs if issues persist

## How It Works

### Local Development (localhost)
```
Frontend (Vite) → http://localhost:5173
         ↓
   /api/generate
         ↓
Backend (Express) → http://localhost:3000
         ↓
   Gemini API
```

### Production (Netlify)
```
Frontend (Static) → https://your-app.netlify.app
         ↓
   /api/generate
         ↓
Netlify Function → /.netlify/functions/generate
         ↓
   Gemini API
```

## Troubleshooting

### Issue: "Failed to generate quiz" on Netlify

**Check 1**: Environment Variables
- Go to Netlify dashboard → Site settings → Environment variables
- Verify `VITE_GEMINI_API_KEY` is set correctly

**Check 2**: Function Logs
- Go to Netlify dashboard → Functions tab
- Click on `generate` function
- Check the logs for errors

**Check 3**: Browser Console
- Open DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests to `/api/generate`

### Issue: CORS Errors

The Netlify function includes CORS headers. If you still see CORS errors:
- Check that the redirect in `netlify.toml` is working
- Verify the function is deployed (check Netlify Functions tab)

### Issue: API Key Not Found

Error: "Server configuration error"
- Solution: Add `VITE_GEMINI_API_KEY` to Netlify environment variables
- Redeploy after adding the variable

## Security Notes

✅ **Good**: API keys are stored as environment variables on Netlify
✅ **Good**: The Netlify function acts as a proxy, hiding the API key from the client
⚠️ **Note**: Your `.env` file contains API keys - ensure it's in `.gitignore`

## Alternative: Direct Client-Side Calls

If Netlify Functions don't work for you, you can modify `src/utils/generateWithGemini.js` to call Gemini API directly from the browser. However, this exposes your API key in the client code (less secure).

## Need Help?

If quiz generation still fails after following these steps:
1. Check Netlify Function logs
2. Check browser console errors
3. Verify all environment variables are set
4. Try a manual redeploy on Netlify
