SET FOREIGN_KEY_CHECKS=0;
drop table if exists `absenceTypes`;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE `absenceTypes` (
  `absenceType_id` int NOT NULL primary key auto_increment,
  `name` varchar(50) NOT NULL,
  `paidRate` double(10,2) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 

SET FOREIGN_KEY_CHECKS=0;
drop table if exists `absences`;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE `absences` (
  `absence_id` int NOT NULL primary key auto_increment,
  `employee_id` int,
  `absence_type` int,
  `absence_from` Date,
  `absence_to` Date
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE absences
	ADD FOREIGN KEY (employee_id) REFERENCES employees(id),
    ADD FOREIGN KEY (absence_type) REFERENCES absencetypes(absencetype_id);

-- 

SET FOREIGN_KEY_CHECKS=0;
drop table if exists `bonuses`;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE `bonuses` (
  `bonus_id` int NOT NULL primary key auto_increment,
  `employee_id` int NOT NULL,
  `value` double(10,2) NULL,
  `bonus_date` Date
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE bonuses
	ADD FOREIGN KEY (employee_id) REFERENCES employees(id);