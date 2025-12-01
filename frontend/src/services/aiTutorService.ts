import axiosClient from "../utils/axiosClient";

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface SimulationData {
  simulationId: string;
  category: string;
  state: Record<string, any>;
  metadata?: {
    name?: string;
    objectives?: string[];
    tags?: string[];
  };
}

class AITutorService {
  private isSpeaking = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  async sendMessage(
    messages: AIMessage[],
    simulationData: SimulationData
  ): Promise<string> {
    try {
      const response = await axiosClient.post("/api/ai/chat", {
        messages,
        simulationData,
      });

      if (response.data.success) {
        return response.data.message;
      } else {
        throw new Error("Failed to get AI response");
      }
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      throw new Error(
        error.response?.data?.message || "Failed to connect to AI tutor"
      );
    }
  }

  async getSuggestions(simulationData: SimulationData): Promise<string[]> {
    try {
      const response = await axiosClient.post("/api/ai/suggestions", {
        simulationData,
      });

      if (response.data.success) {
        return response.data.suggestions;
      } else {
        return this.getFallbackSuggestions();
      }
    } catch (error) {
      console.error("Suggestions Error:", error);
      return this.getFallbackSuggestions();
    }
  }

  private getFallbackSuggestions(): string[] {
    return [
      "How does this simulation work?",
      "What should I observe?",
      "What happens if I change parameters?",
      "Can you explain the main concept?",
    ];
  }

  // Improved voice detection with better browser compatibility
  private async initializeVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      // Check if speech synthesis is available
      if (!this.isSpeechSupported()) {
        console.warn('❌ Speech synthesis not supported');
        resolve([]);
        return;
      }

