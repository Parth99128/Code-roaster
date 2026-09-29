import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Workspace } from "@/components/Workspace";
import { RangoliStrip } from "@/components/RangoliStrip";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <TopBar />
      <main className="flex-1 w-full mx-auto max-w-[1280px] px-4 md:px-8 flex flex-col">
        <Hero />
        <Workspace />
        <RangoliStrip />
      </main>
      <Footer />
    </div>
  );
}
