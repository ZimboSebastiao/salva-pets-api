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
    const extensao = path.extname(imagemUrl); // Obtém a extensão da imagem a partir do URL
    const nomeLimpo = novoPet.nome.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); // Nome do pet sem caracteres especiais, convertido para letras minúsculas
    const imagemNome = nomeLimpo + extensao; // Nome da imagem em letras minúsculas com a extensão
    const caminhoDaImagem = path.join(publicDir, 'images', imagemNome); // Constrói o caminho completo da imagem

    try {
        // Faz o download da imagem a partir do URL fornecido pelo cliente usando axios
        const response = await axios.get(imagemUrl, { responseType: 'arraybuffer' }); // Use 'stream' como responseType
        const fileData = Buffer.from(response.data, 'binary');

        if (response.status !== 200) {
            // Se a resposta não for bem-sucedida, retorne um erro
            return res.status(response.status).json({ mensagem: 'Erro ao baixar a imagem' });
        }

        // Crie um stream de escrita para salvar a imagem
        const writer = fs.createFile(caminhoDaImagem);

        // Use eventos para controlar o término da gravação do arquivo
        writer.on('finish', () => {
            // Atualiza o objeto pet com o caminho relativo da imagem 
            novoPet.imagem = '/images/' + imagemNome;

            inserir(novoPet, res);
        });

        writer.on('error', (err) => {
            console.error(err);
            res.status(500).json({ mensagem: 'Erro ao salvar a imagem' });
        });

        // Pipe o stream de leitura (imagem) para o stream de escrita (arquivo)
        response.data.pipe(writer);
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
