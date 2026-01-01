export const generateFallbackQuiz = (text, title = "Generated Quiz", count = 5) => {
  let segments = text.match(/[^\.?!]+[\.?!]+/g);
  if (!segments || segments.length < 3)
    segments = text.split(/\n/).filter(l => l.trim().length > 15);
  if (!segments || segments.length < 3)
    segments = text.split(/\s{4,}/).filter(c => c.trim().length > 15);

  const questions = [];
  const allWords = text.split(/\s+/).map(w => w.replace(/[^\w]/g, ''));
  const uniqueWords = [...new Set(allWords)].filter(w => w.length > 4);

  (segments || []).forEach((sentence, index) => {
    if (questions.length >= count) return;
    const cleanSentence = sentence.trim();
    if (cleanSentence.length < 20) return;

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

      questions.push({
        id: `gen-${index}`,
        text: questionText,
        options: [...distractors, correctWord].sort(() => Math.random() - 0.5),
        correctAnswer: correctWord
      });
    }
  });

  return {
    id: `fallback-${Date.now()}`,
    title,
    description: 'Generated using basic text analysis.',
    icon: 'sparkles',
    color: 'from-slate-500 to-slate-600',
    questions: questions.length > 0 ? questions : []
  };
};
