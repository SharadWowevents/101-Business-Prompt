import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { UserCredentials, PromptItem } from './types';
import { LoginGateway } from './components/LoginGateway';
import { PromptLibrary } from './components/PromptLibrary';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserCredentials | null>(null);
  const [prompts, setPrompts] = useState<PromptItem[]>([]);

  const handleLoginSuccess = async (credentials: UserCredentials) => {
    setUser(credentials);
    setIsAuthenticated(true);
    
    // Fetch live prompts from your new Express backend once logged in
    try {
      const res = await fetch('/api/prompts');
      const data = await res.json();
      setPrompts(data);
    } catch (error) {
      console.error("Failed to load prompts from DB", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPrompts([]); // Clear memory on logout
  };

  return (
    <div id="app-root" className="min-h-screen bg-[var(--navy)] text-[var(--text)]">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login-view-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <LoginGateway onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        ) : (
          <motion.div
            key="library-view-container"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <PromptLibrary
              prompts={prompts}
              user={user}
              onLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}