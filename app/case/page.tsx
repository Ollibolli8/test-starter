import type { Metadata } from "next";
import { CASE } from "./content";
import { CaseFacts, CaseHeader, CaseHero, CasePage, CaseTitle, Credits, Desktop, Details, Identity, Parts, Screens, Section, Statement } from "@/components/case/blocks";
import { APP } from "@/lib/app";

// The case: the product shown the way a studio shows its work, with the app running in it (AGENTS.md → The case
// page). Its words and picks are in ./content.tsx. To scale it to the brief, delete sections here; the numbers
// follow. A feature brief keeps the title, the hero, the facts, the screens, the details and the credits.
export const metadata: Metadata = {
  title: `${APP.name}: case`,
  robots: { index: false },
};

export default function CasePageRoute() {
  return (
    <CasePage lang={CASE.lang}>
      <CaseHeader />
      <main>
        <CaseTitle client={CASE.client} project={CASE.project} display={CASE.display} />
        <CaseHero screen={CASE.hero} />
        <CaseFacts facts={CASE.facts} intro={CASE.intro} stats={CASE.stats} display={CASE.display} />
        <Section id="identity" title="Identity" lede={CASE.identity.lede}>
          <Identity wordmark={CASE.identity.wordmark} faces={CASE.identity.faces} colours={CASE.identity.colours} />
        </Section>
        <Statement display={CASE.display}>{CASE.statement}</Statement>
        <Section id="screens" title="Screens" lede={CASE.screensLede}>
          <Screens screens={CASE.screens} />
        </Section>
        <Section id="details" title="The details that work" lede={CASE.detailsLede}>
          <Details details={CASE.details} display={CASE.display} />
        </Section>
        <Section id="components" title="Components" lede={CASE.partsLede}>
          <Parts parts={CASE.parts} />
        </Section>
        <Section id="desktop" title="On a desktop" lede={CASE.desktopLede}>
          <Desktop src={CASE.desktop} title={`${APP.name} on a desktop`} />
        </Section>
      </main>
      <Credits credits={CASE.credits} links={CASE.links} />
    </CasePage>
  );
}
