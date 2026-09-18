-- Migration 0004: Enforce foreign key integrity on fan data tables (theories & pledges)
-- Ensure seed / existing theory authors have corresponding rows in "user" table
insert into "user" ("id", "name", "email", "emailVerified", "createdAt", "updatedAt")
select distinct
  t.user_id,
  coalesce(nullif(t.author, ''), '影迷用户'),
  t.user_id || '@seed.sempervigilans.internal',
  false,
  now(),
  now()
from theories t
where not exists (select 1 from "user" u where u."id" = t.user_id)
  and not exists (select 1 from "user" u where u."email" = t.user_id || '@seed.sempervigilans.internal')
on conflict ("id") do nothing;

-- Clean up any remaining orphaned records where user_id does not exist in "user"
delete from theories where user_id not in (select "id" from "user");
delete from pledges where user_id not in (select "id" from "user");

-- Add foreign key constraint to theories referencing "user"("id") on delete cascade
alter table theories drop constraint if exists theories_user_id_fkey;
alter table theories
  add constraint theories_user_id_fkey
  foreign key (user_id) references "user"("id") on delete cascade;

-- Create index on theories(user_id)
create index if not exists theories_user_id_idx on theories(user_id);

-- Add foreign key constraint to pledges referencing "user"("id") on delete cascade
alter table pledges drop constraint if exists pledges_user_id_fkey;
alter table pledges
  add constraint pledges_user_id_fkey
  foreign key (user_id) references "user"("id") on delete cascade;
