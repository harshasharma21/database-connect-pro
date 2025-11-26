-- Create tags table
create table public.tags (
  id text primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.tags enable row level security;

create policy "Tags are viewable by everyone"
  on public.tags for select using (true);

-- Create categories table
create table public.categories (
  id text primary key,
  slug text not null unique,
  name text not null,
  parent_id text references public.categories(id) on delete cascade,
  product_count integer default 0,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.categories enable row level security;

create policy "Categories are viewable by everyone"
  on public.categories for select using (true);

create index categories_parent_id_idx on public.categories(parent_id);
create index categories_slug_idx on public.categories(slug);

-- Create products table
create table public.products (
  id text primary key,
  sku text not null unique,
  name text not null,
  description text,
  short_description text,
  price numeric not null,
  images text[] default '{}',
  category text not null,
  subcategory text,
  brand text,
  pack_size text,
  unit text,
  stock integer default 0,
  in_stock boolean default true,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.products enable row level security;

create policy "Products are viewable by everyone"
  on public.products for select using (true);

create index products_category_idx on public.products(category);
create index products_subcategory_idx on public.products(subcategory);
create index products_sku_idx on public.products(sku);
create index products_tags_idx on public.products using gin(tags);

-- Auto-update timestamp function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();