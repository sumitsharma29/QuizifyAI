export const INITIAL_QUIZZES = [
  {
    id: 'science-101',
    title: 'Science & Nature',
    description: 'Test your knowledge of the natural world.',
    icon: 'atom',
    color: 'from-blue-500 to-cyan-400',
    questions: [
      { id: 1, text: 'Chemical symbol for Gold?', options: ['Au', 'Ag', 'Fe', 'Cu'], correctAnswer: 'Au' },
      { id: 2, text: 'The Red Planet?', options: ['Venus', 'Mars', 'Saturn', 'Jupiter'], correctAnswer: 'Mars' },
      { id: 3, text: 'Powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi'], correctAnswer: 'Mitochondria' }
    ]
  },
  {
    id: 'tech-trivia',
    title: 'Tech Revolution',
    description: 'Bits, bytes, and breakthroughs.',
    icon: 'cpu',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, text: 'HTTP stands for?', options: ['HyperText Transfer Protocol', 'HighTech Transfer', 'HyperText Transmission', 'Hybrid Text'], correctAnswer: 'HyperText Transfer Protocol' },
      { id: 2, text: 'Apple co-founder?', options: ['Bill Gates', 'Steve Wozniak', 'Tim Cook', 'Elon Musk'], correctAnswer: 'Steve Wozniak' }
    ]
  }
];
