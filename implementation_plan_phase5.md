# Implementation Plan - Phase 5: Polish & AI Explain

Goal: Ensure perfect responsiveness across all devices and add a high-value AI "Explain Answer" feature.

## User Review Required
> [!NOTE]
> I will be making style adjustments to ensure the app looks "Ultra Premium" on mobile devices (iPhone SE size up to Tablets).
> I will also add a **"Explain with AI"** button to the quiz results.

## Proposed Changes

### 📱 Responsiveness (Mobile First)
#### [MODIFY] [src/pages/Home.jsx](file:///src/pages/Home.jsx)
- Adjust Hero section padding for small screens.
- Ensure 3D Tilt Cards don't overflow on mobile.
- Optimize Font sizes for headers (`text-5xl` -> `text-3xl` on mobile).

#### [MODIFY] [src/pages/Play.jsx](file:///src/pages/Play.jsx)
- Stack layout for mobile (Question on top, Options below).
- Reduce padding in `glass` container for mobile to maximize space.

#### [MODIFY] [src/pages/FlashcardPlay.jsx](file:///src/pages/FlashcardPlay.jsx)
- Change fixed height (`h-96`) to responsive aspect ratio or dynamic height to fit small screens without scrolling.

### 🤖 Feature: AI Explain
#### [MODIFY] [src/utils/generateWithGemini.js](file:///src/utils/generateWithGemini.js)
- Add `explainAnswer(question, answer, userAnswer)` function to prompt Gemini for a brief explanation.

#### [MODIFY] [src/pages/Play.jsx](file:///src/pages/Play.jsx)
- Add "✨ Explain Why" button when an answer is revealed.
- Show a loading state and then the AI explanation in a nice glass card.

## Verification
- Resize window to 375px (iPhone SE) and check layouts.
- Test "Explain Why" button and verify Gemini response.
