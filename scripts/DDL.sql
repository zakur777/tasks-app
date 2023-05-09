create table if not exists task
(
    id_task       serial
        primary key,
    completed     boolean      not null,
    creation_date timestamp(6) not null,
    description   varchar(100) not null
);

alter table task owner to postgres;