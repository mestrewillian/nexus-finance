-- Nexus Finance
-- Migração 002: políticas RLS e criação segura de espaços

-- Confirma se um usuário é membro ativo de determinado espaço.
create or replace function public.is_active_space_member(
  target_space_id uuid,
  target_user_id uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.financial_space_members
    where financial_space_id = target_space_id
      and user_id = target_user_id
      and membership_status = 'active'
  );
$$;

-- Confirma se um usuário é administrador ativo.
create or replace function public.is_active_space_admin(
  target_space_id uuid,
  target_user_id uuid default auth.uid()
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.financial_space_members
    where financial_space_id = target_space_id
      and user_id = target_user_id
      and role = 'admin'
      and membership_status = 'active'
  );
$$;

-- Confirma se dois usuários compartilham algum espaço ativo.
create or replace function public.users_share_active_space(
  first_user_id uuid,
  second_user_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.financial_space_members first_member
    inner join public.financial_space_members second_member
      on second_member.financial_space_id =
         first_member.financial_space_id
    where first_member.user_id = first_user_id
      and second_member.user_id = second_user_id
      and first_member.membership_status = 'active'
      and second_member.membership_status = 'active'
  );
$$;

-- Cria o espaço e associa o criador como administrador.
create or replace function public.create_financial_space(
  space_name text,
  space_type text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  authenticated_user_id uuid;
  new_space_id uuid;
  normalized_name text;
begin
  authenticated_user_id := auth.uid();
  normalized_name := trim(space_name);

  if authenticated_user_id is null then
    raise exception 'Usuário não autenticado.';
  end if;

  if char_length(normalized_name) < 2 then
    raise exception 'Informe um nome válido para o espaço.';
  end if;

  if space_type not in (
    'personal',
    'family',
    'business',
    'project',
    'other'
  ) then
    raise exception 'Tipo de espaço inválido.';
  end if;

  insert into public.financial_spaces (
    name,
    space_type,
    currency_code,
    created_by
  )
  values (
    normalized_name,
    space_type,
    'BRL',
    authenticated_user_id
  )
  returning id into new_space_id;

  insert into public.financial_space_members (
    financial_space_id,
    user_id,
    role,
    membership_status,
    joined_at
  )
  values (
    new_space_id,
    authenticated_user_id,
    'admin',
    'active',
    now()
  );

  return new_space_id;
end;
$$;

-- Perfis: visualizar o próprio perfil ou membros de espaços em comum.
create policy profiles_select_authorized
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or public.users_share_active_space(auth.uid(), id)
);

-- Perfis: editar apenas o próprio perfil.
create policy profiles_update_own
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- Espaços: visualizar somente espaços dos quais participa.
create policy financial_spaces_select_active_member
on public.financial_spaces
for select
to authenticated
using (
  public.is_active_space_member(id)
);

-- Espaços: somente administradores ativos podem editar.
create policy financial_spaces_update_active_admin
on public.financial_spaces
for update
to authenticated
using (
  public.is_active_space_admin(id)
)
with check (
  public.is_active_space_admin(id)
);

-- Membros: visualizar participantes dos próprios espaços.
create policy financial_space_members_select_active_member
on public.financial_space_members
for select
to authenticated
using (
  public.is_active_space_member(financial_space_id)
);

-- Retira acesso anônimo.
revoke all on public.profiles from anon;
revoke all on public.financial_spaces from anon;
revoke all on public.financial_space_members from anon;

-- Permissões mínimas para usuários autenticados.
grant select, update on public.profiles to authenticated;
grant select, update on public.financial_spaces to authenticated;
grant select on public.financial_space_members to authenticated;

-- Funções disponíveis para usuários autenticados.
revoke all on function public.create_financial_space(text, text)
from public;

grant execute on function public.create_financial_space(text, text)
to authenticated;