import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

const predefinedResponses = {
  hello: "Hey there! 👋 I'm Bashir's assistant. How can I help you today?",
  hi: "Hey there! 👋 I'm Bashir's assistant. How can I help you today?",
  hey: "Hey there! 👋 I'm Bashir's assistant. How can I help you today?",
  projects: "You can check out Bashir's projects on the Projects page. He's worked on e-commerce platforms, data visualization tools, mobile apps, and more!",
  contact: "You can reach Bashir via email at bashir@example.com, or connect on LinkedIn and GitHub. Check the Contact section for more details!",
  skills: "Bashir is skilled in React, TypeScript, Node.js, Next.js, PostgreSQL, MongoDB, and many other modern technologies. He specializes in building scalable full-stack applications.",
  experience: "Bashir has extensive experience in frontend and fullstack development, working on projects ranging from e-commerce platforms to real-time collaborative tools.",
  about: "Bashir is a passionate frontend/fullstack developer who loves building modern, scalable web applications. You can learn more on the About page!",
  help: "I can answer questions about Bashir's projects, skills, experience, and how to get in touch. Just ask away!",
  hire: "Bashir is currently open to opportunities! You can reach out via the contact form or email at bashir@example.com.",
  availability: "Bashir is currently open to new opportunities and freelance projects. Feel free to get in touch!",
  progress: "Bashir tracks his weekly progress with detailed logs covering projects, achievements, challenges, and learnings. Check out the 'What I'm Working On' button on the homepage to see his latest activity!",
  working: "Want to see what Bashir is currently working on? Click the 'What I'm Working On' button on the homepage to view his latest weekly logs and GitHub activity!",
};

const getResponse = (input ) => {
  const normalizedInput = input.toLowerCase().trim();
  
  // Check for exact matches
  if (predefinedResponses[normalizedInput]) {
    return predefinedResponses[normalizedInput];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(predefinedResponses)) {
    if (normalizedInput.includes(key)) {
      return value;
    }
  }
  
  // Default response
  return "I'm here to help! You can ask me about Bashir's projects, skills, experience, or how to get in touch. What would you like to know?";
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! I'm Bashir's virtual assistant. Ask me about his work, skills, or how to get in touch!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-96 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <h3 className="font-medium dark:text-white">Bashir's Assistant</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                >
                  <Minimize2 className="w-4 h-4 dark:text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                >
                  <X className="w-4 h-4 dark:text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}