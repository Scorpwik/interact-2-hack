-- Estado y por vencer según R11 y R12. security_invoker: vale la RLS de las tablas.

create view public.tareas_vista
with (security_invoker = true) as
select
  t.id,
  t.nombre,
  t.descripcion,
  t.vence_en,
  t.lugar,
  t.urgente,
  t.creada_por,
  t.iniciada_por,
  t.iniciada_en,
  t.iniciada_por_nombre,
  t.completada_por,
  t.completada_en,
  t.completada_por_nombre,
  t.fuera_de_hora,
  t.editando_por,
  t.editando_desde,
  coalesce(p.pasos_total, 0)::integer as pasos_total,
  coalesce(p.pasos_marcados, 0)::integer as pasos_marcados,
  coalesce(r.responsables_total, 0)::integer as responsables_total,
  case
    when t.completada_en is not null then 'completada'
    when now() >= t.vence_en then 'vencida'
    when coalesce(r.responsables_total, 0) = 0 then 'sin_asignar'
    when coalesce(p.pasos_marcados, 0) > 0 then 'en_ejecucion'
    else 'pendiente'
  end as estado,
  case
    when t.completada_en is not null then false
    when now() >= t.vence_en then false
    when t.vence_en <= now() + interval '60 minutes' then true
    else false
  end as por_vencer
from public.tareas t
left join (
  select
    tarea,
    count(*)::integer as pasos_total,
    count(marcado_en)::integer as pasos_marcados
  from public.pasos
  group by tarea
) p on p.tarea = t.id
left join (
  select
    tarea,
    count(*)::integer as responsables_total
  from public.responsables
  group by tarea
) r on r.tarea = t.id;
