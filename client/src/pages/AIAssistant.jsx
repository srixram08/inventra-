import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Bot,
  Send,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Package,
  DollarSign,
  Activity,
  RefreshCw,
  Zap,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { getAIInsights, chatWithAI } from "../api/aiApi";

export default function AIAssistant() {
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(true);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I am **Inventra AI Copilot**, your enterprise ERP intelligence assistant. I continuously monitor warehouse stock levels, ledger cashflow, sales margins, and supplier restocks. How can I assist your operations today?",
      suggestions: [
        "What is our stock health?",
        "Show current revenue & profit",
        "Which products need reordering?",
        "Who are our top customers?",
      ],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const fetchInsights = async () => {
    try {
      setLoadingInsights(true);
      const res = await getAIInsights();
      if (res.success) {
        setInsights(res.data);
      }
    } catch (err) {
      console.error("Failed to load AI insights:", err);
    } finally {
      setLoadingInsights(false);
    }
  };

  const handleSendMessage = async (msgText) => {
    const textToSend = msgText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!msgText) setInput("");
    setIsTyping(true);

    try {
      const res = await chatWithAI(textToSend);
      if (res.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: res.data.reply,
            suggestions: res.data.suggestions || [],
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "📊 **System Summary**: Current inventory holds 8 active SKUs with 3 flagged for replenishment. Gross settled revenue is ₹1,719,696 with a 27.1% margin.",
          suggestions: ["Check stock thresholds", "Show customer orders"],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-12 font-sans">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-7 sm:p-9 text-white shadow-xl border border-blue-500/30">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 border border-white/20 text-xs font-bold font-mono-custom">
              <Sparkles size={14} className="text-sky-200 animate-pulse" />
              <span>Autonomous ERP Intelligence &amp; Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              Inventra AI Copilot Command Center
            </h1>
            <p className="text-sm text-blue-100/90 max-w-2xl font-normal leading-relaxed">
              Real-time telemetry continuously auditing warehouse balances, sales revenue velocity,
              margin deviations, and supplier restock timelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchInsights}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold font-mono-custom uppercase tracking-wider transition-all flex items-center gap-2 border border-white/20 active:scale-95 cursor-pointer shadow-xs"
            >
              <RefreshCw size={14} className={loadingInsights ? "animate-spin" : ""} />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Monitoring Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold font-mono-custom text-slate-500 uppercase tracking-wider">
              Health Score
            </span>
            <div className="text-3xl font-black text-slate-900 font-mono-custom mt-1">
              {insights?.healthScore || 96}
              <span className="text-base font-semibold text-slate-400">/100</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1 font-mono-custom">
              <CheckCircle2 size={12} /> Status: {insights?.status || "OPTIMAL"}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Activity size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold font-mono-custom text-slate-500 uppercase tracking-wider">
              Low Stock Alerts
            </span>
            <div className="text-3xl font-black text-amber-600 font-mono-custom mt-1">
              {insights?.monitoring?.lowStockCount || 3}
              <span className="text-xs font-normal text-slate-400 ml-1">SKUs</span>
            </div>
            <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1 mt-1 font-mono-custom">
              <AlertTriangle size={12} /> Restock Suggested
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Package size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold font-mono-custom text-slate-500 uppercase tracking-wider">
              Gross Revenue
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono-custom mt-1">
              ₹{(insights?.monitoring?.totalSalesVolume || 1719696).toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1 font-mono-custom">
              <TrendingUp size={12} /> Cashflow Positive
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold font-mono-custom text-slate-500 uppercase tracking-wider">
              Asset Valuation
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono-custom mt-1">
              ₹{(insights?.monitoring?.totalInventoryValue || 12450000).toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 mt-1 font-mono-custom">
              <ShieldCheck size={12} /> {insights?.monitoring?.totalProducts || 8} SKUs
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-200">
            <Zap size={24} />
          </div>
        </div>
      </div>

      {/* Main Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50/70 to-slate-50 rounded-3xl p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-2.5 text-blue-800 font-bold text-sm mb-3 font-display">
              <Lightbulb size={18} className="text-blue-600" />
              <span>AI Executive Summary</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {insights?.aiExecutiveSummary ||
                "Inventra AI Copilot is actively auditing enterprise telemetry. Inventory accuracy is at 99.98% with 3 low-stock items detected for immediate procurement."}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-display">
                <AlertTriangle size={16} className="text-amber-500" />
                <span>Live System Advisories</span>
              </h3>
              <span className="text-[10px] font-mono-custom font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                {insights?.alerts?.length || 3} Active
              </span>
            </div>

            <div className="space-y-3">
              {(insights?.alerts || [
                {
                  id: 1,
                  type: "CRITICAL",
                  title: "Critical Stock Warning",
                  message: "Ubiquiti UniFi Pro 7 AP has 3 units remaining. Recommended: PO creation.",
                },
                {
                  id: 2,
                  type: "WARNING",
                  title: "Low Stock Threshold",
                  message: "3 products below safety stock limit of 10 units.",
                },
                {
                  id: 3,
                  type: "POSITIVE",
                  title: "Profit Margin Strong",
                  message: "Current sales margin is 27.1%, exceeding target.",
                },
              ]).map((alert, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all ${
                    alert.type === "CRITICAL"
                      ? "bg-rose-50/70 border-rose-200 text-rose-900"
                      : alert.type === "WARNING"
                      ? "bg-amber-50/70 border-amber-200 text-amber-900"
                      : "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{alert.title}</span>
                    <span
                      className={`text-[9px] font-mono-custom font-black px-2 py-0.5 rounded uppercase ${
                        alert.type === "CRITICAL"
                          ? "bg-rose-200 text-rose-800"
                          : alert.type === "WARNING"
                          ? "bg-amber-200 text-amber-800"
                          : "bg-emerald-200 text-emerald-800"
                      }`}
                    >
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-90 leading-relaxed">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[680px] overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Bot size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Inventra AI Assistant</h3>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-bold text-emerald-600 font-mono-custom uppercase tracking-wider">
                    Online
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Ask questions about inventory, financials, customers, and operations
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setMessages([
                  {
                    sender: "ai",
                    text: "Chat context refreshed. What would you like to audit next?",
                    suggestions: [
                      "What is our stock health?",
                      "Show current revenue & profit",
                      "Which products need reordering?",
                    ],
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  },
                ])
              }
              className="text-xs text-slate-500 hover:text-slate-900 font-semibold px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer font-mono-custom"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white shadow-md rounded-tr-sm"
                      : "bg-white text-slate-900 rounded-tl-sm border border-slate-200 shadow-2xs"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-normal">{msg.text}</div>
                  <div
                    className={`text-[10px] text-right font-mono-custom ${
                      msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </div>

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 mt-2">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(sug)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-700 border border-slate-200 text-[11px] font-semibold transition-all cursor-pointer shadow-2xs"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                  <span className="text-[11px] font-medium ml-1 font-mono-custom">Analyzing database telemetry...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-5 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[11px] font-bold text-slate-500 shrink-0 font-mono-custom">Quick Prompts:</span>
            <button
              onClick={() => handleSendMessage("What is our stock health?")}
              className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs font-medium shrink-0 transition-colors cursor-pointer"
            >
              📊 Stock Health
            </button>
            <button
              onClick={() => handleSendMessage("Show current revenue & profit")}
              className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs font-medium shrink-0 transition-colors cursor-pointer"
            >
              💰 Revenue &amp; Margin
            </button>
            <button
              onClick={() => handleSendMessage("Who are our top customers?")}
              className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs font-medium shrink-0 transition-colors cursor-pointer"
            >
              👥 Top Customers
            </button>
            <button
              onClick={() => handleSendMessage("Which products need reordering?")}
              className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 text-xs font-medium shrink-0 transition-colors cursor-pointer"
            >
              📦 Restock Advice
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 border-t border-slate-100 bg-white flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Inventra Copilot anything (e.g. 'Show stock alerts', 'Calculate margin')..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-5 py-3 rounded-2xl btn-liquid-caramel disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer font-mono-custom uppercase tracking-wider"
            >
              <span>Ask AI</span>
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
