// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';

// export async function criarEPopulartabelaUsuarios(nome,cpf,email,telefone,senha,id_endereco){
//     const db = await open({
//         filename: './banco.db',
//         driver: sqlite3.Database,
//     });
//     db.run(`CREATE TABLE IF NOT EXISTS usuario (
//     id INTEGER PRIMARY KEY,
//     nome VARCHAR(255) NOT NULL,
//     cpf VARCHAR(11) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     telefone VARCHAR(15),
//     senha VARCHAR(255) NOT NULL,
//     endereco_id INT NOT NULL,
//     CONSTRAINT fk_usuario_endereco FOREIGN KEY (endereco_id) 
//         REFERENCES endereco(id) ON DELETE RESTRICT ON UPDATE CASCADE
// )`)
//     db.run(`INSERT INTO usuario (nome,cpf,email,telefone,senha,endereco_id) VALUES (?,?,?,?,?,?)`, [nome,cpf,email,telefone,senha,id_endereco] )
//     await db.close();
//     return result.lastID;
// }

// export async function criarEPopulartabelaEndereco(cep,logadouro,numero,complemento,bairro,cidade,estado){
//     const db = await open({
//         filename: './banco.db',
//         driver: sqlite3.Database,
//     });
//     db.run(`CREATE TABLE IF NOT EXISTS endereco (
//     id INTEGER PRIMARY KEY,
//     cep VARCHAR(9) NOT NULL,
//     logadouro VARCHAR(255) NOT NULL,
//     numero INT,
//     complemento VARCHAR(255),
//     bairro VARCHAR(255) NOT NULL,
//     cidade VARCHAR(255) NOT NULL,
//     estado VARCHAR(255) NOT NULL
// )`)
//     db.run(`INSERT INTO endereco (cep,logadouro,numero,complemento,bairro,cidade,estado) VALUES (?,?,?,?,?,?,?)`, [cep,logadouro,numero,complemento,bairro,cidade,estado] )
//     await db.close();
//     return result.lastID;
// }

// export async function criarEPopulartabelaCometarios(img,nome,profissao,comentario){
//     const db = await open({
//         filename: './banco.db',
//         driver: sqlite3.Database,
//     });
//     db.run(`CREATE TABLE IF NOT EXISTS comentarios (
//     id INT INTEGER PRIMARY KEY,
//     img VARCHAR(255) NOT NULL,
//     nome VARCHAR(255) NOT NULL,
//     profissao VARCHAR(255) NOT NULL,
//     comentario VARCHAR(255) NOT NULL
// )`)
//     db.run(`INSERT INTO comentarios (img,nome,profissao,comentario) VALOUES (?,?,?,?)`, [img,nome,profissao,comentario])
//     await db.close();
//     return result.lastID;    
// }

// export async function criarEPopulartabelaCategoriaProduto(nome){
//     const db = await open({
//         filename: './banco.db',
//         driver: sqlite3.Database,
//     });
//     db.run(`CREATE TABLE IF NOT EXISTS categoria_produtos (
//     id INTEGER PRIMARY KEY,
//     nome VARCHAR(255) NOT NULL
// )`)
//     db.run(`INSERT INTO categoria_produtos (nome) VALUES (?)`, [nome])
//     await db.close();
//     return result.lastID; 
// }

// export async function criarEPopulartabelaMarcaProduto(nome){
//     const db = await open({
//         filename: './banco.db',
//         driver: sqlite3.Database,
//     });
//     db.run(`CREATE TABLE IF NOT EXISTS marca_produtos(
//     id INTEGER PRIMARY KEY,
//     nome VARCHAR(255) NOT NULL)`)
//     db.run(`INSERT INTO marca_produtos (nome) VALUES (?)`, [nome])
//     await db.close();
//     return result.lastID;
// }

