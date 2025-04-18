-- Create articles table
create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  subtitle text,
  slug text not null unique,
  content text not null,
  category text not null,
  featured_image text,
  pdf_url text,
  author text,
  published_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  status text not null default 'draft' check (status in ('draft', 'published')),
  meta_description text,
  created_at timestamp with time zone default now()
);

-- Create an index for faster slug lookups
create index if not exists articles_slug_idx on articles(slug);

-- Create a function to update the updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger to automatically update the updated_at column
create trigger update_articles_updated_at
  before update on articles
  for each row
  execute function update_updated_at_column();

-- Add RLS policies
alter table articles enable row level security;

-- Allow public read access to published articles
create policy "Public can view published articles"
  on articles for select
  using (status = 'published');

-- Allow authenticated users to manage articles
create policy "Authenticated users can manage articles"
  on articles for all
  using (auth.role() = 'authenticated'); 