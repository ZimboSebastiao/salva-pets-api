import mysql2 from "mysql2";

// Armazenando os dados da conexão em uma constante
// const conexao = mysql2.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'salva-pets-api'
// });


// Banco de dados DB4Free
const conexao = mysql2.createConnection({
    host : '127.0.0.1',
    user : 'id21519293_salvapets',
    password : '@7TgO\FWuln{wF~h',
    database : 'id21519293_petsapi'
})



// Efetivando a conexão
//conexao.connect();
conexao.connect(erro => {
    if(erro){
        console.error(`Erro ao conectar no banco: ${erro.message}`);
    } else {
        console.log(`Banco de dados conectado em: ${conexao.config.host}`);
    }
});

export default conexao;
