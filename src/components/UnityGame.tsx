"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getSimulationBySlug } from "@/db/utils";

export default function UnityGame() {
  const [isMounted, setIsMounted] = useState(false);
  const [indexHtmlPath, setIndexHtmlPath] = useState<string>(
    "/webgl-app/Basic/index.html"
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    // Only set path on client side to avoid hydration mismatch
    const simulation = slug ? getSimulationBySlug(slug) : null;
    const webglPath = simulation?.webglPath || "/webgl-app/Basic";
    const path = `${webglPath}/index.html`;
    setIndexHtmlPath(path);
    setIsMounted(true);

    // Debug: log the path
    if (simulation) {
      console.log("Simulation found:", simulation.title);
      console.log("WebGL Path:", webglPath);
      console.log("Index HTML Path:", path);
    }
  }, [slug]);

  useEffect(() => {
    if (!isMounted) return;

    // Listen for postMessage from iframe for fullscreen requests
    const handleMessage = (event: MessageEvent) => {
      console.log("Message received:", event.data, "from:", event.origin);

      // Check if message is from iframe and is fullscreen request
      if (event.data && event.data.type === "unity-fullscreen") {
        console.log("Fullscreen request received from iframe");

        // Find the simulation container - try multiple methods
        let targetElement: Element | null = null;

        // Method 1: Try to find by ID (most reliable)
        targetElement = document.getElementById("simulation-container");
        console.log("Method 1 (ID):", targetElement);

        // Method 2: Find container by traversing up from iframe
        if (!targetElement && iframeRef.current) {
          let current: Element | null = iframeRef.current;
          let depth = 0;
          while (current && current !== document.body && depth < 10) {
            const classList = current.classList;
            if (
              classList &&
              Array.from(classList).some((cls) => cls.includes("rounded-2xl"))
            ) {
              targetElement = current;
              console.log("Method 2 (traverse):", targetElement);
              break;
            }
            current = current.parentElement;
            depth++;
          }
        }

        // Method 3: Try to find by querySelector with iframe check
        if (!targetElement && iframeRef.current) {
          const containers = document.querySelectorAll(
            '[class*="rounded-2xl"]'
          );
          for (let i = 0; i < containers.length; i++) {
            const container = containers[i];
            if (container.contains(iframeRef.current)) {
              targetElement = container;
              console.log("Method 3 (querySelector):", targetElement);
              break;
            }
          }
        }

        // Method 4: Use iframe's parent's parent (UnityGame wrapper -> container)
        if (!targetElement && iframeRef.current) {
          const parent = iframeRef.current.parentElement;
          if (parent) {
            const grandParent = parent.parentElement;
            if (grandParent) {
              targetElement = grandParent;
              console.log("Method 4 (parent chain):", targetElement);
            } else {
              targetElement = parent;
            }
          }
        }

        // Method 5: Find by data attribute
        if (!targetElement) {
          targetElement = document.querySelector("[data-simulation-slug]");
          console.log("Method 5 (data attribute):", targetElement);
        }

        // Fallback to document
        if (!targetElement) {
          targetElement = document.documentElement;
          console.log("Fallback to documentElement");
        }

        console.log("Final target element for fullscreen:", targetElement);

        const requestFullscreen = (element: Element): Promise<void> => {
          const elem = element as any;
          if (elem.requestFullscreen) {
            return elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) {
            return elem.webkitRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            return elem.mozRequestFullScreen();
          } else if (elem.msRequestFullscreen) {
            return elem.msRequestFullscreen();
          } else {
            return document.documentElement.requestFullscreen();
          }
        };

        const exitFullscreen = (): Promise<void> => {
          const doc = document as any;
          if (document.exitFullscreen) {
            return document.exitFullscreen();
          } else if (doc.webkitExitFullscreen) {
            return doc.webkitExitFullscreen();
          } else if (doc.mozCancelFullScreen) {
            return doc.mozCancelFullScreen();
          } else if (doc.msExitFullscreen) {
            return doc.msExitFullscreen();
          }
          return Promise.resolve();
        };

        if (!document.fullscreenElement) {
          console.log("Requesting fullscreen on:", targetElement);
          requestFullscreen(targetElement)
            .then(() => {
              console.log("Fullscreen entered successfully");
            })
            .catch((err: any) => {
              console.error("Error attempting to enable fullscreen:", err);
              // Try document as last resort
              if (targetElement !== document.documentElement) {
                console.log("Trying document.documentElement as fallback");
                requestFullscreen(document.documentElement).catch((e: any) => {
                  console.error("All fullscreen methods failed:", e);
                });
              }
            });
        } else {
          console.log("Exiting fullscreen...");
          exitFullscreen()
            .then(() => {
              console.log("Fullscreen exited successfully");
            })
            .catch((err: any) => {
              console.error("Error attempting to exit fullscreen:", err);
            });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    console.log("Message listener added for fullscreen");

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="w-full h-full relative"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        minHeight: "600px",
      }}
    >
      <iframe
        ref={iframeRef}
        src={indexHtmlPath}
        className="w-full h-full absolute inset-0"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        allowFullScreen
        title="Unity WebGL Simulation"
      />
    </div>
  );
}
