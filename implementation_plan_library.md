# Implementation Plan - Library UI Improvements

The goal is to transform the Library section into a fully functional, premium content hub with search, filtering, and enhanced visuals.

## User Review Required
> [!NOTE]
> This update adds state for search and filtering within `Home.jsx`. It changes the visual structure of the Library section.

## Proposed Changes

### Components
#### [MODIFY] [Home.jsx](file:///c:/Users/sumit/OneDrive/Mini%20Project/QuizifyAI/src/pages/Home.jsx)
- **Library Header**: Add a dedicated, styled header section with a background blurs/shapes.
- **Search Bar**: Add a glass-morphism search input with a search icon.
- **Filter Tabs**: Add pill-shaped tabs to filter by "All", "Quizzes", and "Flashcards".
- **Empty State**: Improve the "No quizzes found" state (if search yields no results).
- **Grid Animation**: Ensure staggered animations work correctly with filtered results.

### Logic
- Add `searchTerm` state.
- Add `filter` state (all/quiz/flashcard).
- Implement filtering logic before mapping over `quizzes`.

## Verification
- **Functional**: Test search by title working. Test tab switching working.
- **Visual**: Check responsiveness of the search bar and tabs on mobile.
- **Animation**: Verify items animate in/out when filtering.
