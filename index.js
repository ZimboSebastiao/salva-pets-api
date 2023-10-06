import express from "express";
import { ler, inserir, lerUm, atualizar, excluir } from "./src/pets.js";
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';

const app = express();
const porta = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send(`Página raiz`);
});

app.get('/pets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lerUm(id, res);
});

app.get('/pets', (req, res) => {
    ler(res);
});

app.post('/pets', async (req, res) => {
    const novoPet = req.body;
    const imagemUrl = req.body.imagem; // URL da imagem fornecida pelo cliente
    const imagemNome = Date.now() + '_' + novoPet.nome + '.jpg'; // Nome da imagem com extensão
    const caminhoDaImagem = 'public/images/' + imagemNome;

    try {
        // Faz o download da imagem a partir do URL fornecido pelo cliente usando axios
        const response = await axios.get(imagemUrl, { responseType: 'arraybuffer' });

        // Salva a imagem no sistema de arquivos
        fs.writeFileSync(caminhoDaImagem, Buffer.from(response.data));

        // Atualiza o objeto pet com o caminho da imagem
        novoPet.imagem = caminhoDaImagem;

        // Insere o pet no banco de dados
        inserir(novoPet, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensagem: 'Erro ao salvar a imagem' });
    }
});

app.patch('/pets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const aluno = req.body;
    atualizar(id, aluno, res);
});

app.delete('/pets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    excluir(id, res);
});

app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
});
