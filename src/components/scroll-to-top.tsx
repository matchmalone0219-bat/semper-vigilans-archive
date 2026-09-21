import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;

          if (scrollY > 280) {
            setVisible(true);
            const p = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
            setProgress(Math.round(p));
          } else {
            setVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Circular progress calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={`返回顶部（已阅读 ${progress}%）`}
      title={`返回顶部（已阅读 ${progress}%）`}
      className={cn(
        "group fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-none border border-fg/15 bg-bg/90 text-fg shadow-xl backdrop-blur-md transition-all duration-300 hover:border-blood hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood sm:bottom-7 sm:right-7",
        visible ? "translate-y-0 opacity-100 scale-100" : "pointer-events-none translate-y-3 opacity-0 scale-95",
      )}
    >
      {/* Background SVG progress ring */}
      <svg className="absolute inset-0 size-full -rotate-90 pointer-events-none p-1" viewBox="0 0 44 44">
        {/* Track circle */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-fg/10"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-blood transition-all duration-100 ease-out"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          fill="none"
        />
      </svg>

      {/* Center Icon and Percentage Hover Flip */}
      <div className="relative flex size-full items-center justify-center">
        <ArrowUp className="size-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-blood" />
        <span className="sr-only">返回顶部</span>
      </div>
    </button>
  );
}
