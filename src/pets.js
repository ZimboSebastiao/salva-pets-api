import conexao from "./banco.js";

// Ler/exibir todos os pets
function ler(res) {
    const sql = "SELECT * FROM pets ORDER BY nome";

    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            if (resultados && resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(204).end();
            }
        }
    });
}

// Inserindo pets no banco de dados
function inserir(pet, res) {
    const sql = "INSERT INTO pets SET ?";
    conexao.query(sql, pet, (erro) => {
        if (erro) {
            // Em caso de erro, envie uma resposta de erro
            res.status(400).json({ mensagem: "Erro ao inserir pet no banco de dados", erro: erro.message });
        } else {
            // Em caso de sucesso, envie uma resposta de sucesso
            res.status(201).json({ mensagem: "Pet Adicionado com sucesso." });
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
            console.error("Erro ao excluir pet:", erro); // Registra um erro no console
            res.status(400).json(erro.code);
        } else {
            console.log(`Pet excluído com sucesso. ID: ${id}`); 
            res.status(200).json({ "Status": "Pet Excluído", id });
        }
    });
}

// Ler/exibir todos os gatos
function gatos(res) {
    const sql = 'SELECT * FROM pets WHERE tipo = "Gato" ORDER BY nome';

    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            if (resultados && resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(204).end();
            }
        }
    });
}

// Ler/exibir todos os cachorros
function cachorros(res) {
    const sql = 'SELECT * FROM pets WHERE tipo = "Cachorro" ORDER BY nome';

    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            if (resultados && resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(204).end();
            }
        }
    });
}

// Função para filtrar por cidade
function cidade(res, cidade) {
    const sql = 'SELECT * FROM pets WHERE cidade = ? ORDER BY nome';

    conexao.query(sql, [cidade], (erro, resultados) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            if (resultados && resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(204).end();
            }
        }
    });
}

// Função para filtrar por regiao
function regiao(res, regiao) {
    const sql = 'SELECT * FROM pets WHERE regiao = ? ORDER BY nome';

    conexao.query(sql, [regiao], (erro, resultados) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            if (resultados && resultados.length > 0) {
                res.status(200).json(resultados);
            } else {
                res.status(204).end();
            }
        }
    });
}

export {ler, inserir, lerUm, atualizar, excluir, gatos, cachorros, cidade, regiao};
