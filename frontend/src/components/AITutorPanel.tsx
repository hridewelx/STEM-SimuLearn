import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  X,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Send,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import aiTutorService, {
  AIMessage,
  SimulationData,
} from "../services/aiTutorService";
import { useTranslation } from "react-i18next";

interface AITutorPanelProps {
  simulationData: SimulationData;
  className?: string;
}

type DisplayMode = "floating" | "sidebar" | "minimized";

const AITutorPanel = ({
  simulationData,
  className = "",
}: AITutorPanelProps) => {
  const { i18n } = useTranslation();
  const [mode, setMode] = useState<DisplayMode>("minimized");
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: "assistant",
      content: `Hi! I'm your ${simulationData.category} tutor 🎓 Ask me anything about this simulation!`,
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<
    number | null
  >(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [speechSupported, setSpeechSupported] = useState<{
    supported: boolean;
    voicesAvailable: boolean;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check speech support on mount
  useEffect(() => {
    const checkSupport = async () => {
      const support = await aiTutorService.checkSpeechSupport();
      setSpeechSupported(support);
      console.log("🔊 Speech support:", support);
    };
    checkSupport();
  }, []);

  // Load suggestions on mount
  useEffect(() => {
    loadSuggestions();
  }, [simulationData.simulationId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadSuggestions = async () => {
    const sug = await aiTutorService.getSuggestions({
      ...simulationData,
      language: i18n.language,
    });
    setSuggestions(sug);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: AIMessage = {
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await aiTutorService.sendMessage(
        [...messages, userMessage],
        { ...simulationData, language: i18n.language }
      );

      const assistantMessage: AIMessage = {
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Auto-speak if voice enabled and supported
      if (voiceEnabled && speechSupported?.voicesAvailable) {
        speakMessage(response);
      }
    } catch (error: any) {
      const errorMessage: AIMessage = {
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message}. Please try again!`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakMessage = async (text: string, messageIndex?: number) => {
    if (!speechSupported?.voicesAvailable) {
      console.log("🔇 Voice not available, skipping speech");
      return;
    }

    try {
      setIsSpeaking(true);
      if (messageIndex !== undefined) {
        setSpeakingMessageIndex(messageIndex);
      }

      await aiTutorService.speak(text, () => {
        console.log("✅ Speech ended callback");
        setIsSpeaking(false);
        setSpeakingMessageIndex(null);
      });
    } catch (error) {
      console.error("Speech failed:", error);
      setIsSpeaking(false);
      setSpeakingMessageIndex(null);
    }
  };

  const toggleVoice = () => {
    if (voiceEnabled) {
      aiTutorService.stopSpeaking();
      setIsSpeaking(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  // Render based on mode
  if (mode === "minimized") {
    return (
      <button
        onClick={() => setMode("floating")}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 animate-pulse group"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </button>
    );
  }

  const containerClasses =
    mode === "floating"
      ? `fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`
      : `fixed right-0 top-0 h-screen w-[420px] bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col ${className}`;

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-6 h-6" />
            {isSpeaking && (
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">STEM SimuLearn Tutor</h3>
            <p className="text-xs opacity-90 capitalize">
              {simulationData.category}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={toggleVoice}
            disabled={!speechSupported?.supported}
            className={`p-2 rounded-lg transition-all ${
              voiceEnabled ? "bg-white/30" : "hover:bg-white/20"
            } ${
              !speechSupported?.supported ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title={
              !speechSupported?.supported
                ? "Voice not supported in this browser"
                : voiceEnabled
                ? "Disable voice"
                : "Enable voice"
            }
          >
            {voiceEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() =>
              setMode(mode === "floating" ? "sidebar" : "floating")
            }
            className="p-2 hover:bg-white/20 rounded-lg transition"
            title={mode === "floating" ? "Dock to side" : "Float window"}
          >
            {mode === "floating" ? (
              <Maximize2 className="w-5 h-5" />
            ) : (
              <Minimize2 className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setMode("minimized")}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            title="Minimize"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Voice Not Available Warning */}
      {speechSupported && !speechSupported.voicesAvailable && voiceEnabled && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>
            Voice not available in this browser. Using text-only mode.
          </span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-tr-none"
                  : "bg-white dark:bg-gray-100 text-gray-800 dark:text-white rounded-tl-none shadow-md"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    Tutor
                  </span>
                </div>
              )}

              {/* Render markdown for assistant messages */}
              {msg.role === "assistant" ? (
                <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-strong:text-purple-600 dark:prose-strong:text-purple-400 prose-em:text-gray-700 dark:prose-em:text-gray-300">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              )}

              {msg.role === "assistant" && speechSupported?.voicesAvailable && (
                <button
                  onClick={() => speakMessage(msg.content, index)}
                  disabled={isSpeaking && speakingMessageIndex === index}
                  className="mt-2 text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 disabled:opacity-50"
                >
                  {isSpeaking && speakingMessageIndex === index ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Speaking...</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3 h-3" />
                      <span>Listen</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-md">
              <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && messages.length <= 2 && (
        <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Try asking:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => sendMessage(suggestion)}
                className="text-xs px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(inputValue);
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 font-medium"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AITutorPanel;
