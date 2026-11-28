-- El proyecto de Supabase otorga ALL, incluido TRUNCATE, al crear tablas en public.
-- TRUNCATE no pasa por RLS. Pasos y observaciones quedan solo en SELECT (P9).

revoke all on table public.perfiles from authenticated;
revoke all on table public.disponibilidades from authenticated;
revoke all on table public.tareas from authenticated;
revoke all on table public.pasos from authenticated;
revoke all on table public.responsables from authenticated;
revoke all on table public.observaciones from authenticated;
revoke all on table public.tareas_vista from authenticated;

grant select, insert, update, delete on table public.perfiles to authenticated;
grant select, insert, update, delete on table public.disponibilidades to authenticated;
grant select, insert, update, delete on table public.tareas to authenticated;
grant select, insert, update, delete on table public.responsables to authenticated;
grant select on table public.pasos to authenticated;
grant select on table public.observaciones to authenticated;
grant select on table public.tareas_vista to authenticated;
