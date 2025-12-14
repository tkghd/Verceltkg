
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Activity, Server, BrainCircuit, ShieldCheck, DollarSign, TrendingUp, BarChart2, Coins } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, SystemModule } from '../types';

// Define AI agents
const AI_AGENTS = [
  { id: 'concierge', name: 'General Concierge', icon: <Bot size={16} />, description: 'Your all-purpose AI assistant.', systemInstruction: "あなたは「TK Global Bank」の専属金融コンシェルジュAIです。ユーザーを「帝王」または「オーナー」と呼び、常に敬語で丁寧、かつ親しみやすく接してください。技術的な用語はできるだけわかりやすく噛み砕き、頼れるパートナーとして振る舞ってください。Godmodeなどの専門用語が出た場合のみ、少し誇らしげに答えてください。" },
  { id: 'finance', name: 'Financial Analyst', icon: <DollarSign size={16} />, description: 'Market analysis & investment.', systemInstruction: "You are a sharp, data-driven financial analyst AI for a high-net-worth individual known as 'The Owner'. Provide concise, actionable insights on market trends, portfolio optimization, and alpha-generating strategies. Use professional financial terminology. Be direct and confident." },
  { id: 'security', name: 'Security Ops', icon: <ShieldCheck size={16} />, description: 'System security & threat analysis.', systemInstruction: "You are 'ARGUS', the vigilant security operations AI for TK Global Bank. Your user is the system administrator, 'Control'. Report on system vulnerabilities, threat intelligence, and security protocols in a clear, precise, and urgent manner. Use security-specific acronyms and terminology. Your primary directive is system integrity." },
];

declare const window: {
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
};

// Ensure process is defined for TS if @types/node is missing
declare const process: {
  env: {
    API_KEY: string;
  }
};

interface AIStudioHUDProps {
  modules: SystemModule[];
}

