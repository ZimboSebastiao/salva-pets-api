-- Script para criação da tabela de pets

CREATE TABLE `salva-pets-api`.`pets` (`id` INT(20) NOT NULL AUTO_INCREMENT , `nome` VARCHAR(50) NOT NULL , `tipo` VARCHAR(20) NOT NULL , `imagem` VARCHAR(500) NOT NULL , `idade` DATE NOT NULL , `raca` VARCHAR(50) NOT NULL , `localizacao` VARCHAR(100) NOT NULL , `sexo` VARCHAR(15) NOT NULL , `descricao` VARCHAR(200) NOT NULL , `sobre` TEXT NOT NULL,  PRIMARY KEY (`id`)) ENGINE = InnoDB;

