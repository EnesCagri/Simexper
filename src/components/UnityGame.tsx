"use client";

import { useEffect, useState } from "react";

export default function UnityGame() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const script = document.createElement("script");
    script.src = "/webgl-app/Basic/Build/simple3dgame.loader.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <iframe
        src="/webgl-app/Basic/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        allowFullScreen
      />
    </div>
  );
}
