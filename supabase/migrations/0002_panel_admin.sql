-- Agus Martín Academy · panel de administración (/admin).
-- Se corre después de 0001. Para darte permiso de admin, al final: insert into admins ... con tu mail.

create table if not exists public.admins (
  user_id uuid primary key references auth.users on delete cascade
);
alter table public.admins enable row level security; -- sin políticas: nadie la lee directo

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- Lista de alumnos: cuentas creadas y compras (aunque todavía no tengan cuenta).
create or replace function public.admin_students()
returns table (email text, has_account boolean, created_at timestamptz, enrolled_at timestamptz, source text, payment_id text, devices int, last_seen timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not is_admin() then raise exception 'forbidden'; end if;
  return query
  with people as (
    select lower(u.email) as email from auth.users u
    union select e.email from enrollments e
  )
  select p.email,
         u.id is not null,
         u.created_at,
         e.created_at,
         e.source,
         e.payment_id,
         coalesce((select count(*)::int from devices d where d.user_id = u.id), 0),
         (select max(d.last_seen) from devices d where d.user_id = u.id)
  from people p
  left join auth.users u on lower(u.email) = p.email
  left join enrollments e on e.email = p.email
  order by coalesce(e.created_at, u.created_at) desc nulls last;
end $$;

create or replace function public.admin_grant(p_email text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then raise exception 'forbidden'; end if;
  insert into enrollments (email, source) values (lower(trim(p_email)), 'manual') on conflict (email) do nothing;
end $$;

create or replace function public.admin_revoke(p_email text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not is_admin() then raise exception 'forbidden'; end if;
  delete from enrollments where email = lower(trim(p_email));
end $$;

-- Libera los dispositivos y cierra la sesión abierta: el alumno vuelve a entrar desde cero.
create or replace function public.admin_release_devices(p_email text)
returns void language plpgsql security definer set search_path = public as $$
declare uid uuid;
begin
  if not is_admin() then raise exception 'forbidden'; end if;
  select id into uid from auth.users where lower(email) = lower(trim(p_email));
  delete from devices where user_id = uid;
  delete from active_sessions where user_id = uid;
end $$;

revoke all on function public.is_admin(), public.admin_students(), public.admin_grant(text), public.admin_revoke(text), public.admin_release_devices(text) from public, anon;
grant execute on function public.is_admin(), public.admin_students(), public.admin_grant(text), public.admin_revoke(text), public.admin_release_devices(text) to authenticated;

-- Darle permiso de admin a una cuenta ya creada (cambiá el mail):
-- insert into admins (user_id) select id from auth.users where email = 'agus@mail.com';
