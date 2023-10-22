-- Active: 1697976577486@@127.0.0.1@3306

CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  creat_at TEXT NOT NULL
);

SELECT * FROM users;

PRAGMA table_info(users);

INSERT INTO users (id, name, email, password, creat_at)
VALUES ('u003', 'Thor', 'thor@email.com', 'thor123', strftime('%Y-%m-%dT%H:%M:%S', 'now')),
('u004', 'Gustavo', 'gustavo@email.com', 'Thor123', strftime('%Y-%m-%dT%H:%M:%S', 'now')),
('u005', 'José', 'jose@email.com', 'Mafas852', strftime('%Y-%m-%dT%H:%M:%S', 'now'));



CREATE TABLE products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url)
VALUES ('prod003', 'Teclado', '281.90', 'Teclado Mecanico', 'https://cdn.awsli.com.br/600x450/1867/1867451/produto/209589899/61nrwltbxfl-_ac_sy450_-22-03-2023-vleqlb.jpg'),
('prod004', 'HeadPhone', '383.00', 'Headphone gamer sem fio', 'https://images.tcdn.com.br/img/img_prod/740836/fone_de_ouvido_headphone_philips_wireless_sem_fio_preto_tauh202bk_00_6489_1_94fe9368b209fdc3936fc46cdab7cdc9.jpg'),
('prod005', 'Cabo HDMI', '60.80', 'Cabo Hdmi V2.0 Full HD', 'https://leonora.vteximg.com.br/arquivos/ids/163522/cabo-hdmi-1metro-ultra-hd-ponta-ouro-preto-letron--1.png?v=638028252489400000'),
('prod006', 'Gabinete', '349.90', 'Gabinete Gamer Bpc 330atx Preto', 'https://m.media-amazon.com/images/I/51dGFTP6o6L._AC_UF894,1000_QL80_.jpg'),
('prod007', 'Placa de Video', '1774.16', 'Placa de video GEFORCE RTX 2060', 'https://m.media-amazon.com/images/I/71FeFQy9U3L._AC_UF894,1000_QL80_.jpg');

SELECT * FROM products
WHERE name LIKE 'teclado';

DELETE FROM users
WHERE id = 'u004';

DELETE FROM products
WHERE id = 'prod006';

UPDATE products
SET 
  name = 'Teclado Mecanico',
  price = 529.99,
  description = 'Teclado Mecanico Gamer',
  image_url = 'https://m.media-amazon.com/images/I/71jAUlz7KPL._AC_UF894,1000_QL80_.jpg'
WHERE id = 'prod003';