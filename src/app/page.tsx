import Contact from "@/components/contact";
import Faq from "@/components/faq";
import Features from "@/components/features";
import HeroScroll from "@/components/hero";
import Steps from "@/components/steps";
import UseCases from "@/components/use-cases";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <HeroScroll />

      <UseCases />
      <Steps />
      <Features />
      <Faq />
      <Contact />
    </>
  );
}
