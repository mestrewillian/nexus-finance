-- Nexus Finance
-- Migração 001: perfis, espaços financeiros e membros

create extension if not exists pgcrypto;

-- Atualiza automaticamente a coluna updated_at.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Perfis complementares dos usuários autenticados.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(trim(full_name)) >= 2),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Espaços financeiros compartilháveis.
create table public.financial_spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) >= 2),
  space_type text not null check (
    space_type in ('personal', 'family', 'business', 'project', 'other')
  ),
  currency_code text not null default 'BRL' check (
    currency_code = 'BRL'
  ),
  created_by uuid not null references public.profiles(id),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Relação entre usuários e espaços financeiros.
create table public.financial_space_members (
  id uuid primary key default gen_random_uuid(),
  financial_space_id uuid not null
    references public.financial_spaces(id),
  user_id uuid not null
    references public.profiles(id),
  role text not null check (
    role in ('admin', 'member')
  ),
  membership_status text not null check (
    membership_status in ('invited', 'active', 'declined', 'removed')
  ),
  invited_by uuid references public.profiles(id),
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint financial_space_members_space_user_unique
    unique (financial_space_id, user_id),

  constraint financial_space_members_active_joined_at_check
    check (
      membership_status <> 'active'
      or joined_at is not null
    )
);

-- Índices iniciais.
create index financial_space_members_user_id_idx
  on public.financial_space_members(user_id);

create index financial_space_members_financial_space_id_idx
  on public.financial_space_members(financial_space_id);

create index financial_space_members_active_idx
  on public.financial_space_members(financial_space_id, user_id)
  where membership_status = 'active';

-- Gatilhos de updated_at.
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger financial_spaces_set_updated_at
before update on public.financial_spaces
for each row
execute function public.set_updated_at();

create trigger financial_space_members_set_updated_at
before update on public.financial_space_members
for each row
execute function public.set_updated_at();

-- Cria automaticamente o perfil após cadastro no Supabase Auth.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    full_name
  )
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
      nullif(split_part(new.email, '@', 1), ''),
      'Usuário'
    )
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

-- RLS começa ativado e fechado.
alter table public.profiles enable row level security;
alter table public.financial_spaces enable row level security;
alter table public.financial_space_members enable row level security;