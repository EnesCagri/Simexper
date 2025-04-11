"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function WebGLPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const buildPath = searchParams.get("build") || "/webgl-app/Test";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load your WebGL application
    const loadWebGLApp = async () => {
      if (containerRef.current) {
        try {
          setIsLoading(true);
          setError(null);

          // Create an iframe to load your WebGL build
          const iframe = document.createElement("iframe");
          iframe.src = `${buildPath}/index.html`;
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.border = "none";

          // Handle iframe load errors
          iframe.onerror = () => {
            setError("Failed to load the simulation. Please try again later.");
            setIsLoading(false);
          };

          // Handle iframe load success
          iframe.onload = () => {
            setIsLoading(false);
          };

          containerRef.current.appendChild(iframe);
        } catch (err) {
          setError("An error occurred while loading the simulation.");
          setIsLoading(false);
        }
      }
    };

    loadWebGLApp();

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [buildPath]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-[hsl(var(--border))]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/simulations">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Simulations
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Error Alert */}
      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="animate-pulse text-muted-foreground">
            Loading simulation...
          </div>
        </div>
      )}

      {/* WebGL Container */}
      <div
        ref={containerRef}
        className="w-full h-screen pt-16"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--primary),0.1), transparent 50%)",
        }}
      />
    </div>
  );
}
