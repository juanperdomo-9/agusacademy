-- Agus Martín Academy · alumnos, dispositivos y sesión única.
-- Se corre una vez en Supabase: SQL Editor → pegar → Run.
--
-- Reglas:
--   · Acceso al curso por mail comprado (el webhook de Mercado Pago carga la fila; mientras tanto, a mano).
--   · Máximo 2 dispositivos por cuenta. Uno nuevo más allá de eso no puede entrar.
--   · Una sola sesión abierta: entrar en un dispositivo cierra la sesión del otro.

-- Compras. Por mail, así se puede comprar antes de crear la cuenta.
create table if not exists public.enrollments (
  email text primary key check (email = lower(email)),
  source text not null default 'manual',          -- 'manual' | 'mercadopago'
  payment_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.devices (
  user_id uuid not null references auth.users on delete cascade,
  device_id text not null,
  label text,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  primary key (user_id, device_id)
);

create table if not exists public.active_sessions (
  user_id uuid primary key references auth.users on delete cascade,
  token uuid not null,
  device_id text not null,
  started_at timestamptz not null default now()
);

alter table public.enrollments enable row level security;
alter table public.devices enable row level security;
alter table public.active_sessions enable row level security;

-- Cada alumno solo ve lo suyo. Nadie escribe directo: todo pasa por las funciones de abajo.
drop policy if exists "ver mi compra" on public.enrollments;
create policy "ver mi compra" on public.enrollments for select to authenticated
  using (email = lower(auth.jwt() ->> 'email'));
drop policy if exists "ver mis dispositivos" on public.devices;
create policy "ver mis dispositivos" on public.devices for select to authenticated
  using (user_id = auth.uid());

-- Al iniciar sesión: registra el dispositivo (máx. 2) y lo deja como única sesión válida.
create or replace function public.claim_session(p_device text, p_label text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  n int;
  t uuid := gen_random_uuid();
begin
  if uid is null then raise exception 'not_authenticated'; end if;
  if exists (select 1 from devices where user_id = uid and device_id = p_device) then
    update devices set last_seen = now() where user_id = uid and device_id = p_device;
  else
    select count(*) into n from devices where user_id = uid;
    if n >= 2 then raise exception 'device_limit'; end if;
    insert into devices (user_id, device_id, label) values (uid, p_device, left(p_label, 80));
  end if;
  insert into active_sessions (user_id, token, device_id) values (uid, t, p_device)
    on conflict (user_id) do update set token = excluded.token, device_id = excluded.device_id, started_at = now();
  return t;
end $$;

-- ¿Esta sigue siendo la sesión abierta? Si alguien entró desde otro dispositivo, devuelve false.
create or replace function public.check_session(p_token uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from active_sessions where user_id = auth.uid() and token = p_token);
$$;

create or replace function public.has_course()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from enrollments where email = lower(auth.jwt() ->> 'email'));
$$;

revoke all on function public.claim_session(text, text) from public, anon;
revoke all on function public.check_session(uuid) from public, anon;
revoke all on function public.has_course() from public, anon;
grant execute on function public.claim_session(text, text) to authenticated;
grant execute on function public.check_session(uuid) to authenticated;
grant execute on function public.has_course() to authenticated;

-- ─── Tareas de Agus (SQL Editor) ───────────────────────────────────────────
-- Dar acceso a mano:        insert into enrollments (email) values ('alumno@mail.com');
-- Liberar dispositivos:     delete from devices where user_id = (select id from auth.users where email = 'alumno@mail.com');
-- Quitar acceso:            delete from enrollments where email = 'alumno@mail.com';
