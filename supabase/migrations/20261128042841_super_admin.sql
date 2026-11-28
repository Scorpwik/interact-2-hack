-- Un solo super administrador, y no se borra ni cambia de rol (R3).

create schema if not exists private;

create unique index perfiles_un_super_admin
  on public.perfiles (es_super_admin)
  where es_super_admin;

create or replace function private.proteger_super_admin()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    if old.es_super_admin then
      raise exception 'No se puede borrar ni cambiar el perfil del super administrador.';
    end if;
    return old;
  end if;

  if old.es_super_admin and (
    new.rol is distinct from old.rol
    or new.es_super_admin is distinct from old.es_super_admin
  ) then
    raise exception 'No se puede borrar ni cambiar el perfil del super administrador.';
  end if;

  return new;
end;
$$;

create trigger perfiles_proteger_super_admin
  before update or delete on public.perfiles
  for each row
  execute function private.proteger_super_admin();

revoke all on function private.proteger_super_admin() from public, anon, authenticated;
