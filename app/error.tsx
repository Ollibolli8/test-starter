"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import type { ErrorInfo } from "next/error";

// Not named Error, so the global Error stays usable in instanceof below.
export default function ErrorPage({ error, retry }: ErrorInfo) {
  useEffect(() => {
    // Swap for a real error reporting service if the brief asks for one.
    console.error(error);
  }, [error]);

  // Server errors carry a digest that matches the server logs; client errors may not be Error objects.
  const digest =
    error instanceof Error && "digest" in error && typeof error.digest === "string"
      ? error.digest
      : undefined;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-5 py-16">
      <div role="alert" className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Something went wrong
        </h1>
        <p className="text-base text-muted">
          Try again. If it keeps happening, reload the page.
        </p>
        {digest ? (
          <p className="font-mono text-sm text-muted">Reference: {digest}</p>
        ) : null}
      </div>
      {/* retry() re-fetches and re-renders the segment; the docs prefer it over reset(). */}
      <button
        type="button"
        onClick={() => retry()}
        className="inline-flex min-h-11 items-center justify-center self-start rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"
      >
        Try again
      </button>
    </main>
  );
}
