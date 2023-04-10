create table version
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    version     varchar(20) NOT NULL UNIQUE
);

insert into `version` (`version`) values ('2023-04-10-01');

create table history
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    image_data      text,
    ocr_text      text,
    translate_text      text,
    cloud        varchar(20)
);
