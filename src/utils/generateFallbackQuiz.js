export const generateFallbackQuiz = (text, title = "Generated Quiz", count = 5, format = "quiz") => {
  let segments = text.match(/[^\.?!]+[\.?!]+/g);
  if (!segments || segments.length < 3)
    segments = text.split(/\n/).filter(l => l.trim().length > 15);
  if (!segments || segments.length < 3)
    segments = text.split(/\s{4,}/).filter(c => c.trim().length > 15);

  const items = [];
  const allWords = text.split(/\s+/).map(w => w.replace(/[^\w]/g, ''));
  const uniqueWords = [...new Set(allWords)].filter(w => w.length > 4);

  (segments || []).forEach((sentence, index) => {
    if (items.length >= count) return;
    const cleanSentence = sentence.trim();
    if (cleanSentence.length < 20) return;

    // Common logic: find a keyword
    const words = cleanSentence.split(/\s+/);
    let targetWordIndex = words.findIndex(w => /\d+/.test(w));
    if (targetWordIndex === -1)
      targetWordIndex = words.findIndex((w, i) => i > 0 && /^[A-Z]/.test(w) && w.length > 3);

    if (targetWordIndex === -1) {
      let maxLength = 0;
      words.forEach((w, i) => {
        if (w.length > maxLength && w.length > 5) {
          maxLength = w.length;
          targetWordIndex = i;
        }
      });
    }

    if (targetWordIndex !== -1) {
      const correctWord = words[targetWordIndex].replace(/[^\w]/g, '');
      if (!correctWord) return;

      if (format === "flashcard") {
        // FLASHCARD LOGIC
        // Front: The Term (Keyword)
        // Back: The Sentence (Context/Definition)
        items.push({
          id: `fc-${index}`,
          front: correctWord,
          back: cleanSentence,
          mastered: false
        });
      } else {
        // QUIZ LOGIC
        const questionText = words.map((w, i) => i === targetWordIndex ? '______' : w).join(' ');
        const distractors = [];
        const usedDistractors = new Set([correctWord]);
        let attempts = 0;

        while (distractors.length < 3 && attempts < 50) {
          const randomWord = uniqueWords[Math.floor(Math.random() * uniqueWords.length)];
          if (randomWord && !usedDistractors.has(randomWord) && randomWord !== correctWord) {
            distractors.push(randomWord);
            usedDistractors.add(randomWord);
          }
          attempts++;
        }

        while (distractors.length < 3) {
          distractors.push(['True', 'False', 'None', 'All'][distractors.length]);
        }

        items.push({
          id: `gen-${index}`,
          text: questionText,
          options: [...distractors, correctWord].sort(() => Math.random() - 0.5),
          correctAnswer: correctWord
        });
      }
    }
  });

  return {
    id: `fallback-${Date.now()}`,
    title,
    description: format === 'flashcard' ? 'Generated Flashcard Set' : 'Generated using basic text analysis.',
    icon: format === 'flashcard' ? 'zap' : 'sparkles',
    color: format === 'flashcard' ? 'from-fuchsia-500 to-pink-500' : 'from-slate-500 to-slate-600',
    type: format,
    questions: items.length > 0 ? items : [] // "questions" serves as generic "items" holder
  };
};
