
<div align="center">

  <h1>✨ QuizifyAI</h1>
  
  <p>
    <strong>Unlock the Power of AI for Smarter Learning</strong>
  </p>

  <p>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white&style=for-the-badge" alt="React" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white&style=for-the-badge" alt="Vite" />
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge" alt="Tailwind CSS" />
    </a>
    <a href="https://firebase.google.com/">
      <img src="https://img.shields.io/badge/Firebase-11.1-FFCA28?logo=firebase&logoColor=black&style=for-the-badge" alt="Firebase" />
    </a>
     <a href="https://ai.google.dev/">
      <img src="https://img.shields.io/badge/Gemini_AI-API-8E75B2?logo=google-gemini&logoColor=white&style=for-the-badge" alt="Gemini AI" />
    </a>
    <a href="https://web.dev/progressive-web-apps/">
      <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white&style=for-the-badge" alt="PWA" />
    </a>
  </p>

  <p>
  QuizifyAI is a cutting-edge <strong>AI-powered quiz & flashcard generator</strong> that transforms any text, PDF, or topic into an interactive learning experience.  
  Built with performance and aesthetics in mind, it features a stunning dark-mode UI, PWA support, and seamless Gemini AI integration.
  </p>

  <br />

</div>

---

## 🚀 Features

Transform your study material into engaging learning assets in seconds.

- **🤖 AI-Powered Generation**: Leverage Google's Gemini API to generate smart, relevant questions and flashcards.
- **📄 Document to Quiz**: Upload PDF or text files, and let the AI extract key concepts.
- **✨ Interactive Flashcards**: 3D tilt-enabled flashcards for immersive memorization.
- **🧠 Intelligent Tutoring**: Get instant "Explain Why" feedback for any question, powered by AI.
- **📱 PWA Support**: Install as a native app on mobile/desktop with offline capabilities.
- **🎨 Ultra-Premium UI**: Fully responsive, dark-mode design with glassmorphism and smooth animations.
- **🏆 Gamification**: Real-time scoring, victory confetti, sound effects, and social sharing.
- **☁️ Cloud Sync**: Save your progress and library across devices using Firebase Auth & Firestore.

---

## 🛠️ Tech Stack

This project is built using modern web technologies for scalability and performance.

| Category | Technology |
| :--- | :--- |
| **Frontend** | [React 18](https://react.dev/), [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/) |
| **Backend/Auth** | [Firebase (Auth, Firestore)](https://firebase.google.com/) |
| **AI Integration** | [Google Gemini API](https://ai.google.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |

---

## 📦 Getting Started

Follow these steps to set up QuizifyAI locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sumitsharma29/QuizifyAI.git
    cd QuizifyAI
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    
    Create a `.env` file in the root directory and add your keys:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_key
    VITE_FIREBASE_API_KEY=your_firebase_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

    Open http://localhost:5173 to view it in the browser.

---

## 📂 Project Structure

```bash
QuizifyAI/
├── src/
│   ├── components/    # Reusable UI components (Cards, Buttons, Inputs)
│   ├── pages/         # Application routes (Home, Play, Results, Auth, etc.)
│   ├── utils/         # Helper functions (Gemini, Firestore, Sound, etc.)
│   ├── data/          # Static data & constants
│   ├── styles/        # Global styles & Tailwind configs
│   ├── App.jsx        # Main application component
│   └── firebase.js    # Firebase configuration
├── public/            # Static assets (PWA icons, etc.)
└── package.json       # Dependencies & scripts
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/sumitsharma29">Sumit Sharma</a></p>
</div>
