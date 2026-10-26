import { createFileRoute } from "@tanstack/react-router";

import { home } from "@/content/home";
import { Hero } from "@/components/home/Hero";
import { Categories, Featured, Why, Services } from "@/components/home/Sections";
import { HowToBuy, Commitment, Faq, About, WhyInvest } from "@/components/home/Sections2";
import { Contact } from "@/components/home/Contact";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: home.meta.title },
      { name: "description", content: home.meta.description },
      { property: "og:title", content: home.meta.title },
      { property: "og:description", content: home.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <main className="bg-background">
        <Hero />
        <Categories />
        <Featured />
        <Why />
        <Services />
        <HowToBuy />
        <Commitment />
        <Faq />
        <About />
        <WhyInvest />
        <Contact />
      </main>
    </SiteLayout>
  );
}
