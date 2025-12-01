import aiService from './services/aiService.js';

// Test data mimicking what the frontend sends
const testMessages = [
  {
    role: 'assistant',
    content: "Hi! I'm your chemistry tutor 🎓 Ask me anything about this simulation!",
    timestamp: Date.now()
  },
  {
    role: 'user',
    content: 'How does this simulation work?',
    timestamp: Date.now()
  }
];

const testSimulationData = {
  simulationId: 'diffusion-demo',
  category: 'chemistry',
  state: {
    temperature: 300,
    particleCount: 100
  },
  metadata: {
    name: 'Gas Diffusion',
    objectives: ['Understand molecular motion', 'Observe diffusion patterns'],
    tags: ['chemistry', 'diffusion', 'kinetic theory']
  }
};

console.log('Testing AI chat with initial assistant message...\n');

aiService.chat(testMessages, testSimulationData)
  .then(result => {
    console.log('✅ Success!');
    console.log('Response:', result.message);
  })
  .catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
