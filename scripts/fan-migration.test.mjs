import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDir = join(rootDir, "migrations");

async function applyMigrations(pg) {
  const files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();
  for (const name of files) {
    const text = await readFile(join(migrationsDir, name), "utf8");
    await pg.exec(text);
  }
}

test("migration 0004 applies on clean database and enforces cascade and FK constraints", async () => {
  const pg = new PGlite();
  await applyMigrations(pg);

  // 1. Check that theories has the 4 seed items and user table has their authors
  const seedTheories = await pg.query("select count(*) as c from theories");
  assert.equal(Number(seedTheories.rows[0].c), 4);

  const seedUsers = await pg.query("select id from \"user\" where id like 'seed-%' order by id");
  assert.deepEqual(seedUsers.rows.map((r) => r.id), ["seed-1", "seed-2", "seed-3", "seed-4"]);

  // 2. Foreign key violation on theories
  await assert.rejects(
    async () => {
      await pg.query("insert into theories (user_id, author, body) values ($1, $2, $3)", [
        "missing-user",
        "Ghost",
        "Should fail",
      ]);
    },
    /violates foreign key constraint/,
  );

  // 3. Foreign key violation on pledges
  await assert.rejects(
    async () => {
      await pg.query("insert into pledges (user_id) values ($1)", ["missing-user"]);
    },
    /violates foreign key constraint/,
  );

  // 4. Cascade delete verification
  await pg.query(
    "insert into \"user\" (\"id\", \"name\", \"email\", \"emailVerified\") values ($1, $2, $3, $4)",
    ["cascade-user", "Cascade Test", "cascade@test.internal", true],
  );
  await pg.query(
    "insert into theories (user_id, author, body) values ($1, $2, $3)",
    ["cascade-user", "Cascade Test", "Theory to cascade"],
  );
  await pg.query(
    "insert into pledges (user_id) values ($1)",
    ["cascade-user"],
  );

  const tBefore = await pg.query("select count(*) as c from theories where user_id = $1", ["cascade-user"]);
  const pBefore = await pg.query("select count(*) as c from pledges where user_id = $1", ["cascade-user"]);
  assert.equal(Number(tBefore.rows[0].c), 1);
  assert.equal(Number(pBefore.rows[0].c), 1);

  // Delete the user
  await pg.query("delete from \"user\" where id = $1", ["cascade-user"]);

  const tAfter = await pg.query("select count(*) as c from theories where user_id = $1", ["cascade-user"]);
  const pAfter = await pg.query("select count(*) as c from pledges where user_id = $1", ["cascade-user"]);
  assert.equal(Number(tAfter.rows[0].c), 0);
  assert.equal(Number(pAfter.rows[0].c), 0);

  // 5. Idempotency: re-running 0004 succeeds without error
  const m4 = await readFile(join(migrationsDir, "0004_fan_integrity.sql"), "utf8");
  await assert.doesNotReject(async () => {
    await pg.exec(m4);
  });
});
