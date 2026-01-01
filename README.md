
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
  </p>

  <p>
  QuizifyAI is a cutting-edge <strong>AI-powered quiz generator</strong> that transforms any text or PDF into an interactive learning experience.  
  Built with performance and aesthetics in mind, it features a stunning dark-mode UI and seamless Gemini AI integration.
  </p>

  <br />

</div>

---

## 🚀 Features

Transform your study material into engaging quizzes in seconds.

- **🤖 AI-Powered Generation**: Leverage Google's Gemini API to generate smart, relevant questions from any topic.
- **📄 Document to Quiz**: Upload PDF or text files, and let the AI extract key concepts for your quiz.
- **🎨 Stunning UI**: A fully responsive, dark-mode first design with smooth animations and glassmorphism effects.
- **🏆 Interactive Gameplay**: Play quizzes with real-time scoring, feedback, and summary results.
- **⚡ Blazing Fast**: Powered by Vite and React for instant load times and smooth transitions.
- **🛠️ Customizability**: Adjustable difficulty levels and question counts.

---

## 🛠️ Tech Stack

This project is built using modern web technologies for scalability and performance.

| Category | Technology |
| :--- | :--- |
| **Frontend** | [React 18](https://react.dev/), [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **AI Integration** | [Google Gemini API](https://ai.google.dev/) |
| **Deployment** | (Ready for Vercel/Netlify) |

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
    
    You need a Google Gemini API key to use the AI generation features.
    
    Open `src/utils/generateWithGemini.js` and update the key:
    ```javascript
    // src/utils/generateWithGemini.js
    const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
    ```
    *(Note: For production, it is recommended to use a `.env` file.)*

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
│   ├── pages/         # Application routes (Home, Quiz, Result)
│   ├── utils/         # Helper functions & API logic (Gemini integration)
│   ├── data/          # Static data & constants
│   ├── styles/        # Global styles & Tailwind configs
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Entry point
├── public/            # Static assets
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