      // Get voices immediately
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log('🗣️ Voices available immediately:', voices.length);
        resolve(voices);
        return;
      }

      // Set up voiceschanged event with timeout
      const voicesChangedHandler = () => {
        const loadedVoices = window.speechSynthesis.getVoices();
        console.log('🗣️ Voices loaded via event:', loadedVoices.length);
        window.speechSynthesis.onvoiceschanged = null;
        resolve(loadedVoices);
      };

      window.speechSynthesis.onvoiceschanged = voicesChangedHandler;

      // Fallback: Some browsers need a trigger to load voices
      setTimeout(() => {
        const timeoutVoices = window.speechSynthesis.getVoices();
        if (timeoutVoices.length > 0) {
          console.log('⏰ Voices loaded via timeout:', timeoutVoices.length);
          window.speechSynthesis.onvoiceschanged = null;
          resolve(timeoutVoices);
        } else {
          // Last attempt: try speaking a silent utterance to trigger voice loading
          this.triggerVoiceLoad().then(resolve);
        }
      }, 1000);
    });
  }

  private async triggerVoiceLoad(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      try {
        // Create a silent utterance to trigger voice loading
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0;
        utterance.onend = () => {
          const voices = window.speechSynthesis.getVoices();
          console.log('🔇 Silent utterance completed, voices:', voices.length);
          resolve(voices);
        };
        utterance.onerror = () => {
          const voices = window.speechSynthesis.getVoices();
          console.log('❌ Silent utterance failed, voices:', voices.length);
          resolve(voices);
        };
        
        window.speechSynthesis.speak(utterance);
        // Cancel immediately - we just want to trigger loading
        setTimeout(() => {
          window.speechSynthesis.cancel();
        }, 10);
      } catch (error) {
        console.error('Error triggering voice load:', error);
        resolve(window.speechSynthesis.getVoices());
      }
    });
  }

  private isSpeechSupported(): boolean {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  // Get the best available voice for the current browser
  private getBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (voices.length === 0) return null;

    // Priority order for voice selection
    const voicePreferences = [
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en') && v.localService === false, // Cloud voices
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-US'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en-GB'),
      (v: SpeechSynthesisVoice) => v.lang.startsWith('en'),
      (v: SpeechSynthesisVoice) => v.default,
    ];

    for (const preference of voicePreferences) {
      const voice = voices.find(preference);
      if (voice) {
        console.log('🎯 Selected voice:', voice.name, voice.lang, voice.localService);
        return voice;
      }
    }

    return voices[0];
  }

  // Text-to-Speech with enhanced browser compatibility
  async speak(text: string, onEnd?: () => void): Promise<void> {
    if (!this.isSpeechSupported()) {
      console.warn('Speech synthesis not supported in this browser');
      if (onEnd) onEnd();
      return;
    }

    // Cancel any ongoing speech
    this.stopSpeaking();

    const voices = await this.initializeVoices();
    if (voices.length === 0) {
      console.warn('No voices available in this browser');
      if (onEnd) onEnd();
      return;
    }

    const cleanText = this.cleanTextForSpeech(text);
    if (!cleanText.trim()) {
      if (onEnd) onEnd();
      return;
    }

    return new Promise((resolve) => {
      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        this.currentUtterance = utterance;

        // Configure utterance for better compatibility
        const voice = this.getBestVoice(voices);
        if (voice) {
          utterance.voice = voice;
        }

        // Settings that work well across browsers
        utterance.rate = 0.9; // Slightly slower for better comprehension
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => {
          console.log('🎙️ Speech started');
          this.isSpeaking = true;
        };

        utterance.onend = () => {
          console.log('✅ Speech completed');
          this.isSpeaking = false;
          this.currentUtterance = null;
          if (onEnd) onEnd();
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('❌ Speech error:', event.error);
          this.isSpeaking = false;
          this.currentUtterance = null;
          
          // Try fallback without specific voice for problematic browsers
          if (event.error === 'not-allowed' || event.error === 'synthesis-failed') {
            console.log('🔄 Attempting fallback speech...');
            this.fallbackSpeak(cleanText, onEnd).then(resolve);
          } else {
            if (onEnd) onEnd();
            resolve();
          }
        };

        // Add a small delay to ensure clean state
        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 50);

      } catch (error) {
        console.error('Error creating utterance:', error);
        if (onEnd) onEnd();
        resolve();
      }
    });
  }

  // Fallback method for problematic browsers
  private async fallbackSpeak(text: string, onEnd?: () => void): Promise<void> {
    return new Promise((resolve) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Minimal configuration for fallback
        utterance.rate = 0.9;
        utterance.volume = 1.0;

        utterance.onend = () => {
          this.isSpeaking = false;
          if (onEnd) onEnd();
          resolve();
        };

        utterance.onerror = () => {
          this.isSpeaking = false;
          if (onEnd) onEnd();
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Fallback speech also failed:', error);
        this.isSpeaking = false;
        if (onEnd) onEnd();
        resolve();
      }
    });
  }

  private cleanTextForSpeech(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic
      .replace(/`(.*?)`/g, '$1')       // Remove code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/#{1,6}\s?/g, '')       // Remove headers
      .replace(/\n+/g, '. ')           // Convert newlines to pauses
      .replace(/\s+/g, ' ')            // Normalize whitespace
      .replace(/\s*([.,!?])\s*/g, '$1 ') // Proper punctuation spacing
      .trim();
  }

  stopSpeaking() {
    if (this.isSpeechSupported()) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  // Enhanced speech support check
  async checkSpeechSupport(): Promise<{ 
    supported: boolean; 
    voicesAvailable: boolean;
    browser: string;
    mobile: boolean;
  }> {
    const supported = this.isSpeechSupported();
    let voicesAvailable = false;
    
    if (supported) {
      const voices = await this.initializeVoices();
      voicesAvailable = voices.length > 0;
    }

    // Detect browser and device type for better debugging
    const userAgent = navigator.userAgent.toLowerCase();
    const browser = this.detectBrowser(userAgent);
    const mobile = this.isMobileDevice();

    return {
      supported,
      voicesAvailable,
      browser,
      mobile
    };
  }

  private detectBrowser(userAgent: string): string {
    if (userAgent.includes('chrome')) return 'chrome';
    if (userAgent.includes('firefox')) return 'firefox';
    if (userAgent.includes('safari')) return 'safari';
    if (userAgent.includes('edge')) return 'edge';
    if (userAgent.includes('opera')) return 'opera';
    if (userAgent.includes('brave')) return 'brave';
    return 'unknown';
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Get current speech state
  getSpeechState() {
    return {
      isSpeaking: this.isSpeaking,
      isSupported: this.isSpeechSupported()
    };
  }
}

export default new AITutorService();