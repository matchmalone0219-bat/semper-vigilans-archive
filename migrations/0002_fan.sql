create table if not exists theories (
  id serial primary key,
  user_id text not null,
  author text not null,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists theories_created_at_idx on theories (created_at desc);

create table if not exists pledges (
  user_id text primary key,
  created_at timestamptz not null default now()
);
