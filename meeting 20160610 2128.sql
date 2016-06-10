--
-- Скрипт сгенерирован Devart dbForge Studio for MySQL, Версия 7.0.54.0
-- Домашняя страница продукта: http://www.devart.com/ru/dbforge/mysql/studio
-- Дата скрипта: 6/10/2016 9:28:04 PM
-- Версия сервера: 5.6.26
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
  starts_at DATETIME NOT NULL,
  ends_at DATETIME NOT NULL,
  type INT(11) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_events_meeting_id FOREIGN KEY (m_id)
    REFERENCES meeting(id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE = INNODB
AUTO_INCREMENT = 2
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
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 2
AVG_ROW_LENGTH = 16384
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
AVG_ROW_LENGTH = 8192
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- 
-- Вывод данных для таблицы events
--
INSERT INTO events VALUES
(1, 1, 'собрание', 'Юрий', '2016-06-10 19:39:49', '2016-06-10 19:51:51', 1);

-- 
-- Вывод данных для таблицы events_type
--
INSERT INTO events_type VALUES
(1, 'info');

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