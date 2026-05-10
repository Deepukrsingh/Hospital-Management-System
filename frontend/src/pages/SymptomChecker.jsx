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
  const messagesEndRef = useRef(null);
  
  const { isAuthenticated } = useSelector(state => state.auth);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaRobot className="text-3xl text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Symptom Checker</h2>
          <p className="text-gray-600 mb-6">Please log in to use our AI-powered symptom checker and get personalized health guidance.</p>
          <Link to="/login" className="block w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition">
            Log In to Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-140px)] flex flex-col">
        
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-sm border-b border-gray-100 p-6 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <FaRobot className="text-2xl text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Symptom Checker</h1>
              <p className="text-sm text-green-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
            <FaExclamationTriangle /> Not a substitute for professional medical advice
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white shadow-sm overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 mt-1">
                  {msg.role === 'user' ? (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser className="text-gray-500 text-sm" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <FaRobot className="text-white text-sm" />
                    </div>
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <FaRobot className="text-white text-sm" />
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-2xl shadow-sm border-t border-gray-100 p-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms (e.g., 'I have a headache and mild fever')..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition ${
                loading || !input.trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              <span className="hidden sm:inline">Send</span> <FaPaperPlane />
            </button>
          </form>
          <div className="text-center mt-3 md:hidden">
             <p className="text-xs text-amber-600 flex items-center justify-center gap-1">
                <FaExclamationTriangle /> Not for medical emergencies
             </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SymptomChecker;
