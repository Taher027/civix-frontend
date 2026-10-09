export default function Loading() {
  return (
    <div
      aria-live="polite"
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4"
    >
      <div className="relative size-12">
        <span className="absolute inset-0 rounded-full border-4 border-primary/15" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">Loading...</p>
      <span className="sr-only">Loading</span>
    </div>
  );
}
