import React from "react";
import BrandVector from "@/components/BrandVector";

interface CraftItem {
  id: string;
  tag: string;
  title: string;
  description: string;
}

const CRAFT_ITEMS: CraftItem[] = [
  {
    id: "vv-craft-1",
    tag: "[ CRAFT 01 ]",
    title: "Contextual Prompt Suggestions",
    description: "Natural language mood prompts and aesthetic references guiding real-time styling.",
  },
  {
    id: "vv-craft-2",
    tag: "[ CRAFT 02 ]",
    title: "Multimodal Aesthetic Extraction",
    description: "Parsing visual references and palette cues to define precise silhouette parameters.",
  },
  {
    id: "vv-craft-3",
    tag: "[ CRAFT 03 ]",
    title: "Interactive Look Canvas",
    description: "Direct workspace for exploring, remixing, and layering garment combinations.",
  },
  {
    id: "vv-craft-4",
    tag: "[ CRAFT 04 ]",
    title: "Aesthetic Tuning Sliders",
    description: "Tactile controls to dial up minimalism, vibrancy, and formality in seconds.",
  },
  {
    id: "vv-craft-5",
    tag: "[ CRAFT 05 ]",
    title: "Living Wardrobe Memory",
    description: "Persistent memory tracking taste preferences and preventing repetitive looks.",
  },
];

export function MobileCosCraft() {
  return (
    <section id="mobile-cos-craft" className="mobile-story-craft-section">
      {/* 1. Outlined Display Typography */}
      <div className="mobile-story-craft-header-wrap">
        <p className="mobile-story-craft-title-outline">CRAFTING</p>
        <p className="mobile-story-craft-title-solid">THE EXPERIENCE</p>
        <div className="mobile-story-craft-brand-vector">
          <BrandVector theme="dark" width={60} height={40} />
        </div>
      </div>

      {/* 2. Intro Box */}
      <div className="mobile-story-craft-intro-box">
        <p className="mobile-story-craft-intro-p">
          Beyond catalog generation, the product relied heavily on interaction design to make personal styling feel tactile and responsive.
        </p>
        <p className="mobile-story-craft-intro-bold">
          Mood Cues / Progressive Composition / Interactive Silhouette Tuning / Living Memory were designed to co-create looks with ease.
        </p>
      </div>

      {/* 3. Stacked Craft Items */}
      <div className="mobile-story-craft-list">
        {CRAFT_ITEMS.map((item) => (
          <div key={item.id} className="mobile-story-craft-card">
            <div className="mobile-story-craft-card-top">
              <span className="mobile-story-craft-tag">{item.tag}</span>
              <h3 className="mobile-story-craft-card-title">{item.title}</h3>
            </div>

            <div className="mobile-story-craft-video-wrap flex items-center justify-center bg-[#e5ddd4] p-4 text-center aspect-[16/10] rounded-[8px]">
              <div>
                <span className="text-[#EE6C13] text-[24px] block mb-1">✦</span>
                <p className="font-outfit font-bold text-[14px] text-[#190b00] m-0">{item.title}</p>
              </div>
            </div>

            <p className="mobile-story-craft-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MobileCosCraft;
