
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+01:00";



CREATE TABLE `users` (
  `email` varchar(250) NOT NULL,
  `imie` varchar(50) NOT NULL,
  `nazwisko` varchar(100) DEFAULT NULL,
  `haslo` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);
