-- -------------------------------------------------------------
-- TablePlus 3.12.8(368)
--
-- https://tableplus.com/
--
-- Database: imageboard
-- Generation Time: 2021-05-17 10:07:40.8920
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS comments_id_seq;

-- Table Definition
CREATE TABLE "public"."comments" (
    "id" int4 NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
    "username" varchar(255),
    "image_id" int4 NOT NULL,
    "text" text NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "comments_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."comments" ("id", "username", "image_id", "text", "created_at") VALUES
(1, 'Rodrigo', 9, 'This is a great comment', '2021-03-28 21:39:46.548949'),
(2, 'John', 9, 'Great picture', '2021-03-28 21:39:56.563098'),
(3, 'Dana', 9, 'awesome tree', '2021-03-28 21:40:06.043454'),
(4, 'Jeremias', 10, 'Love this landscape', '2021-03-28 21:40:23.372509'),
(5, 'Daniela', 10, 'amazing view', '2021-03-28 21:40:33.377153'),
(6, 'Jason', 12, 'pink everywhere', '2021-03-28 21:40:49.941303'),
(7, 'Marco', 12, 'foggy!!!!
', '2021-03-28 21:41:10.171375'),
(8, 'Lautaro', 13, 'Love balloons', '2021-03-28 21:41:24.88666'),
(9, 'Katharina', 7, 'Toll! Ich liebe Rugby Stadiums', '2021-03-29 09:40:18.548927'),
(10, 'Reinhardt', 6, 'This is the Llao Llao Hotel in Bariloche, amazing view.', '2021-03-29 09:42:16.782426'),
(11, 'Jeremias Springfield', 6, 'Bariloche and patagonia vibes.', '2021-03-29 09:42:38.874085'),
(12, 'Björn', 5, 'Was für ein blick von Berlin!', '2021-03-29 09:43:00.932742'),
(13, 'Shawn', 5, 'Great aerial view of Berlin', '2021-03-29 09:43:21.840473'),
(14, '系山地本还并形信这内认山战敌个个品', 4, ' 北收八向斯可林，亲立科率么，示李还许七。

      议积之打率通当容格段员备，定技管风共五做置压重，断农飞E呜又重才金盯。 院精制而装求十周派太，电建问律整于别团联，半亲Y名全务命术。 车人议劳极入我格方流研，图深号装育任报许复方系，段南录A苏铁律身眼。

      价原参四重政例，务容般容文则处根，保承议华满别。 单看争书共包构生，难听内单活子，转那蠢扭节离。 据存代具厂观百个你心，书对油天听率地群周求，华织否将到段没知。 素月部眼面而集无队标看海西，受很引题装转T伶承坝习。 些难华八命任广，般金严联场立基，世豆或团事。 青月下公二百品而许一，西计使用知列名带天，文装辰命才离两豆。', '2021-03-29 09:44:27.801755'),
(15, 'Novak', 3, 'Шекспир је мој омиљени аутор', '2021-03-29 09:45:28.12013'),
(16, 'Carlton', 3, 'To eat or not to eat, that is the question.', '2021-03-29 09:46:13.272794'),
(17, 'Raval', 2, 'Greatest Rock artist ever
', '2021-03-29 09:46:34.446149'),
(19, 'Lomu', 7, 'This looks like Twickenham stadium', '2021-03-29 09:47:33.284646'),
(20, 'Buba', 8, 'African Serengetti, best volcan plateau on earth', '2021-03-29 09:48:08.825978'),
(21, 'Lars', 10, 'great picture!', '2021-03-29 10:35:41.047414');
