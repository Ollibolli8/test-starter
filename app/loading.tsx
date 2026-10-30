export default function Loading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 py-16"
    >
      <div role="status" className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-5 rounded-full border-2 border-border border-t-foreground motion-safe:animate-spin motion-reduce:hidden"
        />
        <h1 className="text-lg font-medium">Loading…</h1>
      </div>
    </main>
  );
}
