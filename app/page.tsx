import Link from "next/link";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-3 px-5 py-16">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Starter</h1>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="text-base text-muted">
          Next.js, TypeScript, Tailwind CSS and Motion, ready for the brief.
        </p>
      </Reveal>
      <Reveal delay={0.12}>
        <Link
          href="/kit"
          className="self-start rounded-sm font-medium underline underline-offset-4 hover:no-underline"
        >
          Open the kit
        </Link>
      </Reveal>
    </main>
  );
}
