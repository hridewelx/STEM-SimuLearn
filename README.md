
# STEM SimuLearn

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

An interactive STEM learning platform with AI-powered tutoring capabilities. Experience personalized education through real-time feedback and engaging simulations.

---

## Features

- **Interactive Learning:** Engaging modules designed to make STEM concepts accessible.
- **AI-Powered Tutor:** Integrated with Google's Gemini AI for personalized assistance.
- **Real-time Feedback:** Instant responses to guide your learning journey.
- **Responsive Design:** Optimized for a seamless experience across all devices.
- **Modern UI:** Built with React, TailwindCSS, and DaisyUI for a polished look.

---

## Project Showcase

Here are some screenshots of STEM SimuLearn:

### Gas Diffusion
<img width="1918" height="966" alt="image" src="https://github.com/user-attachments/assets/b766840c-6856-4c97-957e-4f3cb4d3502f" />

### Advanced Reaction Lab
<img width="1919" height="971" alt="image" src="https://github.com/user-attachments/assets/1da7bcc7-9abd-426e-abf8-aadcfe2d7c13" />
<img width="1918" height="966" alt="image" src="https://github.com/user-attachments/assets/01fa13cb-48fd-4c71-801d-dfdf3d9a68f5" />

---

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - TailwindCSS + DaisyUI
  - Zustand (State Management)
  - Axios
- **Backend:**
  - Node.js
  - Express.js
  - Google Generative AI (Gemini)
  - dotenv

---

## File Structure

```
STEM SimuLearn/
├── frontend/          # React + Vite + TypeScript frontend
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/           # Express.js API backend
│   ├── src/
│   ├── package.json
│   └── ...
├── package.json       # Root package.json for managing both
└── README.md          # This file
```

---

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn
  ```sh
  npm install npm@latest -g
  ```

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your_username/stem-simulearn.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd stem-simulearn
    ```
3.  Install all dependencies (Frontend & Backend):
    ```sh
    npm run install-all
    ```

### Configuration

1.  **Backend:** Create a `.env` file in the `backend/` directory:
    ```env
    PORT=3000
    AI_KEY=your_gemini_api_key_here
    ```
2.  **Frontend (Optional):** Create a `.env` file in the `frontend/` directory:
    ```env
    VITE_API_URL=http://localhost:3000
    ```

### Running the App

Start both the frontend and backend concurrently:

```sh
npm run dev
```

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:3000`

---

## 🤝 Contribution

Contributions are welcome!

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a pull request

---

**Made with ❤️ for open source!**

---

## License

This project is licensed under the ISC License.

---

## 📧 Contact

<a href="https://x.com/hridewel" style="text-decoration: none; margin-right: 20px;">
  <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" style="vertical-align: middle;" />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://www.linkedin.com/in/hridoychowdhury/" style="text-decoration: none;">
  <img src="https://cdn-icons-png.flaticon.com/24/174/174857.png" alt="LinkedIn" style="vertical-align: middle;" /> 
</a>

Feel free to reach out!
