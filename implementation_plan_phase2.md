# Implementation Plan - Phase 2 UI Improvements

The goal is to align the inner pages (`Generator`, `Play`, `Header`) with the new Premium Design System.

## User Review Required
> [!NOTE]
> This applies the new **Glassmorphism** style to the input forms and quiz cards, replacing standard white backgrounds.

## Proposed Changes

### Components
#### [MODIFY] [Header.jsx](file:///c:/Users/sumit/OneDrive/Mini%20Project/QuizifyAI/src/components/Header.jsx)
- **Glass Effect**: Replace manual `bg-white/80` with `.glass` utility.
- **Logo**: Update logo font to `Outfit` and increase weight.
- **Nav Items**: Add hover animations (underline slide).

#### [MODIFY] [Generator.jsx](file:///c:/Users/sumit/OneDrive/Mini%20Project/QuizifyAI/src/pages/Generator.jsx)
- **Input Cards**: Apply `.glass` class to the mode selection and input containers.
- **Buttons**: Update active state to use a gradient border instead of solid color for a cleaner look.
- **Animations**: Add `stagger` effect to settings options.

#### [MODIFY] [Play.jsx](file:///c:/Users/sumit/OneDrive/Mini%20Project/QuizifyAI/src/pages/Play.jsx)
- **Quiz Container**: Make the main question card translucent (`.glass`) to show the mesh gradient background (if added globally or to this page).
- **Option Buttons**: Modernize selection state with a "glow" effect instead of simple color change.

## Verification
- **Visual Check**:
  - Header blurs content underneath when scrolling.
  - Generator inputs are readable against the background.
  - Quiz options have a satisfying "click" feel.
