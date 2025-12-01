import express from 'express';
import aiService from '../services/aiService.js';

const router = express.Router();

// POST /api/ai/chat - Main chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { messages, simulationData } = req.body;

    // Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ 
        error: 'Messages array is required' 
      });
    }

    if (!simulationData || !simulationData.category) {
      return res.status(400).json({ 
        error: 'Simulation data with category is required' 
      });
    }

    // Get AI response
    const result = await aiService.chat(messages, simulationData);

    res.json({
      success: true,
      message: result.message,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request',
      message: error.message 
    });
  }
});

// POST /api/ai/suggestions - Generate suggested questions
router.post('/suggestions', async (req, res) => {
  try {
    const { simulationData } = req.body;

    if (!simulationData) {
      return res.status(400).json({ 
        error: 'Simulation data is required' 
      });
    }

    const result = await aiService.generateSuggestions(simulationData);

    res.json({
      success: true,
      suggestions: result.suggestions,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Suggestions endpoint error:', error);
    res.status(500).json({ 
      error: 'Failed to generate suggestions',
      message: error.message 
    });
  }
});

export default router;
