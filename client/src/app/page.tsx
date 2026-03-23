import Hero from "@/components/features/hero";
import Navbar from "@/components/features/navbar";
import Features from "@/components/features/features";
import MouseGlow from "@/components/features/mouse-glow";
import ScrollProgress from "@/components/features/scroll-progress";
import AIPanel from "@/components/features/ai-panel";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <MouseGlow />
      <ScrollProgress />
      <AIPanel />
    </>
  );
}