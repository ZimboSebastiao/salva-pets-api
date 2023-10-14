import express from "express";
import { ler, inserir, lerUm, atualizar, excluir } from "./src/pets.js";
import cors from 'cors';
import axios from 'axios';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import fetch from 'node-fetch'; // Importando node-fetch
import FormData from 'form-data';

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
            const writer = fs.createWriteStream(caminhoDaImagem);

            writer.on('finish', async () => {
                // Atualiza o objeto pet com o caminho relativo da imagem
                novoPet.imagem = '/images/' + imagemNome;

                // Salvar a imagem no GitHub (adapte para suas necessidades)
                await uploadImageToGitHub(imagemNome, caminhoDaImagem);

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

// Função para fazer upload de imagem para o GitHub (exemplo)
async function uploadImageToGitHub(imagemNome, caminhoDaImagem) {
    const token = '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';
    const owner = 'ZimboSebastiao';
    const repo = 'https://github.com/ZimboSebastiao/salva-pets-api';
    const uploadUrl = `https://api.github.com/repos/${owner}/${repo}/releases/assets`;

    const form = new FormData();
    form.append('file', fs.createReadStream(caminhoDaImagem));

    try {
        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                Authorization: `token ${token}`,
            },
            body: form,
        });

        if (!response.ok) {
            console.error('Erro ao fazer upload da imagem para o GitHub');
        }
    } catch (error) {
        console.error('Erro ao fazer upload da imagem para o GitHub:', error);
    }
}

app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
});
