-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.17-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para aparta
CREATE DATABASE IF NOT EXISTS `aparta` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `aparta`;

-- Volcando estructura para tabla aparta.instrumento
CREATE TABLE IF NOT EXISTS `instrumento` (
  `ID_INSTRUMENTO` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE_INSTRUMENTO` varchar(80) DEFAULT NULL,
  `DESCRIPCION` varchar(80) DEFAULT NULL,
  `ESTADO` varchar(30) DEFAULT NULL,
  `CODIGO_REFERENCIA` varchar(80) DEFAULT NULL,
  `TIPO` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID_INSTRUMENTO`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla aparta.reserva
CREATE TABLE IF NOT EXISTS `reserva` (
  `ID_RESERVA` int(11) NOT NULL,
  `FECHA_ASIGNACION` date DEFAULT NULL,
  `DESCRIPCION` varchar(80) DEFAULT NULL,
  `INSTRUMENTO_ID_INSTRUMENTO` int(11) NOT NULL,
  `USUARIO_ID_USUARIO` varchar(15) NOT NULL,
  PRIMARY KEY (`ID_RESERVA`),
  KEY `fk_RESERVA_INSTRUMENTO1_idx` (`INSTRUMENTO_ID_INSTRUMENTO`),
  KEY `fk_RESERVA_USUARIO1_idx` (`USUARIO_ID_USUARIO`),
  CONSTRAINT `fk_RESERVA_INSTRUMENTO1` FOREIGN KEY (`INSTRUMENTO_ID_INSTRUMENTO`) REFERENCES `instrumento` (`ID_INSTRUMENTO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_RESERVA_USUARIO1` FOREIGN KEY (`USUARIO_ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla aparta.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `ID_ROL` int(11) NOT NULL,
  `DESCRIPCION` varchar(200) DEFAULT NULL,
  `ESTADO` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID_ROL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla aparta.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `ID_USUARIO` varchar(15) NOT NULL,
  `NOMBRE` varchar(80) DEFAULT NULL,
  `APELLIDOS` varchar(80) DEFAULT NULL,
  `TELEFONO` varchar(12) DEFAULT NULL,
  `DIRECCION` varchar(80) DEFAULT NULL,
  `EMAIL` varchar(80) DEFAULT NULL,
  `PASSWORD` varchar(20) DEFAULT NULL,
  `ROL_ID_ROL` int(11) NOT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  KEY `fk_USUARIO_ROL_idx` (`ROL_ID_ROL`),
  CONSTRAINT `fk_USUARIO_ROL` FOREIGN KEY (`ROL_ID_ROL`) REFERENCES `rol` (`ID_ROL`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
