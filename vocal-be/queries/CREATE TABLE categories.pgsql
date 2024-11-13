CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

alter table categories
drop COLUMN image

alter table categories
add COLUMN image varchar

ALTER TABLE groups
ADD COLUMN category_id INT,
ADD FOREIGN KEY (category_id) REFERENCES categories(id) 

select groups.* from groups LEFT JOIN groups_collections on groups.id = groups_collections.group_id;

insert into categories (name) VALUES ('IT');

insert into categories (name) VALUES ('May mặc');

insert into categories (name) VALUES ('Kinh tế');