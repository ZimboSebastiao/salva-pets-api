-- Script para criação da tabela cachorros

CREATE TABLE `salva-pets-api`.`cachorros` (`id` INT(20) NOT NULL AUTO_INCREMENT , `nome` VARCHAR(50) NOT NULL , `foto` BLOB NOT NULL , `idade` DATE NOT NULL , `raca` VARCHAR(50) NOT NULL , `sexo` VARCHAR(15) NOT NULL , `descricao` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


-- Script para criação da tabela gatos
CREATE TABLE `salva-pets-api`.`gatos` (`id` INT(20) NOT NULL AUTO_INCREMENT , `nome` VARCHAR(50) NOT NULL , `foto` BLOB NOT NULL , `idade` DATE NOT NULL , `sexo` VARCHAR(15) NOT NULL , `raca` VARCHAR(50) NOT NULL , `descricao` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB; 