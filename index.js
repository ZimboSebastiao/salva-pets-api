import express from "express";
import {ler, inserir, lerUm, atualizar, excluir} from "./src/pets.js";
import cors from 'cors';

const app = express();
const porta = 8080
// const porta = process.env.PORT || 3306;

// Adicionando suporte para o formato Json
app.use(express.json());

// Adicionando suporte a dados vindo de formulário
app.use(express.urlencoded({extended : true}));

// permitindo acesso aos arquivos da API
app.use(cors())

// Criando as rotas
// raiz da aplicação
app.get('/', (req, res) => {
    // res.redirect('https://documenter.getpostman.com/view/29885708/2s9YJZ34YJ');
    res.send(`Página raiz`);
});

// Exibindo dados de um pet
app.get('/pets/:id', (req, res) => {
    // res.send(`Exibindo dados de um Pet`);
    const id = parseInt(req.params.id);
    lerUm(id, res);
});

// Exibindo dados de Todos os pets
app.get('/pets', (req, res) => {
    // res.send(`Exibindo dados de todos os pets`);
    ler(res);
});

// Adicionando um pet
app.post('/pets', (req, res) => {
    // res.send(`Adicionando um pet`);
    const novoPet = req.body;
    inserir(novoPet, res);
});

// Atualizando dados de um pet
app.patch('/pets/:id', (req, res) => {
    // res.send(`Atualizando um pet`); 
    const id = parseInt(req.params.id);
    const aluno = req.body;
    atualizar(id, aluno, res);
});

// Deletando dados de um pet
app.delete('/pets/:id', (req, res) => {
    // res.send(`Excluindo um pet`);
    const id = parseInt(req.params.id);
    excluir(id, res);
});

// Executando o servidor 


app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
})