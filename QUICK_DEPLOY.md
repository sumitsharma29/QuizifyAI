# 🚀 Quick Deployment Guide - QuizifyAI to Netlify

## ⚡ TL;DR - What You Need to Do

### Step 1: Add Environment Variables to Netlify ⚙️
**CRITICAL - DO THIS FIRST!**

1. Go to: https://app.netlify.com → Your Site → **Site settings** → **Environment variables**
2. Click **"Add a variable"** and add these **8 variables**:

```
VITE_GEMINI_API_KEY = AIzaSyC0lKGyxwE2gxi3ApRkCv0x9B9OAwJCwRs
VITE_DEBUG_MODE = false
VITE_FIREBASE_API_KEY = AIzaSyAvCD6I00daGE6AkP3cMakPa4uEV0_2ES4
VITE_FIREBASE_AUTH_DOMAIN = quizifyai-fc278.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = quizifyai-fc278
VITE_FIREBASE_STORAGE_BUCKET = quizifyai-fc278.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 37708923114
VITE_FIREBASE_APP_ID = 1:37708923114:web:9d58b496ae154218419793
```

### Step 2: Push Code to GitHub 📤

```bash
git add .
git commit -m "Fix: Add Netlify Functions for quiz generation"
git push origin main
```

### Step 3: Wait for Deployment ⏳
Netlify will automatically deploy. Check the **Deploys** tab.

### Step 4: Test It! ✅
1. Visit your Netlify URL
2. Go to **Quiz Generator**
3. Try generating a quiz
4. It should work! 🎉

---

## 🔍 What Was Fixed?

**Problem**: Quiz generation worked on localhost but failed on Netlify
**Cause**: Express server doesn't run on Netlify (static hosting only)
**Solution**: Created Netlify serverless function to replace Express server

---

## 📁 Files Created/Modified

✅ **netlify/functions/generate.js** - NEW serverless function
✅ **netlify.toml** - Updated with function config
✅ **NETLIFY_DEPLOYMENT.md** - Full deployment guide
✅ **DEPLOYMENT_FIX_SUMMARY.md** - Technical summary

---

## 🐛 Troubleshooting

### Quiz generation still fails?

**Check 1**: Did you add environment variables to Netlify?
- Go to Site settings → Environment variables
- Verify all 8 variables are there

**Check 2**: Did the function deploy?
- Go to Netlify Dashboard → **Functions** tab
- You should see `generate` function listed

**Check 3**: Check the logs
- Functions tab → Click `generate` → View logs
- Look for errors

**Check 4**: Browser console
- Press F12 → Console tab
- Look for error messages

### Common Errors

❌ **"Failed to generate quiz"**
→ Environment variables not set on Netlify

❌ **"Server configuration error"**
→ `VITE_GEMINI_API_KEY` missing from Netlify env vars

❌ **404 on /api/generate**
→ Function didn't deploy, check Functions tab

---

## 📊 Architecture

### Before (Localhost Only)
```
Browser → Vite Dev Server → Express Server → Gemini API
```

### After (Works on Netlify)
```
Browser → Netlify Static Site → Netlify Function → Gemini API
```

---

## ✅ Deployment Checklist

- [ ] Added all 8 environment variables to Netlify
- [ ] Committed and pushed code to GitHub
- [ ] Netlify deployment succeeded
- [ ] Function appears in Functions tab
- [ ] Tested quiz generation (text mode)
- [ ] Tested quiz generation (topic mode)
- [ ] Tested quiz generation (file upload)
- [ ] No errors in browser console

---

## 🆘 Still Having Issues?

1. Read **NETLIFY_DEPLOYMENT.md** for detailed guide
2. Read **DEPLOYMENT_FIX_SUMMARY.md** for technical details
3. Check Netlify Function logs
4. Check browser console errors
5. Verify environment variables are set correctly

---

## 🔐 Security Notes

✅ API keys are in environment variables (not in code)
✅ `.env` files are in `.gitignore` (not committed)
✅ Netlify Function hides API key from browser
✅ Input sanitization implemented

---

**Need more help?** Check the detailed guides:
- `NETLIFY_DEPLOYMENT.md` - Step-by-step deployment
- `DEPLOYMENT_FIX_SUMMARY.md` - Technical summary
