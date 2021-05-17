-- -------------------------------------------------------------
-- TablePlus 3.12.8(368)
--
-- https://tableplus.com/
--
-- Database: imageboard
-- Generation Time: 2021-05-17 10:08:15.6480
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS images_id_seq;

-- Table Definition
CREATE TABLE "public"."images" (
    "id" int4 NOT NULL DEFAULT nextval('images_id_seq'::regclass),
    "url" varchar NOT NULL,
    "username" varchar NOT NULL,
    "title" varchar NOT NULL,
    "description" text,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."images" ("id", "url", "username", "title", "description", "created_at") VALUES
(2, 'https://s3.amazonaws.com/imageboard/wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg', 'discoduck', 'Elvis', 'We can''t go on together with suspicious minds.', '2021-03-28 21:16:07.851318'),
(3, 'https://s3.amazonaws.com/imageboard/XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg', 'discoduck', 'To be or not to be', 'That is the question.', '2021-03-28 21:16:07.851634'),
(4, 'https://s3.amazonaws.com/image-board-pfeffer/1kWBjUecP_QI2B6YT8LcZJkcOWG3_uaU.jpeg', 'Jose_98', 'Josefina', 'Picture of a beautiful landscape', '2021-03-28 21:20:29.30873'),
(5, 'https://s3.amazonaws.com/image-board-pfeffer/rEgFIR7FAW3miigj0NYXw2_FDyKWyX_L.jpeg', 'rama_45', 'Ramiro', 'Berlin from the sky', '2021-03-28 21:21:12.925943'),
(6, 'https://s3.amazonaws.com/image-board-pfeffer/tdgE--SL4798X9BtFevvQMVLBdgRL7AV.jpeg', 'Janine_33', 'Janine', 'This photo is about my country, Argentina', '2021-03-28 21:21:59.616208'),
(7, 'https://s3.amazonaws.com/image-board-pfeffer/219i1w6p-iVfFKOApac3qX2Sne9EWE2x.jpeg', 'juana_', 'Juana', 'This photo is of a Rugby field', '2021-03-28 21:22:48.037107'),
(8, 'https://s3.amazonaws.com/image-board-pfeffer/klVJ4YhoYjuJOhFHs-NvdpuFMNjQa1gG.jpeg', 'Benjamin_button', 'Benjamin', 'African Serengeti', '2021-03-28 21:25:02.284534'),
(9, 'https://s3.amazonaws.com/image-board-pfeffer/hBz-lKK7qXthh0NV934Wa56lQnV_F0-z.webp', 'wolfang_amadeus', 'Wolfang', 'Yellow tree on a lake', '2021-03-28 21:27:53.085297'),
(10, 'https://s3.amazonaws.com/image-board-pfeffer/1QFi0XO_DWFEM7yGDrF_svBujSaE05VE.jpg', 'Ludwig_van_B', 'Ludwig', 'Pier path into water', '2021-03-28 21:28:56.381146'),
(12, 'https://s3.amazonaws.com/image-board-pfeffer/Ni-knPDKRCp4C2iq9mYAyb90qQPeF7Od.jpeg', 'Tony_kellogs', 'Tony', 'Torres del Paine, Chile', '2021-03-28 21:31:10.530317'),
(13, 'https://s3.amazonaws.com/image-board-pfeffer/z28EbUPTjWKRash7ZeQ1N4wnJaY49_6t.jpeg', 'Mustafa_SA', ' Mustafa', 'Hot air Balloons ', '2021-03-28 21:32:09.36164'),
(14, 'https://s3.amazonaws.com/image-board-pfeffer/rbR6WEFNzEMYPTsUpdghMufLMUZH0TSE.webp', 'Diego_el10', 'Diego', 'Small Town in the middle of the mountains', '2021-03-28 21:34:31.748136'),
(16, 'https://s3.amazonaws.com/image-board-pfeffer/PVfoPlH2AbY7-etnibCzVbSKa33govpl.jpeg', 'Catalina_manzana', 'Catalina', 'Tree standing under mountains', '2021-03-28 21:37:26.82999'),
(18, 'https://s3.amazonaws.com/image-board-pfeffer/04BF7H5r1Ve_MOA-_ISxC_j2EKAF1-HS.jpeg', 'Daniela_Mercury', 'Daniela', 'Hills running into the sea shore', '2021-03-29 09:38:33.892823'),
(19, 'https://s3.amazonaws.com/image-board-pfeffer/y3gfc6qoYBC5TD1WX-tPhq1uUyoQ4_So.jpeg', 'johan_', 'Johan', 'Something', '2021-03-29 10:34:40.097599');
