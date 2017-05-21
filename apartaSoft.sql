-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema aparta
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `aparta` ;

-- -----------------------------------------------------
-- Schema aparta
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aparta` DEFAULT CHARACTER SET utf8 ;
USE `aparta` ;

-- -----------------------------------------------------
-- Table `aparta`.`ROL`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aparta`.`ROL` ;

CREATE TABLE IF NOT EXISTS `aparta`.`ROL` (
  `ID_ROL` INT NOT NULL,
  `DESCRIPCION` VARCHAR(200) NULL,
  `ESTADO` VARCHAR(30) NULL,
  PRIMARY KEY (`ID_ROL`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aparta`.`USUARIO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aparta`.`USUARIO` ;

CREATE TABLE IF NOT EXISTS `aparta`.`USUARIO` (
  `ID_USUARIO` VARCHAR(15) NOT NULL,
  `NOMBRE` VARCHAR(80) NULL,
  `APELLIDOS` VARCHAR(80) NULL,
  `TELEFONO` VARCHAR(12) NULL,
  `DIRECCION` VARCHAR(80) NULL,
  `EMAIL` VARCHAR(80) NULL,
  `PASSWORD` VARCHAR(20) NULL,
  `ROL_ID_ROL` INT NOT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  CONSTRAINT `fk_USUARIO_ROL`
    FOREIGN KEY (`ROL_ID_ROL`)
    REFERENCES `aparta`.`ROL` (`ID_ROL`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_USUARIO_ROL_idx` ON `aparta`.`USUARIO` (`ROL_ID_ROL` ASC);


-- -----------------------------------------------------
-- Table `aparta`.`INSTRUMENTO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aparta`.`INSTRUMENTO` ;

CREATE TABLE IF NOT EXISTS `aparta`.`INSTRUMENTO` (
  `ID_INSTRUMENTO` INT NOT NULL,
  `NOMBRE_INSTRUMENTO` VARCHAR(80) NULL,
  `DESCRIPCION` VARCHAR(80) NULL,
  `ESTADO` VARCHAR(30) NULL,
  `CODIGO_REFERENCIA` VARCHAR(80) NULL,
  PRIMARY KEY (`ID_INSTRUMENTO`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aparta`.`RESERVA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aparta`.`RESERVA` ;

CREATE TABLE IF NOT EXISTS `aparta`.`RESERVA` (
  `ID_RESERVA` INT NOT NULL,
  `FECHA_ASIGNACION` DATE NULL,
  `DESCRIPCION` VARCHAR(80) NULL,
  `INSTRUMENTO_ID_INSTRUMENTO` INT NOT NULL,
  `USUARIO_ID_USUARIO` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`ID_RESERVA`),
  CONSTRAINT `fk_RESERVA_INSTRUMENTO1`
    FOREIGN KEY (`INSTRUMENTO_ID_INSTRUMENTO`)
    REFERENCES `aparta`.`INSTRUMENTO` (`ID_INSTRUMENTO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RESERVA_USUARIO1`
    FOREIGN KEY (`USUARIO_ID_USUARIO`)
    REFERENCES `aparta`.`USUARIO` (`ID_USUARIO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_RESERVA_INSTRUMENTO1_idx` ON `aparta`.`RESERVA` (`INSTRUMENTO_ID_INSTRUMENTO` ASC);

CREATE INDEX `fk_RESERVA_USUARIO1_idx` ON `aparta`.`RESERVA` (`USUARIO_ID_USUARIO` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
