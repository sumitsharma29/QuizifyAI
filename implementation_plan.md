# Implementation Plan - Premium UI Overhaul

The goal is to elevate the design of QuizifyAI to a "World Class" standard using modern design trends.

## User Review Required
> [!NOTE]
> This will change the global font family and significantly alter the visual identity of the landing page.

## Proposed Changes

### Global Styles
#### [MODIFY] [index.html](file:///c:/Users/sumit/OneDrive/Mini%20Project/QuizifyAI/index.html)
- Add **Google Fonts**: `Outfit` (sans-serif) for headings and UI.
- Update **CSP**: Allow fonts from `fonts.googleapis.com` and `fonts.gstatic.com`.

#### [MODIFY] [index.css](file:///c:/Users/sumit/OneDrive/Mini%20Project/QuizifyAI/src/index.css)
- Set `font-family: 'Outfit', sans-serif`.
- Add **Mesh Gradient** animations (CSS keyframes).
- Add `glass` utility class for consistent frosted glass effects.

### Components
#### [MODIFY] [Card.jsx](file:///c:/Users/sumit/OneDrive/Mini%20Project/QuizifyAI/src/components/Card.jsx)
- **Hover Effects**: Add a subtle "glow" border using `group-hover`.
- **Depth**: Increase shadow depth on hover for 3D feel.

#### [MODIFY] [Home.jsx](file:///c:/Users/sumit/OneDrive/Mini%20Project/QuizifyAI/src/pages/Home.jsx)
- **Hero Section**: Replace static blobs with a **Live Animated Mesh Gradient**.
- **Typography**: Increase contrast and size of the main headline.
- **Buttons**: Update to "shiny" pill-shaped buttons.

## Verification
- **Visual Check**:
  - Fonts load correctly (no flickering).
  - Gradient animation is smooth (< 60fps impact).
  - Dark mode contrast remains accessible.
