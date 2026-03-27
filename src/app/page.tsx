import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PestLibrary from "@/components/PestLibrary";
import Process from "@/components/Process";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import ServiceAreas from "@/components/ServiceAreas";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <PestLibrary />
        <About />
        <Reviews />
        <ServiceAreas />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
