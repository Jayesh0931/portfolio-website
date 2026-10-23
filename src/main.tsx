import { createRoot } from "react-dom/client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ReactLenis
    root
    options={{
      lerp: 0.14,
      duration: 0.75,
      smoothWheel: true,
      syncTouch: false,
    }}
  >
    <App />
  </ReactLenis>
);