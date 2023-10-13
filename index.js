import express from "express";
import { ler, inserir, lerUm, atualizar, excluir } from "./src/pets.js";
import cors from 'cors';
import axios from 'axios';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import { createWriteStream } from 'fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const porta = process.env.PORT || 3306;

app.use(express.json());
app.use(cors());

const publicDir = path.join(__dirname, 'public'); 
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
    const imagemUrl = req.body.imagem;
    const imagemNome = Date.now() + '_' + novoPet.nome + '.jpg';
    const caminhoDaImagem = path.join(publicDir, 'images', imagemNome);

    try {
        // Verifica se o diretório de imagens existe, se não, cria-o
        if (!fs.existsSync(path.join(publicDir, 'images'))) {
            fs.mkdirSync(path.join(publicDir, 'images'));
        }

        // Continua com o código para baixar e salvar a imagem
        const response = await axios.get(imagemUrl, { responseType: 'stream' });
        const writer = createWriteStream(caminhoDaImagem);

        writer.on('finish', () => {
            novoPet.imagem = '/images/' + imagemNome;
            inserir(novoPet, res);

            console.log(`Imagem salva com sucesso: ${imagemNome}`);
            contarImagens();
        });

        // ...
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
      const imagensDir = path.join(__dirname, 'public', 'images');
  
      // Lê o diretório
      const files = await fs.readdir(imagensDir);
  
      // Filtra os arquivos de imagem com extensão .jpg ou .png (ou outras extensões que desejar)
      const imagens = files.filter(file => /\.(jpg|png|jpeg|gif)$/i.test(file));
      
      console.log(`Número de imagens no diretório: ${imagens.length}`);
    } catch (err) {
      console.error('Erro ao ler o diretório de imagens:', err);
    }
  };
  





app.listen(porta, () => {
    console.log(`Servidor NodeJS rodando na porta ${porta}`);
});
