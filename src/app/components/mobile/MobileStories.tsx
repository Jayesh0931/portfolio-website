import BrandVector from "@/components/BrandVector";
import svgPaths from "@/imports/Desktop6/svg-rk1gtf9dz9";
import {
  imgAllyraCoverBig,
  imgCosCoverLarge,
  imgTulahLargeThumb,
  imgE31,
  imgE32
} from "./mobileAssets";

interface MobileStoriesProps {
  onNavigatePath: (path: string) => void;
}

interface StoryItem {
  id: string;
  storyNum: string;
  year: string;
  title: string;
  subtitle: string;
  pills: string[];
  image: string;
  imageAlt: string;
  keyInsight: string;
  contribution: string;
  route?: string;
}

const storiesData: StoryItem[] = [
  {
    id: "mobile-story-1",
    storyNum: "STORY 01",
    year: "PRESENT",
    title: "allyra.ai",
    subtitle: "Human–AI interaction platform for enterprise teams.",
    pills: ["HUMAN-AI INTERACTION", "ENTERPRISE AI", "AGENTIC UX"],
    image: imgAllyraCoverBig,
    imageAlt: "allyra.ai cover preview",
    keyInsight: "The biggest challenge wasn't making AI more capable. It was helping people understand what the AI was doing, when to trust it, and how to work alongside it.",
    contribution: "Product Strategy, Product Design, Interaction Design, Design Systems",
    route: "/allyra-story"
  },
  {
    id: "mobile-story-2",
    storyNum: "STORY 02",
    year: "2026",
    title: "Campaign OS",
    subtitle: "AI-native operating system that brings campaign planning, execution, monitoring and optimization into one connected workflow.",
    pills: ["AI WORKFLOWS", "MARKETING OS", "HUMAN-AI INTERACTION"],
    image: imgCosCoverLarge,
    imageAlt: "Campaign OS cover preview",
    keyInsight: "Marketing teams don't need more AI tools. They need AI that understands the entire campaign lifecycle and knows when to assist, collaborate or simply stay out of the way.",
    contribution: "Product Strategy, AI Experience Design, Workflow Design, Information Architecture, Interaction Design, Dashboard UX, Design Systems",
    route: "/campaign-os-story"
  },
  {
    id: "mobile-story-3",
    storyNum: "STORY 03",
    year: "2025",
    title: "tulah",
    subtitle: "Operational platform designed to simplify wellness workflows and service delivery.",
    pills: ["WELLNESS AI", "OPERATIONS", "SERVICE EXPERIENCE"],
    image: imgTulahLargeThumb,
    imageAlt: "tulah cover preview",
    keyInsight: "Most operational challenges aren't workflow problems. They're clarity problems disguised as workflows.",
    contribution: "Product Design, Workflow Design, Information Architecture, Design Systems",
    route: "/tulah-story"
  },
  {
    id: "mobile-story-4",
    storyNum: "STORY 04",
    year: "2025",
    title: "VousVous",
    subtitle: "AI-powered fashion platform for discovering, creating, and personalizing unique styles.",
    pills: ["FASHION TECH", "AI PERSONALIZATION", "CONSUMER PRODUCTS"],
    image: imgE31,
    imageAlt: "VousVous cover preview",
    keyInsight: "Personalization becomes meaningful when people can create, not just choose.",
    contribution: "Product Design, Mobile Experience Design, Design System, Interaction Design",
    route: "/vousvous-story"
  },
  {
    id: "mobile-story-5",
    storyNum: "STORY 05",
    year: "2022",
    title: "Joonify",
    subtitle: "Learning and assessment platform helping parents better understand how children learn and grow.",
    pills: ["ED-TECH", "LEARNING EXPERIENCE", "CHILD DEVELOPMENT"],
    image: imgE32,
    imageAlt: "Joonify cover preview",
    keyInsight: "When parents understand how children learn, better decisions naturally follow.",
    contribution: "Product Design, User Experience Design, Assessment Experience Design, Interaction Design"
  }
];

export function MobileStories({ onNavigatePath }: MobileStoriesProps) {
  return (
    <section className="mobile-section" id="mobile-stories">
      {/* 1. Header Index Tag */}
      <div className="mobile-stories-index-tag">[ S-002 ]</div>

      {/* 2. Giant STORIES Marquee Row with Divider & BrandVector */}
      <div className="mobile-stories-marquee-row">
        <div className="mobile-stories-marquee-container">
          <div className="mobile-stories-marquee-track">
            <span className="mobile-stories-marquee-text-solid">STORIES</span>
            <span className="mobile-stories-marquee-text-outline">SELECTED STORIES</span>
            <span className="mobile-stories-marquee-text-solid">STORIES</span>
            <span className="mobile-stories-marquee-text-outline">SELECTED STORIES</span>
          </div>
        </div>

        {/* Vertical divider line */}
        <div className="mobile-stories-header-divider" />

        {/* BrandVector cell with dashed circle on left & orange solid on right */}
        <div className="mobile-stories-vector-cell">
          <BrandVector theme="dark" width={82} height={54} />
        </div>
      </div>

      {/* 3. Section Intro Subtitle */}
      <div className="mobile-stories-intro">
        A few selected stories that represent the problems I loved to solve and the impact I strive to create.
      </div>

      {/* 4. Stories Cards Stack */}
      <div className="mobile-stories-list">
        {storiesData.map((story) => (
          <article
            key={story.id}
            className="mobile-story-card"
            id={story.id}
            data-custom-cursor="read-story"
            onClick={() => {
              if (story.route) {
                onNavigatePath(story.route);
              }
            }}
          >
            {/* Top Details */}
            <div className="mobile-story-card-top">
              <div className="mobile-story-tag-row">
                <span>[ {story.storyNum} ]</span>
                <span>[ {story.year} ]</span>
              </div>
              <h2 className="mobile-story-title">{story.title}</h2>
              <p className="mobile-story-subtitle">{story.subtitle}</p>
              <div className="mobile-story-pills">
                {story.pills.map((pill, idx) => (
                  <span key={idx} className="mobile-story-pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Center Preview with Floating Read More Badge */}
            <div className="mobile-story-visual-wrap">
              <img
                src={story.image}
                alt={story.imageAlt}
                className="mobile-story-img"
              />
              <div className="mobile-story-read-badge">
                <span className="mobile-story-read-text">READ MORE</span>
                <span className="mobile-story-read-arrow" style={{ display: "flex", alignItems: "center", transform: "rotate(-90deg) scaleY(-1)" }}>
                  <svg width="10" height="10" viewBox="0 0 9 9" fill="none">
                    <path d={svgPaths.p3e256a00} fill="#190B00" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Bottom Insights & Contribution */}
            <div className="mobile-story-bottom">
              <div className="mobile-story-info-block">
                <span className="mobile-story-info-label">Key Insight</span>
                <div className="mobile-story-divider-line" />
                <p className="mobile-story-info-text">{story.keyInsight}</p>
              </div>

              <div className="mobile-story-info-block">
                <span className="mobile-story-info-label">Contibution</span>
                <div className="mobile-story-divider-line" />
                <p className="mobile-story-info-text">{story.contribution}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
