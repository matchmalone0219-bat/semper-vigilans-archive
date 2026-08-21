import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type Theory = {
  id: number;
  author: string;
  body: string;
  createdAt: string;
};

function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  const text = String(value ?? "");
  const parsed = Date.parse(text);
  return Number.isNaN(parsed) ? text : new Date(parsed).toISOString();
}

export const listTheories = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      author: string;
      body: string;
      created_at: string | Date;
    }>`
      select id, author, body, created_at
      from theories
      order by id desc
      limit 60
    `;
    return rows.map((row) => ({
      id: Number(row.id),
      author: row.author,
      body: row.body,
      createdAt: asIso(row.created_at),
    })) satisfies Theory[];
  },
);

export const addTheory = createServerFn({ method: "POST" })
  .validator((input: { body: string }) => {
    const body = (input.body ?? "").trim();
    if (body.length < 8) throw new Error("再写长一点，至少八个字。");
    if (body.length > 280) throw new Error("请控制在 280 字以内。");
    return { body };
  })
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const names = await sql<{ name: string }>`
      select name from "user" where id = ${context.userId} limit 1
    `;
    const author = names[0]?.name?.trim() || "影迷用户";
    const inserted = await sql<{
      id: number;
      author: string;
      body: string;
      created_at: string | Date;
    }>`
      insert into theories (user_id, author, body)
      values (${context.userId}, ${author}, ${data.body})
      returning id, author, body, created_at
    `;
    const row = inserted[0];
    if (!row) throw new Error("没能写入档案。");
    return {
      id: Number(row.id),
      author: row.author,
      body: row.body,
      createdAt: asIso(row.created_at),
    } satisfies Theory;
  });

export const getPledgeCount = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    const rows = await sql<{ n: number }>`select count(*)::int as n from pledges`;
    return Number(rows[0]?.n ?? 0);
  },
);

export const getMyPledge = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ user_id: string }>`
      select user_id from pledges where user_id = ${context.userId} limit 1
    `;
    return Boolean(rows[0]);
  });

export const togglePledge = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const existing = await sql<{ user_id: string }>`
      select user_id from pledges where user_id = ${context.userId} limit 1
    `;
    if (existing[0]) {
      await sql`delete from pledges where user_id = ${context.userId}`;
      return false;
    }
    await sql`insert into pledges (user_id) values (${context.userId})`;
    return true;
  });
