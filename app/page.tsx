import { BeforeAfter } from "@/components/home/BeforeAfter";
import { ExposurePicker } from "@/components/home/ExposurePicker";
import { FAQ } from "@/components/home/FAQ";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { Pricing } from "@/components/home/Pricing";
import { Process } from "@/components/home/Process";
import { QuoteForm } from "@/components/home/QuoteForm";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { StructuredData } from "@/components/StructuredData";
import { faqJsonLd } from "@/lib/geo";

// Homepage order is kept stable for anchor navigation and section indexing.
export default function HomePage() {
  return (
    <>
      <StructuredData data={faqJsonLd()} />
      <Hero />
      <Services />
      <FeaturedWork />
      <Process />
      <ExposurePicker />
      <Gallery />
      <BeforeAfter />
      <Testimonials />
      <Pricing />
      <FAQ />
      <QuoteForm />
    </>
  );
}
