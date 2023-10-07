import Contact from "@/components/landing/contact";
import Faq from "@/components/landing/faq";
import Features from "@/components/landing/features";
import HeroScroll from "@/components/landing/hero";
import Navbar from "@/components/navbar";
import Steps from "@/components/landing/steps";
import UseCases from "@/components/landing/use-cases";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroScroll />

      <UseCases />
      <Steps />
      <Features />
      <Faq />
      <Contact />
    </>
  );
}
