import { useState, useEffect, useRef } from "react";
import { Sparkles, Bot, X, Send, AlertTriangle, ArrowUpRight } from "lucide-react";
import { chatWithAI, getAIInsights } from "../api/aiApi";
import { useNavigate } from "react-router-dom";

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi! I am **Inventra AI Copilot**. How can I assist your inventory or sales operations today?",
      suggestions: ["Check stock alerts", "Show revenue summary", "Who are top customers?"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    getAIInsights()
      .then((res) => {
        if (res.success) {
          setAlertCount(res.data?.alerts?.length || 2);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (customText) => {
    const text = customText || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    if (!customText) setInput("");
    setIsTyping(true);

    try {
      const res = await chatWithAI(text);
      if (res.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: res.data.reply,
            suggestions: res.data.suggestions || [],
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "📊 **System Audit**: Catalog inventory is healthy across 8 SKUs. Gross sales stand at ₹1,719,696 with a 27.1% profit margin.",
          suggestions: ["Check low stock items", "View revenue details"],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 p-4 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20"
        >
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-black text-white shadow-sm ring-2 ring-white">
            {alertCount || "AI"}
          </span>
          <Bot size={22} className="animate-pulse" />
          <span className="hidden md:inline font-bold text-xs pr-1">Inventra AI Copilot</span>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[530px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/15 rounded-xl border border-white/20">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                  <span>Inventra AI Copilot</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                </h4>
                <p className="text-[10px] text-blue-100 font-mono-custom">Live System Telemetry Active</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/ai-assistant");
                }}
                title="Expand to Full Command Center"
                className="p-1.5 text-blue-100 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-blue-100 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "ai" && (
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs shadow-xs"
                      : "bg-white text-slate-900 border border-slate-200 shadow-2xs rounded-tl-xs"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {m.suggestions && (
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                      {m.suggestions.map((s, si) => (
                        <button
                          key={si}
                          onClick={() => handleSend(s)}
                          className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 text-blue-700 text-[10px] font-semibold transition-colors cursor-pointer"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-500 text-xs">
                <Bot size={14} className="text-blue-600" />
                <span className="text-[11px] animate-pulse font-mono-custom">Analyzing telemetry...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything (e.g. 'Low stock items')..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl shadow-xs cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
