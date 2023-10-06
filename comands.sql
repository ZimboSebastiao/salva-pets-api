-- Script para criação da tabela cachorros

CREATE TABLE `salva-pets-api`.`pets` (`id` INT(20) NOT NULL AUTO_INCREMENT , `nome` VARCHAR(50) NOT NULL , `imagem` VARCHAR(500) NOT NULL , `idade` DATE NOT NULL , `raca` VARCHAR(50) NOT NULL , `sexo` VARCHAR(15) NOT NULL , `descricao` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

