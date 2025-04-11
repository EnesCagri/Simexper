"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function WebGLContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const buildPath = searchParams.get("build") || "/webgl-app/Test";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadStatus, setLoadStatus] = useState<string>("Initializing...");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Load your WebGL application
    const loadWebGLApp = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setLoadStatus("Creating iframe...");

        // Create an iframe to load your WebGL build
        const iframe = document.createElement("iframe");
        const fullPath = `${buildPath}/index.html`;
        console.log("Loading WebGL from:", fullPath);

        iframe.src = fullPath;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.allow = "fullscreen";

        // Handle iframe load errors
        iframe.onerror = (e) => {
          console.error("WebGL load error:", e);
          setError(
            `Failed to load the simulation from ${fullPath}. Please check the console for details.`
          );
          setIsLoading(false);
        };

        // Handle iframe load success
        iframe.onload = () => {
          setLoadStatus("Checking iframe content...");
          // Check if the iframe loaded successfully
          try {
            const iframeDoc =
              iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDoc) {
              throw new Error("Iframe document is null");
            }
            if (iframeDoc.readyState !== "complete") {
              throw new Error("Iframe document not ready");
            }
            console.log("WebGL iframe loaded successfully");
            setLoadStatus("Simulation ready!");
            setIsLoading(false);
          } catch (err) {
            console.error("Iframe load check error:", err);
            setError(
              "Failed to initialize the simulation. Please check the console for details."
            );
            setIsLoading(false);
          }
        };

        setLoadStatus("Appending iframe...");
        container.appendChild(iframe);

        // Cleanup function
        return () => {
          setLoadStatus("Cleaning up...");
          if (container.contains(iframe)) {
            container.removeChild(iframe);
          }
        };
      } catch (err) {
        console.error("WebGL load error:", err);
        setError(
          "An error occurred while loading the simulation. Please check the console for details."
        );
        setIsLoading(false);
      }
    };

    loadWebGLApp();
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
            {loadStatus}
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

export default function WebGLPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <WebGLContent />
    </Suspense>
  );
}
