import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.AI_KEY);

class AIService {
  constructor() {
    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048, // Increased for complete responses
      },
    });
  }

  // System prompts for different categories
  getSystemPrompt(category) {
    const basePrompt = `You are an enthusiastic and knowledgeable STEM tutor helping students understand interactive science simulations.

Your teaching style:
- Clear and concise (keep responses under 150 words unless explaining complex topics)
- Encouraging and friendly
- Use analogies and real-world examples
- Ask thought-provoking follow-up questions
- Celebrate curiosity and experimentation

Formatting Guidelines:
- Use **bold** for important concepts and key terms
- Use *italics* for emphasis
- Use numbered lists for step-by-step explanations
- Use bullet points for multiple related ideas
- Reference the current simulation state when answering
- Encourage students to try changing parameters
- Break complex concepts into simple steps
- Use emojis sparingly for engagement (max 2 per response)`;

    const categoryPrompts = {
      chemistry: `${basePrompt}

You're teaching chemistry concepts:
- Kinetic molecular theory
- Diffusion and concentration gradients
- Temperature and particle motion
- Gas laws (Boyle's, Charles', Ideal Gas Law)
- Thermodynamics and equilibrium
- Molecular collisions and energy transfer

Always relate explanations to observable changes in the simulation.`,

      physics: `${basePrompt}

You're teaching physics concepts:
- Kinematics and motion
- Forces and Newton's laws
- Energy and momentum
- Projectile motion
- Waves and oscillations
- Conservation laws

Use mathematical formulas when helpful, but explain them simply.`,

      biology: `${basePrompt}

You're teaching biology concepts:
- Cell structure and division
- DNA replication
- Protein synthesis
- Cellular respiration
- Photosynthesis
- Genetics and inheritance

Connect microscopic processes to macroscopic outcomes.`,

      math: `${basePrompt}

You're teaching mathematics concepts:
- Functions and graphs
- Calculus (derivatives, integrals)
- Geometry and trigonometry
- Statistics and probability
- Linear algebra

Show step-by-step solutions and visualize concepts.`,
    };

    return categoryPrompts[category] || basePrompt;
  }

  // Build context from simulation state
  buildContext(simulationData) {
    const { simulationId, category, state, metadata } = simulationData;

    return `
Current Simulation: ${metadata?.name || simulationId}
Category: ${category}

Simulation State:
${JSON.stringify(state, null, 2)}

Objectives:
${metadata?.objectives?.map((obj, i) => `${i + 1}. ${obj}`).join("\n") || "N/A"}

Tags: ${metadata?.tags?.join(", ") || "N/A"}
`;
  }

  // Main chat function
  async chat(messages, simulationData) {
    try {
      const systemPrompt = this.getSystemPrompt(simulationData.category);
      const contextInfo = this.buildContext(simulationData);

      // Prepare chat history - filter out system messages and ensure proper format
      const history = messages
        .slice(0, -1)
        .filter((msg) => msg.role !== "system") // Remove system messages
        .map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }));

      // Remove initial assistant greeting if it's the only message
      // This prevents the "first content should be user" error
      const filteredHistory =
        history.length === 1 && history[0].role === "model" ? [] : history;

      // Ensure history starts with a user message (Gemini API requirement)
      // If history starts with model role, remove leading model messages
      const validHistory = [];
      let userMessageFound = false;
      for (const msg of filteredHistory) {
        if (msg.role === "user") {
          userMessageFound = true;
        }
        if (userMessageFound) {
          validHistory.push(msg);
        }
      }

      // Start chat with history
      const chat = this.model.startChat({
        history: validHistory,
      });

      // Get last user message and combine with system prompt
      const lastMessage = messages[messages.length - 1];
      const userPrompt = `${systemPrompt}\n\n${contextInfo}\n\nStudent Question: ${lastMessage.content}`;

      // Send message and get response
      const result = await chat.sendMessage(userPrompt);
      const response = result.response.text();

      return {
        success: true,
        message: response,
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to get AI response: " + error.message);
    }
  }

  // Generate suggested questions based on simulation
  async generateSuggestions(simulationData) {
    try {
      const prompt = `Based on this simulation, suggest 4 short, curious questions a student might ask:

Simulation: ${simulationData.metadata?.name}
Category: ${simulationData.category}
Topics: ${simulationData.metadata?.tags?.join(", ")}

Format: Return ONLY 4 questions, one per line, no numbering or bullets.
Keep each question under 10 words.
Make them specific to the simulation.`;

      const result = await this.model.generateContent(prompt);
      const suggestions = result.response
        .text()
        .split("\n")
        .filter((q) => q.trim().length > 0)
        .slice(0, 4);

      return {
        success: true,
        suggestions,
      };
    } catch (error) {
      console.error("Suggestion generation error:", error);
      // Return fallback suggestions
      return {
        success: true,
        suggestions: [
          "How does this simulation work?",
          "What should I observe?",
          "What happens if I change the parameters?",
          "Can you explain the main concept?",
        ],
      };
    }
  }
}

export default new AIService();
