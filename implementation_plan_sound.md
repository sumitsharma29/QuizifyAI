# Implementation Plan - Sound Effects & Toggle

Goal: Add interactive feedback sounds for Correct/Incorrect answers and Quiz Completion, with a user-controlled Mute toggle.

## User Review Required
> [!NOTE]
> I will use the **Web Audio API** to synthesize sounds (generating beeps/chimes via code) instead of loading MP3 files. This keeps the app fast and lightweight.

## Proposed Changes

### Logic & Utilities
#### [NEW] [src/utils/audio.js](file:///src/utils/audio.js)
- Create a `playSound(type)` function.
- Types: `correct` (high pitch chord), `wrong` (low pitch buzz), `complete` (ascending scale), `flip` (short click).
- Respect a global mute flag.

### State Management
#### [MODIFY] [src/App.jsx](file:///src/App.jsx)
- Add `soundEnabled` state (default: true).
- Persist preference in `localStorage`.
- Create `toggleSound` handler.

### UI Components
#### [MODIFY] [src/components/Header.jsx](file:///src/components/Header.jsx)
- Add a Volume/Mute icon button next to the Theme toggle.

#### [MODIFY] [src/pages/Play.jsx](file:///src/pages/Play.jsx)
- Trigger `playSound('correct')` or `playSound('wrong')` on answer.
- Trigger `playSound('complete')` on finish.

#### [MODIFY] [src/pages/FlashcardPlay.jsx](file:///src/pages/FlashcardPlay.jsx)
- Trigger `playSound('flip')` on card flip.

## Verification
- Test toggling sound ON/OFF.
- Verify sounds play only when ON.
- Verify sounds match the action (Green = Happy sound, Red = Sad sound).
