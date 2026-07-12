create table if not exists public.financial_accounts (
  id uuid primary key default gen_random_uuid(),
  financial_space_id uuid not null references public.financial_spaces(id) on delete restrict,
  name text not null,
  account_type text not null,
  initial_balance_cents bigint not null default 0,
  currency text not null default 'BRL',
  responsible_user_id uuid references public.profiles(id) on delete restrict,
  created_by uuid not null references public.profiles(id) on delete restrict,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint financial_accounts_name_not_empty check (length(trim(name)) > 0),
  constraint financial_accounts_type_check check (
    account_type in (
      'checking',
      'savings',
      'cash',
      'digital_wallet',
      'investment',
      'other'
    )
  ),
  constraint financial_accounts_currency_check check (currency = 'BRL')
);

create index if not exists financial_accounts_space_idx
  on public.financial_accounts(financial_space_id);

create index if not exists financial_accounts_responsible_idx
  on public.financial_accounts(responsible_user_id);

create index if not exists financial_accounts_created_by_idx
  on public.financial_accounts(created_by);

create trigger set_financial_accounts_updated_at
before update on public.financial_accounts
for each row
execute function public.set_updated_at();

create or replace function public.validate_financial_account_membership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_active_space_member(new.financial_space_id, new.created_by) then
    raise exception 'O criador da conta deve ser membro ativo do espaço financeiro.';
  end if;

  if new.responsible_user_id is not null
    and not public.is_active_space_member(new.financial_space_id, new.responsible_user_id) then
    raise exception 'O responsável da conta deve ser membro ativo do espaço financeiro.';
  end if;

  return new;
end;
$$;

create trigger validate_financial_account_membership_before_insert
before insert on public.financial_accounts
for each row
execute function public.validate_financial_account_membership();

create trigger validate_financial_account_membership_before_update
before update on public.financial_accounts
for each row
execute function public.validate_financial_account_membership();

alter table public.financial_accounts enable row level security;

create policy "Active members can view financial accounts"
on public.financial_accounts
for select
to authenticated
using (
  public.is_active_space_member(financial_space_id, auth.uid())
);

create policy "Active admins can create financial accounts"
on public.financial_accounts
for insert
to authenticated
with check (
  created_by = auth.uid()
  and public.is_active_space_admin(financial_space_id, auth.uid())
);

create policy "Active admins can update financial accounts"
on public.financial_accounts
for update
to authenticated
using (
  public.is_active_space_admin(financial_space_id, auth.uid())
)
with check (
  public.is_active_space_admin(financial_space_id, auth.uid())
);

revoke all on public.financial_accounts from anon;
grant select, insert, update on public.financial_accounts to authenticated;