import { useEffect } from "react";
import "@/app/styles/mobileTheme.css";
import { MobileHeader } from "./MobileHeader";
import { MobileHero } from "./MobileHero";
import { MobileAbout } from "./MobileAbout";
import { MobileStories } from "./MobileStories";
import { MobileFocus } from "./MobileFocus";
import { MobileCraft } from "./MobileCraft";
import { MobileRecommendations } from "./MobileRecommendations";
import { MobileFinale } from "./MobileFinale";

interface MobileHomepageProps {
  onNavigatePath?: (path: string) => void;
}

export function MobileHomepage({ onNavigatePath }: MobileHomepageProps) {
  const handleNavigatePath = (path: string) => {
    if (onNavigatePath) {
      onNavigatePath(path);
    } else {
      window.dispatchEvent(new CustomEvent("navigate-to-path", { detail: path }));
    }
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // IntersectionObserver for delayed reveal of .readpill and .go pills
  useEffect(() => {
    const revealables = document.querySelectorAll(".readpill, .go");
    const timers = new WeakMap<Element, NodeJS.Timeout>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            if (!timers.has(el)) {
              const timer = setTimeout(() => {
                el.classList.add("visible");
              }, 500);
              timers.set(el, timer);
            }
          } else {
            if (timers.has(el)) {
              clearTimeout(timers.get(el));
              timers.delete(el);
            }
            el.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    revealables.forEach((el) => observer.observe(el));

    return () => {
      revealables.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="mobile-root" id="mobile-top">
      <MobileHeader onNavigateSection={handleScrollToSection} />

      <main>
        <MobileHero 
          onNavigatePath={handleNavigatePath} 
          onScrollToSection={handleScrollToSection} 
        />

        <MobileAbout />

        <MobileStories 
          onNavigatePath={handleNavigatePath} 
        />

        <MobileFocus />

        <MobileCraft />

        <MobileRecommendations />

        <MobileFinale />
      </main>
    </div>
  );
}

export default MobileHomepage;
