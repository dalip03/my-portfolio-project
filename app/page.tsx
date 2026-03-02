import About from "./components/About";
import DraggableShowcase from "./components/DraggableShowcase";
import Hero from "./components/Hero";
import ProcessSection from "./components/ProcessSection";
import FeaturedProject from "./components/ProjectCard";
import ProjectCard from "./components/ProjectCard";
import ScrollHorizontalShowcase from "./components/ScrollHorizontalShowcase";
import SkillsSection from "./components/SkillsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="h-[20vh] bg-gradient-to-b from-transparent to-[#0A0A0F]" />

      <About />
            <SkillsSection />

      <section className="bg-[#0A0A0F] py-32">
        <div className="px-6 mb-20">
          <h2 className="text-[clamp(40px,6vw,80px)] font-bold text-white">
            Selected Work
          </h2>
        </div>

        <ScrollHorizontalShowcase>
          <div className="min-w-screen flex items-center">
            <FeaturedProject
              index={1}
              title="InsurBe"
              description="A scalable insurance dashboard platform with user authentication and policy management."
              tech="Next.js · Spring Boot · PostgreSQL"
              role="Full Stack Developer"
              highlights={[
                "Authentication system",
                "Admin dashboard",
                "Dynamic policy management",
              ]}
              image="/projects_assets/insurbe.png"
              liveUrl="https://insurbe.com"
              githubUrl="https://github.com/yourrepo"
            />
          </div>

          <div className="min-w-screen flex items-center">
            <FeaturedProject
              index={2}
              title="EarnMyMoney"
              description="Interactive reward-based gaming ecosystem with leaderboard and referrals."
              tech="Next.js · Tailwind · API Integration"
              role="Frontend + API Integration"
              highlights={[
                "Leaderboard ranking",
                "Referral tracking",
                "Tier-based rewards",
              ]}
              image="/projects_assets/playwin.png"
              liveUrl="https://dev.earnmymoney.com/en"
            />
          </div>

          <div className="min-w-screen flex items-center">
            <FeaturedProject
              index={2}
              title="Peeralgo"
              description="A scalable mentorship platform connecting students with industry experts for personalized guidance and career development."
              tech="Next.js · Tailwind · API Integration"
              role="Frontend + API Integration"
              highlights={[
                "Leaderboard ranking",
                "Referral tracking",
                "Tier-based rewards",
              ]}
              image="/projects_assets/peeralgo.png"
              liveUrl="https://peeralgo-dalip03s-projects.vercel.app/"
            />
          </div>

          <div className="min-w-screen flex items-center">
            <FeaturedProject
              index={2}
              title="lexbolt"
              description="AI-driven insights that decode regulations, accelerate validation, and keep your designs compliant from concept to production, and new regulations updated for engineering and homologation."
              tech="Next.js · Tailwind · API Integration"
              role="Frontend + API Integration"
              highlights={[
                "Leaderboard ranking",
                "Referral tracking",
                "Tier-based rewards",
              ]}
              image="/projects_assets/lexbolt.png"
              liveUrl="https://lexboltt.vercel.app/"
            />
          </div>
        </ScrollHorizontalShowcase>
      </section>
            <ProcessSection />

    </main>
  );
}
