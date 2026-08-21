import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-muted" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={1.5} />
      </span>
      <h1 className="font-sans text-2xl font-black tracking-tight">档案中断</h1>
      <p className="max-w-md text-sm break-words text-muted">
        {error.message || "发生了未预料的错误。试着重新载入这一页。"}
      </p>
    </main>
  );
}
