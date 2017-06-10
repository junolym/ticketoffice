/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/06/10 16:56:29                          */
/*==============================================================*/


drop table if exists cinemas;

drop table if exists movies;

drop table if exists orders;

drop table if exists schedules;

drop table if exists screens;

drop table if exists users;

/*==============================================================*/
/* Table: cinemas                                               */
/*==============================================================*/
create table cinemas
(
   cinema_id            int not null,
   cinema_name          varchar(31) not null,
   cinema_country       char(15),
   cinema_city          varchar(31),
   cinema_location      varchar(255),
   cinema_description   text,
   primary key (cinema_id)
);

/*==============================================================*/
/* Table: movies                                                */
/*==============================================================*/
create table movies
(
   movie_id             bigint not null,
   movie_img            varchar(255),
   movie_name           varchar(255),
   movie_publish        date,
   movie_time           int,
   movie_director       varchar(255),
   movie_language       varchar(31),
   movie_type           varchar(255),
   movie_description    text,
   primary key (movie_id)
);

/*==============================================================*/
/* Table: orders                                                */
/*==============================================================*/
create table orders
(
   ord_sch_id           bigint,
   ord_username         char(20),
   ord_seat             varchar(128),
   ord_num              tinyint
);

/*==============================================================*/
/* Table: schedules                                             */
/*==============================================================*/
create table schedules
(
   schedule_id          bigint not null,
   sch_movie_id         bigint not null,
   sch_cinema_id        int not null,
   sch_screen_name      varchar(31) not null,
   play_time            datetime not null,
   price                int,
   sales                varchar(2047),
   primary key (schedule_id)
);

/*==============================================================*/
/* Table: screens                                               */
/*==============================================================*/
create table screens
(
   scr_cinema_id        int not null,
   screen_name          varchar(31) not null,
   screan_seat          int,
   primary key (scr_cinema_id, screen_name)
);

/*==============================================================*/
/* Table: users                                                 */
/*==============================================================*/
create table users
(
   username             char(20) not null,
   password             char(32),
   realname             varchar(64),
   nickname             varchar(32),
   phone                char(20),
   email                char(64),
   primary key (username)
);

alter table orders add constraint FK_Reference_4 foreign key (ord_sch_id)
      references schedules (schedule_id) on delete restrict on update restrict;

alter table orders add constraint FK_Reference_5 foreign key (ord_username)
      references users (username) on delete restrict on update restrict;

alter table schedules add constraint FK_Reference_1 foreign key (sch_movie_id)
      references movies (movie_id) on delete restrict on update restrict;

alter table schedules add constraint FK_Reference_3 foreign key (sch_cinema_id, sch_screen_name)
      references screens (scr_cinema_id, screen_name) on delete restrict on update restrict;

alter table screens add constraint FK_Reference_2 foreign key (scr_cinema_id)
      references cinemas (cinema_id) on delete restrict on update restrict;

