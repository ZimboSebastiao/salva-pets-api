import express from "express";
import {ler, inserir, lerUm, atualizar, excluir} from "./src/aluno.js";
import cors from 'cors';

const app = express();
const porta = process.env.PORT || 3306;

// Adicionando suporte para o formato Json
app.use(express.json());

// Adicionando suporte a dados vindo de formulário
app.use(express.urlencoded({extended : true}));

// permitindo acesso aos arquivos da API
app.use(cors())

// Criando as rotas
// raiz da aplicação
app.get('/', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/29885708/2s9YJZ34YJ');
});

// Exibindo dados de um aluno
app.get('/alunos/:id', (req, res) => {
    //res.send(`Exibindo dados de um aluno`);
    const id = parseInt(req.params.id);
    lerUm(id, res);
});

// Exibindo dados de Todos os alunos
app.get('/alunos', (req, res) => {
    //res.send(`Exibindo dados de todos os alunos`);
    ler(res);
});

// Adicionando um aluno
app.post('/alunos', (req, res) => {
    //res.send(`Adicionando um aluno`);
    const novoAluno = req.body;
    inserir(novoAluno, res);
});

// Atualizando dados de um aluo
app.patch('/alunos/:id', (req, res) => {
    //res.send(`Atualizando um aluno`);
    const id = parseInt(req.params.id);
    const aluno = req.body;
    atualizar(id, aluno, res);
});

// Atualizando dados de um aluo
app.delete('/alunos/:id', (req, res) => {
    //res.send(`Excluindo um aluno`);
    const id = parseInt(req.params.id);
    excluir(id, res);
});

// Executando o servidor 


app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
})