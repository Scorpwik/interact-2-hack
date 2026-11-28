-- RLS por perfil. Marcar y observar no se permiten por tabla (P9).

create schema if not exists private;

create or replace function private.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.perfiles
    where id = (select auth.uid())
      and rol = 'admin'
  );
$$;

create or replace function private.puede_ver_tarea(p_tarea uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.tareas as t
    where t.id = p_tarea
      and (
        t.urgente
        or exists (
          select 1
          from public.responsables as r
          where r.tarea = t.id
            and r.perfil = (select auth.uid())
        )
      )
  );
$$;

create or replace function private.puede_ver_perfil(p_perfil uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select p_perfil = (select auth.uid())
    or exists (
      select 1
      from public.responsables as otro
      join public.tareas as t on t.id = otro.tarea
      where otro.perfil = p_perfil
        and (
          t.urgente
          or exists (
            select 1
            from public.responsables as mio
            where mio.tarea = t.id
              and mio.perfil = (select auth.uid())
          )
        )
    );
$$;

revoke all on function private.es_admin() from public;
revoke all on function private.puede_ver_tarea(uuid) from public;
revoke all on function private.puede_ver_perfil(uuid) from public;

grant usage on schema private to authenticated;
grant execute on function private.es_admin() to authenticated;
grant execute on function private.puede_ver_tarea(uuid) to authenticated;
grant execute on function private.puede_ver_perfil(uuid) to authenticated;

alter table public.perfiles enable row level security;
alter table public.disponibilidades enable row level security;
alter table public.tareas enable row level security;
alter table public.pasos enable row level security;
alter table public.responsables enable row level security;
alter table public.observaciones enable row level security;

create policy perfiles_admin_todo
  on public.perfiles
  for all
  to authenticated
  using ((select private.es_admin()))
  with check ((select private.es_admin()));

create policy perfiles_estudiante_lee
  on public.perfiles
  for select
  to authenticated
  using ((select private.puede_ver_perfil(id)));

create policy disponibilidades_admin_todo
  on public.disponibilidades
  for all
  to authenticated
  using ((select private.es_admin()))
  with check ((select private.es_admin()));

create policy tareas_admin_todo
  on public.tareas
  for all
  to authenticated
  using ((select private.es_admin()))
  with check ((select private.es_admin()));

create policy tareas_estudiante_lee
  on public.tareas
  for select
  to authenticated
  using ((select private.puede_ver_tarea(id)));

create policy responsables_admin_todo
  on public.responsables
  for all
  to authenticated
  using ((select private.es_admin()))
  with check ((select private.es_admin()));

create policy responsables_estudiante_lee
  on public.responsables
  for select
  to authenticated
  using ((select private.puede_ver_tarea(tarea)));

create policy pasos_lee
  on public.pasos
  for select
  to authenticated
  using (
    (select private.es_admin())
    or (select private.puede_ver_tarea(tarea))
  );

create policy observaciones_lee
  on public.observaciones
  for select
  to authenticated
  using (
    (select private.es_admin())
    or (select private.puede_ver_tarea(tarea))
  );

revoke all on table public.perfiles from anon;
revoke all on table public.disponibilidades from anon;
revoke all on table public.tareas from anon;
revoke all on table public.pasos from anon;
revoke all on table public.responsables from anon;
revoke all on table public.observaciones from anon;
revoke all on table public.tareas_vista from anon;

grant select, insert, update, delete on table public.perfiles to authenticated;
grant select, insert, update, delete on table public.disponibilidades to authenticated;
grant select, insert, update, delete on table public.tareas to authenticated;
grant select, insert, update, delete on table public.responsables to authenticated;
grant select on table public.pasos to authenticated;
grant select on table public.observaciones to authenticated;
grant select on table public.tareas_vista to authenticated;

grant select, insert, update, delete on table public.perfiles to service_role;
grant select, insert, update, delete on table public.disponibilidades to service_role;
grant select, insert, update, delete on table public.tareas to service_role;
grant select, insert, update, delete on table public.pasos to service_role;
grant select, insert, update, delete on table public.responsables to service_role;
grant select, insert, update, delete on table public.observaciones to service_role;
grant select on table public.tareas_vista to service_role;
