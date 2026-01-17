"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export function FollowToast() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has dismissed the toast before
    const dismissed = localStorage.getItem("follow-toast-dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("follow-toast-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 right-0 z-50 pointer-events-none"
    >
      <div className="px-4 sm:px-6 pb-4">
        <div className="relative pointer-events-auto">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-lg shadow-2xl backdrop-blur-sm">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">EÇB</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Enes Çağrı Bayraktutan
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            {/* Gradient accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-lg" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

