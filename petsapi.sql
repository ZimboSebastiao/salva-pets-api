-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 31/10/2023 às 14:28
-- Versão do servidor: 8.2.0
-- Versão do PHP: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `petsapi`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int NOT NULL,
  `nome` varchar(50) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `imagem` varchar(500) NOT NULL,
  `idade` date NOT NULL,
  `raca` varchar(50) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  `sexo` varchar(15) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `sobre` text NOT NULL,
  `id_usuario` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pets`
--

CREATE TABLE `pets` (
  `id` int NOT NULL,
  `nome` varchar(50) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `imagem` varchar(200) DEFAULT NULL,
  `idade` date NOT NULL,
  `raca` varchar(50) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  `sexo` varchar(15) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `sobre` text NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `data_salvapets` datetime DEFAULT CURRENT_TIMESTAMP,
  `cidade` varchar(255) DEFAULT NULL,
  `regiao` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `pets`
--

INSERT INTO `pets` (`id`, `nome`, `tipo`, `imagem`, `idade`, `raca`, `localizacao`, `sexo`, `descricao`, `sobre`, `id_usuario`, `data_salvapets`, `cidade`, `regiao`) VALUES
(117, 'Oliver', 'Gato', 'images/1698179513379_Oliver.jpg', '2020-07-12', 'Siamês', 'Rio de Janeiro, Bairro: Botafogo', 'Macho', 'Um gato Siamês elegante e sociável.', 'Oliver é um gato Siamês com um toque de elegância. Ele adora passear pelo movimentado bairro de Botafogo, no Rio de Janeiro, e é conhecido por sua natureza sociável. Oliver nasceu em 12 de julho de 2020.', NULL, '2023-10-24 20:32:54', NULL, NULL),
(118, 'Milo', 'Gato', 'images/1698179586046_Milo.jpg', '2019-08-17', 'Siamês', 'Rio de Janeiro, Bairro: Laranjeiras', 'Macho', 'Um gato Siamês elegante e aventureiro.', 'Milo é um gato Siamês com uma alma aventureira. Ele adora explorar as ruas e parques de Laranjeiras, no Rio de Janeiro, e está sempre em busca de novas aventuras. Milo nasceu em 17 de agosto de 2019.', NULL, '2023-10-24 20:34:05', NULL, NULL),
(119, 'Rusty', 'Cachorro', 'images/1698181977679_Rusty.jpg', '2018-09-30', 'Golden Retriever', 'Porto Alegre, Bairro: Moinhos de Vento', 'Macho', 'Um Golden Retriever amigável e aventureiro.', 'Rusty é um Golden Retriever com uma paixão por aventuras. Ele adora explorar o Parque Moinhos de Vento, em Porto Alegre, e nadar no lago. Rusty nasceu em 30 de setembro de 2018.', NULL, '2023-10-24 21:13:57', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `nome` varchar(80) DEFAULT NULL,
  `cep` varchar(16) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `cep`, `senha`, `email`) VALUES
(1, 'Glória Sebastião', '08420-720', '$2y$10$vOMFdWY2FUWu5h4E.OPd5uNIJmRHGTvu0sjr2DL4GinwI6wbYggzC', 'gloriasebastiao7@gmail.com'),
(2, 'Zimbo Sebastião', '01512040', '$2y$10$uakUqqpGnMCNcU1IITxK5O0K7ZsO5/mnQT6tvSEhvLvtGM2XOwu.y', 'gloriasenac7@gmail.com'),
(3, 'pedro', '12345678', '$2y$10$gXB8vNOCe/UlwCERnITxfeWNCCtwpzD1Ie2.JkMwXG37F3F/Z46yK', 'ozzy.@gmail.com'),
(4, 'kaue', '08123456', '$2y$10$DNfvJV/ZL5gWQj03Yk7PLeEpUvmlRhJdmdg1zjFQzQD0NPxsS7Cf.', 'kauesilva38@gmail.com'),
(5, 'Nicolas', '01512-050', '$2y$10$lT04T4tDzUjeHXv4vublb.1Nya9SZmLkl3MTv8G1hSomRbWyQ8kXq', 'ozzy.@gmail.com'),
(6, 'Fofoqueiro', '01512-040', '$2y$10$U/GBjL/uffuxCL9yTuQ6jusqIHLTYQwHI/.0cTlxgUnhLLU/ugS3q', 'fofoqueiro@gmail.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Restrições para tabelas `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
