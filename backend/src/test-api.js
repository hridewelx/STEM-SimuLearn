import fetch from 'node-fetch';

const testData = {
  messages: [
    {
      role: 'assistant',
      content: "Hi! I'm your chemistry tutor 🎓 Ask me anything about this simulation!",
      timestamp: Date.now() - 5000
    },
    {
      role: 'user',
      content: 'hi',
      timestamp: Date.now()
    }
  ],
  simulationData: {
    simulationId: 'diffusion',
    category: 'chemistry',
    state: {
      leftTemp: 300,
      rightTemp: 300,
      isRunning: false,
      hasDivider: true
    },
    metadata: {
      name: 'Molecular Diffusion',
      objectives: ['Understand diffusion', 'Observe particle motion'],
      tags: ['diffusion', 'kinetic theory']
    }
  }
};

console.log('Testing AI Chat API...');
console.log('Sending request to http://localhost:3515/api/ai/chat');

fetch('http://localhost:3515/api/ai/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(res => res.json())
  .then(data => {
    console.log('\n✅ Success!');
    console.log('Response:', data);
  })
  .catch(error => {
    console.error('\n❌ Error:', error.message);
  });
