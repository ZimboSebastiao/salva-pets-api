import express from "express";
import { ler, inserir, lerUm, atualizar, excluir } from "./src/pets.js";
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const porta = process.env.PORT || 3306;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Servir imagens a partir do diretório 'public/images'
app.use('/images', express.static(path.join(publicDir, 'images')));

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
    const caminhoDaImagem = path.join(publicDir, 'images', imagemNome); // Constrói o caminho completo da imagem

    try {
        // Faz o download da imagem a partir do URL fornecido pelo cliente usando axios
        const response = await axios.get(imagemUrl, { responseType: 'arraybuffer' });

        // Salva a imagem no sistema de arquivos no diretório 'public/images'
        fs.writeFileSync(caminhoDaImagem, Buffer.from(response.data));

        // Atualiza o objeto pet com o caminho relativo da imagem 
        novoPet.imagem = '/images/' + imagemNome;

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

app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
});