// export async function criarEPopulartabelaProdutos(img,titulo,descricao,valor,desconto,categoria_id,marca_id){
//     const db = await open({
//         filename: './banco.db',
//         driver: sqlite3.Database,
//     });
//     db.run(`CREATE TABLE IF NOT EXISTS produtos (
//     id INTEGER PRIMARY KEY,
//     img VARCHAR(255) NOT NULL,
//     titulo VARCHAR(255) NOT NULL,
//     descricao VARCHAR(255) NOT NULL,
//     valor DOUBLE NOT NULL,
//     desconto DOUBLE,
//     categoria_id INT NOT NULL,
//     marca_id INT NOT NULL,
//         CONSTRAINT fk_produtos_categoria_produtos
//         FOREIGN KEY (categoria_id)
//         REFERENCES categoria_produtos(id)
//         ON DELETE RESTRICT
//         ON UPDATE CASCADE,
//     CONSTRAINT fk_produtos_marca_produtos
//         FOREIGN KEY (marca_id)
//         REFERENCES marca_produtos(id)
//         ON DELETE RESTRICT
//         ON UPDATE CASCADE
// )`)
//     db.run(`INSERT INTO produtos (img,titulo,descricao,valor,desconto,categoria_id,marca_id) VALUES (?,?,?,?,?,?,?)`, [img,titulo,descricao,valor,desconto,categoria_id,marca_id] )
//     await db.close();
//     return result.lastID;
// }


// export async function dropTable(table) {
//     let db;
//     try {
//         db = await open({
//             filename: './banco.db',
//             driver: sqlite3.Database
//         });

//         await db.run(`DROP TABLE IF EXISTS ${table}`);
        
//         console.log(`Tabela ${table} apagada com sucesso!`);
//     } catch (error) {
//         console.error(`Erro ao apagar tabela ${table}:`, error.message);
//     } finally {
//         if (db) await db.close();
//     }
// }

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Função para abrir o banco de dados
async function openDatabase() {
    return open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
}

// Função para criar e popular a tabela de usuários
export async function criarEPopulartabelaUsuarios(nome, cpf, email, telefone, senha, id_endereco) {
    const db = await openDatabase();
    await db.run(`CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefone VARCHAR(15),
        senha VARCHAR(255) NOT NULL,
        endereco_id INT NOT NULL,
        CONSTRAINT fk_usuario_endereco FOREIGN KEY (endereco_id) 
            REFERENCES endereco(id) ON DELETE RESTRICT ON UPDATE CASCADE
    )`);
    const result = await db.run(
        `INSERT INTO usuario (nome, cpf, email, telefone, senha, endereco_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [nome, cpf, email, telefone, senha, id_endereco]
    );
    await db.close();
    return result.lastID;
}

// Função para criar e popular a tabela de endereços
export async function criarEPopulartabelaEndereco(cep, logradouro, numero, complemento, bairro, cidade, estado) {
    const db = await openDatabase();
    await db.run(`CREATE TABLE IF NOT EXISTS endereco (
        id INTEGER PRIMARY KEY,
        cep VARCHAR(9) NOT NULL,
        logradouro VARCHAR(255) NOT NULL,
        numero INT,
        complemento VARCHAR(255),
        bairro VARCHAR(255) NOT NULL,
        cidade VARCHAR(255) NOT NULL,
        estado VARCHAR(255) NOT NULL
    )`);
    const result = await db.run(
        `INSERT INTO endereco (cep, logradouro, numero, complemento, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [cep, logradouro, numero, complemento, bairro, cidade, estado]
    );
    await db.close();
    return result.lastID;
}

// Função para apagar uma tabela
export async function dropTable(table) {
    const db = await openDatabase();
    try {
        await db.run(`DROP TABLE IF EXISTS ${table}`);
        console.log(`Tabela ${table} apagada com sucesso!`);
    } catch (error) {
        console.error(`Erro ao apagar tabela ${table}:`, error.message);
    } finally {
        await db.close();
    }
}

