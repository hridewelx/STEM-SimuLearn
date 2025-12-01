# STEM SimuLearn Backend API

Backend server for AI Tutor functionality using Google Gemini API.

## Features

- 🤖 **AI Chat** - Contextual responses based on simulation state
- 💡 **Smart Suggestions** - Auto-generated questions
- 🎓 **Category-Specific** - Tailored prompts for Physics, Chemistry, Biology, Math
- 🔒 **CORS Enabled** - Secure frontend integration

## Tech Stack

- **Node.js** + **Express.js**
- **Google Gemini AI** (1.5 Flash)
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Variables**
Create `.env` file (already exists):
```env
AI_KEY=your_gemini_api_key_here
PORT=3515
```

3. **Start Server**
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoints

### POST `/api/ai/chat`
Send a message to the AI tutor.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "Why are particles moving faster?", "timestamp": 1234567890 }
  ],
  "simulationData": {
    "simulationId": "diffusion-1",
    "category": "chemistry",
    "state": {
      "params": { "leftTemp": 300, "rightTemp": 500 },
      "isRunning": true
    },
    "metadata": {
      "name": "Gas Diffusion",
      "objectives": ["..."],
      "tags": ["diffusion", "kinetic theory"]
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "The particles on the right are moving faster because...",
  "timestamp": 1234567890
}
```

### POST `/api/ai/suggestions`
Generate suggested questions for a simulation.

**Request Body:**
```json
{
  "simulationData": {
    "simulationId": "diffusion-1",
    "category": "chemistry",
    "metadata": {
      "name": "Gas Diffusion",
      "tags": ["diffusion", "gas laws"]
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "suggestions": [
    "How does temperature affect diffusion?",
    "What is kinetic molecular theory?",
    "Why do gases mix?",
    "What happens at equilibrium?"
  ],
  "timestamp": 1234567890
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "STEM SimuLearn API is running"
}
```

## Project Structure

```
backend/
├── server.js              # Express server setup
├── routes/
│   └── aiRoutes.js       # AI endpoints
├── services/
│   └── aiService.js      # Gemini API integration
├── middleware/           # Custom middleware (if needed)
├── .env                  # Environment variables
└── package.json
```

## Error Handling

All endpoints return proper HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing/invalid data)
- `500` - Server Error (AI API failure, etc.)

## Notes

- Using Gemini 1.5 Flash (free tier: 60 requests/minute)
- Context-aware responses based on simulation state
- Category-specific system prompts for better educational content
- Built-in fallback suggestions if AI fails

## Development

```bash
# Watch mode with auto-restart
npm run dev

# Manual restart
npm start
```

## License

MIT
