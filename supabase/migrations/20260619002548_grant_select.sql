-- Existing tables
grant select on all tables in schema public to anon;
grant select on all tables in schema public to authenticated;
grant all privileges on all tables in schema public to service_role;

-- Future tables
alter default privileges for role postgres in schema public
grant select on tables to anon;

alter default privileges for role postgres in schema public
grant select on tables to authenticated;

alter default privileges for role postgres in schema public
grant all privileges on tables to service_role;