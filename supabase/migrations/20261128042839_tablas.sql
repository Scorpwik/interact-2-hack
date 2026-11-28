-- Perfiles, disponibilidades, tareas, pasos, responsables y observaciones.

create table public.perfiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre text not null,
  correo text not null,
  telefono text not null default '',
  rol text not null,
  es_super_admin boolean not null default false,
  constraint perfiles_rol_check check (rol in ('admin', 'estudiante')),
  constraint perfiles_correo_unique unique (correo)
);

create table public.disponibilidades (
  id uuid primary key default gen_random_uuid(),
  perfil uuid not null references public.perfiles (id) on delete cascade,
  dia date not null,
  desde time not null,
  hasta time not null,
  constraint disponibilidades_rango_check check (hasta > desde)
);

create index disponibilidades_perfil_dia_idx
  on public.disponibilidades (perfil, dia);

create table public.tareas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  vence_en timestamptz not null,
  lugar text not null,
  urgente boolean not null default false,
  creada_por uuid references public.perfiles (id) on delete set null,
  iniciada_por uuid references public.perfiles (id) on delete set null,
  iniciada_en timestamptz,
  iniciada_por_nombre text,
  completada_por uuid references public.perfiles (id) on delete set null,
  completada_en timestamptz,
  completada_por_nombre text,
  fuera_de_hora boolean not null default false,
  editando_por uuid references public.perfiles (id) on delete set null,
  editando_desde timestamptz
);

create index tareas_vence_en_idx on public.tareas (vence_en);
create index tareas_creada_por_idx on public.tareas (creada_por);
create index tareas_iniciada_por_idx on public.tareas (iniciada_por);
create index tareas_completada_por_idx on public.tareas (completada_por);
create index tareas_editando_por_idx on public.tareas (editando_por);

create table public.pasos (
  id uuid primary key default gen_random_uuid(),
  tarea uuid not null references public.tareas (id) on delete cascade,
  orden integer not null,
  texto text not null,
  marcado_por uuid references public.perfiles (id) on delete set null,
  marcado_en timestamptz,
  marcado_por_nombre text,
  constraint pasos_orden_check check (orden >= 1),
  constraint pasos_tarea_orden_unique unique (tarea, orden),
  constraint pasos_marcado_check check (
    marcado_por is null or marcado_en is not null
  )
);

create index pasos_marcado_por_idx on public.pasos (marcado_por);

create table public.responsables (
  tarea uuid not null references public.tareas (id) on delete cascade,
  perfil uuid not null references public.perfiles (id) on delete cascade,
  primary key (tarea, perfil)
);

create index responsables_perfil_idx on public.responsables (perfil);

create table public.observaciones (
  id uuid primary key default gen_random_uuid(),
  tarea uuid not null references public.tareas (id) on delete cascade,
  autor uuid references public.perfiles (id) on delete set null,
  autor_nombre text not null,
  texto text not null,
  creada_en timestamptz not null default now()
);

create index observaciones_tarea_idx on public.observaciones (tarea);
create index observaciones_autor_idx on public.observaciones (autor);
