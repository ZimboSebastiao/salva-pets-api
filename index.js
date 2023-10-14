import express from "express";
import { ler, inserir, lerUm, atualizar, excluir } from "./src/pets.js";
import cors from 'cors';
import axios from 'axios';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import { createWriteStream } from 'fs';

// Importe o pacote node-fetch
import fetch from 'node-fetch';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const porta = process.env.PORT || 3306;

app.use(express.json());
app.use(cors());

const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');

// Verifica se o diretório de imagens existe, se não, cria-o
const createImagesDir = async () => {
    try {
        await fs.access(imagesDir);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // Diretório não existe, crie-o
            await fs.mkdir(imagesDir, { recursive: true });
        }
    }
};

app.use('/images', express.static(imagesDir));

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
    const caminhoDaImagem = path.join(imagesDir, imagemNome);

    try {
        // Cria o diretório de imagens se não existir
        await createImagesDir();

        // Faz o download da imagem a partir do URL fornecido pelo cliente usando node-fetch
        const response = await fetch(imagemUrl);

        if (response.ok) {
            // Crie um stream de escrita para salvar a imagem
            const writer = createWriteStream(caminhoDaImagem);

            writer.on('finish', () => {
                // Atualiza o objeto pet com o caminho relativo da imagem 
                novoPet.imagem = '/images/' + imagemNome;

                inserir(novoPet, res);

                console.log(`Imagem salva com sucesso: ${imagemNome}`);
                contarImagens();
            });

            writer.on('error', (err) => {
                console.error(err);
                res.status(500).json({ mensagem: 'Erro ao salvar a imagem', erro: err.message });
            });

            // Pipe o stream de leitura (imagem) para o stream de escrita (arquivo)
            response.body.pipe(writer);
        } else {
            res.status(response.status).json({ mensagem: 'Erro ao baixar a imagem' });
        }
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

const contarImagens = async () => {
    try {
        // Diretório das imagens
        const files = await fs.readdir(imagesDir);

        const imagens = files.filter(file => /\.(jpg|png|jpeg|gif)$/i.test(file));

        console.log(`Número de imagens no diretório: ${imagens.length}`);
    } catch (err) {
        console.error('Erro ao ler o diretório de imagens:', err);
    }
};

app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
});
