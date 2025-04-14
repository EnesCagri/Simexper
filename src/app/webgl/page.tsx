"use client";

import UnityGame from "@/components/UnityGame";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket, Gamepad2, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/simulations" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="flex items-center gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 pt-24 pb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 bg-opacity-10">
            <Rocket className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Unity WebGL Demo
            </h1>
            <p className="text-muted-foreground">
              Interactive 3D Physics Simulation
            </p>
          </div>
        </div>

        {/* Game Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative rounded-xl overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm"
        >
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg p-2 border border-border/50">
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Unity WebGL</span>
          </div>
          <UnityGame />
        </motion.div>
      </motion.div>
    </div>
  );
}
