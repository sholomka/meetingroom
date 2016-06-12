--
-- Скрипт сгенерирован Devart dbForge Studio for MySQL, Версия 6.3.358.0
-- Домашняя страница продукта: http://www.devart.com/ru/dbforge/mysql/studio
-- Дата скрипта: 12.06.2016 22:53:31
-- Версия сервера: 5.6.22-log
-- Версия клиента: 4.1
--


-- 
-- Отключение внешних ключей
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Установить режим SQL (SQL mode)
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Установка кодировки, с использованием которой клиент будет посылать запросы на сервер
--
SET NAMES 'utf8';

-- 
-- Установка базы данных по умолчанию
--
USE meeting;

--
-- Описание для таблицы events
--
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id INT(11) NOT NULL AUTO_INCREMENT,
  m_id INT(11) NOT NULL,
  title VARCHAR(100) NOT NULL,
  applicant VARCHAR(100) NOT NULL,
  starts_at DATETIME DEFAULT NULL,
  ends_at DATETIME DEFAULT NULL,
  type INT(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_events_meeting_id FOREIGN KEY (m_id)
    REFERENCES meeting(id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = INNODB
AUTO_INCREMENT = 14
AVG_ROW_LENGTH = 16384
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Описание для таблицы events_type
--
DROP TABLE IF EXISTS events_type;
CREATE TABLE events_type (
  id INT(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 7
AVG_ROW_LENGTH = 2730
CHARACTER SET utf8
COLLATE utf8_general_ci;

--
-- Описание для таблицы meeting
--
DROP TABLE IF EXISTS meeting;
CREATE TABLE meeting (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  floor TINYINT(1) UNSIGNED DEFAULT NULL,
  seats_number INT(11) DEFAULT NULL,
  phone VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 4
AVG_ROW_LENGTH = 5461
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Вывод данных для таблицы events
--
INSERT INTO events VALUES
(4, 2, 'New event', 'Заявитель', '2016-06-12 09:00:00', '2016-06-12 09:00:00', 4),
(5, 2, 'New event', 'Заявитель', '2016-06-13 09:00:00', '2016-06-13 09:00:00', 5),
(6, 2, 'New event', 'Заявитель', '2016-06-14 09:00:00', '2016-06-14 09:00:00', 6),
(7, 3, 'New event', 'Заявитель', '2016-06-12 09:00:00', '2016-06-12 06:00:00', 1),
(8, 3, 'New event', 'Заявитель', '2016-06-13 09:00:00', '2016-06-13 09:00:00', 3),
(9, 3, 'New event', 'Заявитель', '2016-06-14 09:00:00', '2016-06-14 09:00:00', 5),
(10, 1, 'New event', 'Заявитель', '2016-06-12 09:00:00', '2016-06-12 09:00:00', 1),
(11, 1, 'New event', 'Заявитель', '2016-06-13 09:00:00', '2016-06-13 09:00:00', 2),
(12, 1, 'New event', 'Заявитель', '2016-06-14 09:00:00', '2016-06-14 09:00:00', 3),
(13, 1, 'New event', 'Заявитель', '2016-06-15 09:00:00', '2016-06-15 09:00:00', 3);

-- 
-- Вывод данных для таблицы events_type
--
INSERT INTO events_type VALUES
(1, 'Совещание', 'important'),
(2, 'Презентация', 'warning'),
(3, 'Переговоры', 'info'),
(4, 'Прочее', 'inverse'),
(5, 'Success', 'success'),
(6, 'Special', 'special');

-- 
-- Вывод данных для таблицы meeting
--
INSERT INTO meeting VALUES
(1, 'Большая переговорная (центральная)', 'Большая переговорная для проведения конференций', 1, 350, '12-34-56'),
(2, 'Переговорная в восточном крыле', 'Малая переговорная для нескольких человек', 3, 10, '34-56-78'),
(3, 'Переговорная в западном крыле', 'Переговорная с проектором и доступом в интернет', 2, 50, '56-78-90');

-- 
-- Восстановить предыдущий режим SQL (SQL mode)
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Включение внешних ключей
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;