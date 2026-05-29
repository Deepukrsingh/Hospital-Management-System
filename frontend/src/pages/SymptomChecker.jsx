import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaExclamationTriangle } from 'react-icons/fa';
import api from '../utils/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SymptomChecker = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello! I am the Medicure AI Assistant. I can help you understand your symptoms, but please remember I am an AI, not a doctor. If this is an emergency, call 911 immediately. How are you feeling today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  
  const { isAuthenticated } = useSelector(state => state.auth);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Format history for Gemini (excluding the first initial greeting for cleaner context, or include it)
      const history = messages.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await api.post('/ai/symptom-checker', {
        message: userMessage,
        history: history
      });

      setMessages(prev => [...prev, { role: 'model', text: response.data.response }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Sorry, I am having trouble connecting to the medical database right now. Please try again later.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-10 rounded-3xl shadow-premium border border-white/50 max-w-md w-full text-center"
        >
          <div className="bg-gradient-premium w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FaRobot className="text-4xl text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">AI Symptom Checker</h2>
          <p className="text-gray-400 mb-8 text-lg font-medium">Please log in to use our AI-powered symptom checker and get personalized health guidance.</p>
          <Link to="/login" className="block w-full bg-gradient-premium text-white py-4 rounded-xl font-bold shadow-premium hover:shadow-premium-hover transition-all transform hover:-translate-y-1">
            Log In to Continue
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-8 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-140px)] flex flex-col relative z-10">
        
        {/* Header */}
        <div className="glass rounded-t-3xl shadow-sm border-b border-white/10 p-6 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-premium p-3 rounded-2xl shadow-md">
              <FaRobot className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">AI Symptom Checker</h1>
              <p className="text-sm text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Online & Ready
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-amber-500/20 shadow-sm">
            <FaExclamationTriangle className="text-sm" /> Not a substitute for professional medical advice
          </div>
        </div>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 glass glass-dark/40 shadow-sm overflow-y-auto p-6 space-y-6 scroll-smooth border-x border-white/10">
          {messages.map((msg, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 mt-1">
                  {msg.role === 'user' ? (
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <FaUser className="text-white text-sm" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gradient-premium rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <FaRobot className="text-white text-sm" />
                    </div>
                  )}
                </div>
                <div className={`p-5 rounded-3xl shadow-sm ${msg.role === 'user' ? 'bg-gradient-premium text-white rounded-tr-none' : 'glass-dark/90 backdrop-blur-md border border-white/10 text-white rounded-tl-none'}`}>
                  <p className="whitespace-pre-wrap leading-relaxed font-medium">{msg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-gradient-premium rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    <FaRobot className="text-white text-sm" />
                  </div>
                </div>
                <div className="glass-dark/90 backdrop-blur-md border border-white/10 p-5 rounded-3xl rounded-tl-none flex items-center gap-2 shadow-sm">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="glass rounded-b-3xl shadow-sm border-t border-white/10 p-5 z-10 relative">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms (e.g., 'I have a headache and mild fever')..."
              className="flex-1 glass-dark backdrop-blur-sm border-none shadow-sm rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary font-medium text-white transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all transform ${
                loading || !input.trim() ? 'glass-dark/50 text-gray-400 cursor-not-allowed shadow-none' : 'bg-gradient-premium text-white shadow-premium hover:shadow-premium-hover hover:-translate-y-1'
              }`}
            >
              <span className="hidden sm:inline">Send</span> <FaPaperPlane />
            </button>
          </form>
          <div className="text-center mt-4 md:hidden">
             <p className="text-xs font-bold text-amber-400 bg-amber-500/10 backdrop-blur-sm py-2 rounded-lg flex items-center justify-center gap-1.5 border border-amber-500/20">
                <FaExclamationTriangle /> Not for medical emergencies
             </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SymptomChecker;
