import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Resolve anchors after lazy routes and controlled disclosures have rendered. */
export function HashTarget() {
  const { pathname, hash, status } = useRouterState({
    select: (state) => ({ pathname: state.location.pathname, hash: state.location.hash, status: state.status }),
  });

  useEffect(() => {
    if (!hash || status !== "idle") return;
    let frame = 0;
    let completed = false;
    let highlighted: HTMLElement | null = null;
    let clearHighlight: ReturnType<typeof setTimeout> | undefined;

    const locate = () => {
      frame = 0;
      if (completed) return;
      const target = document.getElementById(hash);
      if (!target) return;
      const details = target.closest("details");
      if (details && !details.open) {
        details.open = true;
        return;
      }
      // Controlled disclosures update their content visibility after the toggle.
      const content = details?.querySelector(":scope > div");
      if (content && getComputedStyle(content).opacity !== "1") return;
      if (!target.getClientRects().length || target.getBoundingClientRect().height === 0) return;
      completed = true;
      observer.disconnect();
      document.removeEventListener("transitionend", schedule, true);
      target.scrollIntoView({ block: "start", behavior: "auto" });
      target.classList.add("ring-2", "ring-blood");
      highlighted = target;
      clearHighlight = setTimeout(() => target.classList.remove("ring-2", "ring-blood"), 2500);
    };
    const schedule = () => {
      if (!completed && !frame) frame = requestAnimationFrame(locate);
    };
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open", "class", "style"] });
    document.addEventListener("transitionend", schedule, true);
    schedule();
    return () => {
      completed = true;
      observer.disconnect();
      document.removeEventListener("transitionend", schedule, true);
      cancelAnimationFrame(frame);
      clearTimeout(clearHighlight);
      highlighted?.classList.remove("ring-2", "ring-blood");
    };
  }, [pathname, hash, status]);

  return null;
}
