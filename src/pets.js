import conexao from "./banco.js";
const fs = require('fs');




// Ler/exibir todos os pets
function ler(res) {
    const sql = "SELECT * FROM pets ORDER BY nome";

    conexao.query(sql, (erro, resultados) => {
        // Verificação para ver se há conteúdo
        if (resultados.length === 0) {
            res.status(204).end(); //  .end() encerra a execução
            return;
        }

        if (erro) {
            res.status(400).json(erro.code); 
        } else {
            res.status(200).json(resultados);
        }
    });
}

// Inserindo pets no banco de dados
function inserir(pet, res){
    const sql = "INSERT INTO pets SET ?";
    conexao.query(sql, pet, (erro) => {

        if (erro) {
            res.status(400).json(erro.code);

        } else {
            res.status(201).json({"status" : "Pet Adicionado com sucesso."});
        }
    });
    
}









// Ler um pet
function lerUm(id, res) {
    const sql = "SELECT * FROM pets  WHERE id = ?";

    conexao.query(sql, id, (erro, resultados) => {
        if (resultados === 0){
            res.status(204).end();
            return;
        }

        if (erro) {
            res.status(400).json(erro.code); // 400 = BAD Request
        } else {
            res.status(200).json(resultados[0]);
        }
    });
}


// Atualizar todos ou alguns dados de um pet
function atualizar(id, pet, res) {
    const sql = "UPDATE pets SET ? WHERE id = ?";
    conexao.query(sql, [pet, id], (erro, resultados) => {
        if (erro) {
            res.status(400).json(erro.code); // 400 = BAD Request
        } else {
            //res.status(200).json({"Status" : "Atualizado com sucesso!"});
            res.status(200).json({...pet, id});
        }
    })
}

// Excluir pet da base de dados
function excluir(id, res) {
    const sql = "DELETE FROM pets WHERE id = ?";
    conexao.query(sql, id, (erro, resultados) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(200).json({"Status" : "Pet Excluido", id});
        }
    });
}

export {ler, inserir, lerUm, atualizar, excluir};
