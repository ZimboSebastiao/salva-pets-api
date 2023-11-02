import express from 'express';
import { ler, inserir, lerUm, atualizar, excluir, gatos, cachorros } from './src/pets.js';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const porta = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configure o roteamento manual para servir imagens diretamente da pasta "public"
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.get('/', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/29899654/2s9YJgSfcx');
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
        novoPet.imagem = 'images/' + imagemNome;

        // Insira o pet no banco de dados após salvar a imagem com sucesso
        inserir(novoPet, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensagem: 'Erro ao salvar a imagem' });
    }
});

app.patch('/pets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pet = req.body;
    atualizar(id, pet, res);
});

app.delete('/pets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    excluir(id, res);
});

app.get('/gatos', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    gatos(res);
});

app.get('/cachorros', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    cachorros(res);
});



app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
});