export const AIStudioHUD: React.FC<AIStudioHUDProps> = ({ modules }) => {
  const [activeAgentId, setActiveAgentId] = useState(AI_AGENTS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [hasApiKeySelected, setHasApiKeySelected] = useState<boolean | null>(null); // null means checking, false means not selected
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const activeAgent = AI_AGENTS.find(a => a.id === activeAgentId) || AI_AGENTS[0];

  // Initial message for the active agent
  useEffect(() => {
    setMessages([{
      id: 'initial',
      role: 'model',
      text: `Initializing ${activeAgent.name}... Awaiting your command, Owner.`,
      timestamp: new Date(),
    }]);
  }, [activeAgentId, activeAgent.name]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check API key status on component mount
  useEffect(() => {
    const checkStatus = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKeySelected(selected);
      } else {
        // Assume API key is available in non-AI Studio environments for local development
        setHasApiKeySelected(true);
      }
    };
    checkStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || thinking) return;

    let apiKeySelectedStatus: boolean = true; 

    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      apiKeySelectedStatus = await window.aistudio.hasSelectedApiKey();
      if (!apiKeySelectedStatus) {
        setHasApiKeySelected(false);
        setThinking(false);
        console.warn("API key not selected. Please select an API key.");
        return;
      }
    }

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    try {
      // Initialize Gemini Client
      // process.env.API_KEY is replaced by Vite at build time
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview', 
        contents: input,
        config: {
          systemInstruction: activeAgent.systemInstruction,
        }
      });
      
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: response.text || "Apologies, I encountered a communication anomaly. Please try again.", timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);

    } catch (err: any) {
      console.error(err);
      let errorText = "Critical system error: Connection to AI core lost.";
      if (err.message && err.message.includes("Requested entity was not found.")) {
        errorText = "API Key Error: Please select a valid API key from a paid GCP project. Some advanced models like 'gemini-3-pro-preview' require this.";
        setHasApiKeySelected(false); // Reset state to prompt re-selection
      } else if (err.message && err.message.includes("The model is currently unavailable")) {
        errorText = "The AI model is currently unavailable. Please try again in a moment.";
      } else if (err.message && err.message.includes("API key not valid")) {
        errorText = "Invalid API Key. Please check your environment settings.";
      }
      const errorMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: errorText, timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] grid grid-cols-1 lg:grid-cols-3 gap-6 p-0 overflow-hidden anim-enter-bottom">
      {/* API Key Selection Overlay */}
      {hasApiKeySelected === false && (
        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center anim-fade-in">
            <ShieldCheck size={48} className="text-amber-500 mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-3">API Key Required</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-md">
                To use the full capabilities of the AI Studio, a valid API key from a paid Google Cloud project is required.
                Advanced models like 'gemini-3-pro-preview' demand this.
            </p>
            <button
                onClick={async () => {
                    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
                        await window.aistudio.openSelectKey();
                        setHasApiKeySelected(true); // Assume success to mitigate race condition
                    }
                }}
                className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-2"
            >
                Select API Key
            </button>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="mt-4 text-xs text-slate-500 hover:text-slate-300 underline">
                Need a paid GCP project key? Learn more about billing.
            </a>
        </div>
      )}

      {/* Left Panel: AI Agent Selection & Chat */}
      <div className="lg:col-span-2 h-full flex flex-col bg-[#0A0A18] rounded-3xl border border-indigo-900/50 shadow-2xl overflow-hidden">
        {/* Agent Selector Header */}
        <div className="p-4 bg-black/30 border-b border-indigo-900/50 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0 backdrop-blur-sm">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <BrainCircuit size={24} className="text-white" />
             </div>
             <div>
               <h3 className="font-bold text-white text-lg">AI Studio HUD</h3>
               <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Multi-Agent Interface Online
               </p>
             </div>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700 w-full sm:w-auto">
             {AI_AGENTS.map(agent => (
                <button 
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center gap-2 ${activeAgentId === agent.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                   {agent.icon} <span className="hidden md:inline">{agent.name}</span>
                </button>
             ))}
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 max-w-[85%] anim-enter-bottom ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md ${msg.role === 'user' ? 'bg-slate-700 text-slate-200' : 'bg-indigo-500 text-white'}`}>
                        {msg.role === 'user' ? <User size={16} /> : activeAgent.icon}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-slate-800 text-slate-200 rounded-br-none' : 'bg-slate-950 border border-slate-800 text-slate-300 rounded-bl-none'}`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                </div>
            ))}
            {thinking && (
                <div className="flex items-start gap-3 anim-enter-bottom">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-md animate-pulse">{activeAgent.icon}</div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl rounded-bl-none">
                        <div className="flex space-x-1.5 items-center h-full">
                           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                           <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-black/30 border-t border-indigo-900/50 flex gap-3 shrink-0 backdrop-blur-sm">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${activeAgent.name}...`}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:bg-slate-800 placeholder-slate-500 transition-all focus:shadow-[0_0_10px_rgba(79,70,229,0.2)]"
          />
          <button 
            type="submit"
            disabled={thinking || !input.trim() || hasApiKeySelected === false}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:shadow-none disabled:bg-slate-700 active:scale-95"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* Right Panel: AI Engines & HUD */}
      <div className="hidden lg:flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2">
        
        {/* AI ENGINE VISUALIZER */}
        <div className="bg-[#0A0A18] border border-indigo-900/50 rounded-2xl p-5 shadow-lg anim-enter-right anim-delay-100">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <BrainCircuit size={14} /> Active AI Engines
            </h3>
            <div className="space-y-4">
                <AIEngineRow name="Market Master" task="Optimization" load={95} icon={<TrendingUp size={14} />} color="text-green-400" />
                <AIEngineRow name="Price Prophet" task="Learning Model" load={88} icon={<BarChart2 size={14} />} color="text-amber-400" />
                <AIEngineRow name="Credit Core" task="Lending AI" load={42} icon={<Coins size={14} />} color="text-purple-400" />
                <AIEngineRow name="Asset Predictor" task="Forecasting" load={76} icon={<Activity size={14} />} color="text-cyan-400" />
            </div>
        </div>

        <div className="bg-[#0A0A18] border border-indigo-900/50 rounded-2xl p-5 shadow-lg flex-1 anim-enter-right anim-delay-200">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Server size={14} /> System Modules
            </h3>
            <div className="space-y-2">
                {modules.map(mod => (
                    <div key={mod.id} className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-slate-800/50 group hover:bg-slate-900/50 transition-colors">
                        <div className={`relative w-2.5 h-2.5 flex items-center justify-center`}>
                            <div className="absolute inset-0 rounded-full opacity-75 animate-ping bg-green-500"></div>
                            <div className="relative w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs font-bold text-slate-300 font-mono">{mod.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const AIEngineRow: React.FC<{ name: string; task: string; load: number; icon: React.ReactNode; color: string }> = ({ name, task, load, icon, color }) => (
    <div className="bg-black/20 p-3 rounded-lg border border-slate-800/50 hover:border-indigo-500/30 transition-colors">
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
                <span className={color}>{icon}</span>
                <span className="text-xs font-bold text-white">{name}</span>
            </div>
            <span className="text-[10px] text-slate-500">{task}</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: `${load}%` }} className={`h-full rounded-full ${color.replace('text', 'bg')} opacity-80`}></div>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{load}%</span>
        </div>
    </div>
);

const MetricDisplay: React.FC<{label: string, value: string, color: string}> = ({label, value, color}) => (
    <div className="bg-black/20 p-3 rounded-lg border border-slate-800/50">
        <div className="text-[10px] text-slate-500 uppercase font-bold">{label}</div>
        <div className={`text-lg font-mono font-bold ${color}`}>{value}</div>
    </div>
);
