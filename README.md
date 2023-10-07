# Visão geral da API Salva Pets

Esta API foi desenvolvida para fins educacionais e é parte do projeto Salva Pets. Seu objetivo principal é facilitar o aprendizado e otimizar o desenvolvimento do site, permitindo o registro de novos animais de estimação e simplificando as chamadas à API no código.

## Autenticação

A API Salva Pets não requer autenticação, permitindo que qualquer pessoa acesse e utilize os endpoints livremente. Em um ambiente de produção, considere a implementação de autenticação para proteger as operações.

## Banco de Dados

A API utiliza um banco de dados MySQL hospedado no serviço DB4Free.net. As credenciais de banco de dados são configuradas no arquivo `banco.js`. Verifique se as credenciais estão corretas e atualizadas.

## Imagens de Animais de Estimação

Quando um novo animal é adicionado, a API faz o download da imagem fornecida e a armazena no sistema de arquivos em 'public/images'. O nome da imagem é gerado com base no timestamp e no nome do animal. O caminho relativo da imagem é armazenado no banco de dados e pode ser acessado em `/images/{nome_da_imagem}`.

## Status de Resposta

A API retorna os seguintes códigos de status HTTP:

- `200 OK`: Solicitação bem-sucedida.
- `201 Created`: Novo recurso (animal de estimação) criado com sucesso.
- `204 No Content`: Sem conteúdo para retornar (geralmente quando não há resultados).
- `400 Bad Request`: Erro na solicitação do cliente.
- `500 Internal Server Error`: Erro interno do servidor.

## Uso Responsável

Utilize a API de forma responsável e respeite os termos de uso do serviço de hospedagem. Evite solicitações excessivas ou maliciosas, pois isso pode resultar em restrições ou suspensão do serviço.

## Documentação Completa

Esta documentação oferece uma visão geral da API Salva Pets. Para mais detalhes sobre os endpoints e exemplos de uso, consulte a [Documentação Oficial](https://salvapets.onrender.com).

## Endpoints

### Get Root

- **URL:** `https://salvapets.onrender.com`
- **Método:** GET
- **Descrição:** Retorna a página inicial do site Salva Pets.

### Get By Id

- **URL:** `https://salvapets.onrender.com/pets/{id}`
- **Método:** GET
- **Descrição:** Retorna informações sobre um animal de estimação com base no ID.

### Get All Pets

- **URL:** `https://salvapets.onrender.com/pets/`
- **Método:** GET
- **Descrição:** Retorna uma lista de todos os animais de estimação registrados na API.

### Add Pets

- **URL:** `https://salvapets.onrender.com/pets/`
- **Método:** POST
- **Descrição:** Permite adicionar um novo animal de estimação ao banco de dados da API.

### Update Pets

- **URL:** `https://salvapets.onrender.com/pets/{id}`
- **Método:** PATCH
- **Descrição:** Permite atualizar informações de um animal de estimação com base no ID.

### Delete Pets

- **URL:** `https://salvapets.onrender.com/pets/{id}`
- **Método:** DELETE
- **Descrição:** Permite excluir um animal de estimação com base no ID.

Certifique-se de ajustar os IDs, URLs e informações do corpo da solicitação de acordo com suas necessidades ao interagir com a API.
