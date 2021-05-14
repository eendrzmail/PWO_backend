-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 14 Maj 2021, 13:04
-- Wersja serwera: 10.4.16-MariaDB
-- Wersja PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `wypozyczalnia`
--
CREATE DATABASE IF NOT EXISTS `wypozyczalnia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `wypozyczalnia`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `agent`
--

DROP TABLE IF EXISTS `agent`;
CREATE TABLE IF NOT EXISTS `agent` (
  `email` varchar(255) NOT NULL,
  `imie` varchar(50) NOT NULL,
  `nazwisko` varchar(100) DEFAULT NULL,
  `haslo` varchar(250) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `samochod`
--

DROP TABLE IF EXISTS `samochod`;
CREATE TABLE IF NOT EXISTS `samochod` (
  `numer_rejestracyjny` varchar(10) NOT NULL,
  `marka` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  PRIMARY KEY (`numer_rejestracyjny`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wypozyczenie`
--

DROP TABLE IF EXISTS `wypozyczenie`;
CREATE TABLE IF NOT EXISTS `wypozyczenie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` date NOT NULL,
  `koniec` date NOT NULL,
  `samochod` varchar(10) NOT NULL,
  `utworzono` date NOT NULL,
  `kto_utworzyl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `samochod` (`samochod`),
  KEY `kto_utworzyl` (`kto_utworzyl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `wypozyczenie`
--
ALTER TABLE `wypozyczenie`
  ADD CONSTRAINT `wypozyczenie_ibfk_1` FOREIGN KEY (`samochod`) REFERENCES `samochod` (`numer_rejestracyjny`),
  ADD CONSTRAINT `wypozyczenie_ibfk_2` FOREIGN KEY (`kto_utworzyl`) REFERENCES `agent` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
