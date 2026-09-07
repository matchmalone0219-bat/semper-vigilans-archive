export function ChapterNav({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  return (
    <nav
      aria-label={label}
      className="sticky top-14 z-30 border-y border-fg/10 bg-bg/95 backdrop-blur-md sm:top-16"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:gap-3 sm:px-6">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blood"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
