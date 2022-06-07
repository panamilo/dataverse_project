CREATE TABLE Categories(

id serial NOT NULL PRIMARY KEY,
name VARCHAR(100) UNIQUE NOT NULL,
description VARCHAR(500)
);

CREATE TABLE Articles(

id SERIAL NOT NULL PRIMARY KEY,
category_id INT NOT NULL,
title VARCHAR(100) UNIQUE NOT NULL,
description VARCHAR(500) NOT NULL,
author VARCHAR(100) NOT NULL
);

ALTER TABLE Articles ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;