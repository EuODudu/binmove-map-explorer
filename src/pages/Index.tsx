import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapSection from "@/components/map/MapSection";
import Features from "@/components/Features";
import Impact from "@/components/Impact";
import Rewards from "@/components/Rewards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MapSection />
        <Features />
        <Impact />
        <Rewards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
