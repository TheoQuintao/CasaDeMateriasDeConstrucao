import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function criarEPopulartabelaUsuarios(nome,cpf,email,telefone,senha,id_endereco){
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
    db.run(`CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(15),
    senha VARCHAR(255) NOT NULL,
    endereco_id INT NOT NULL,
    CONSTRAINT fk_usuario_endereco FOREIGN KEY (endereco_id) 
        REFERENCES endereco(id) ON DELETE RESTRICT ON UPDATE CASCADE
)`)
    db.run(`INSERT INTO usuario (nome,cpf,email,telefone,senha,endereco_id) VALUES (?,?,?,?,?,?)`, [nome,cpf,email,telefone,senha,id_endereco] )
}

async function criarEPopulartabelaEndereco(cep,logadouro,numero,complemento,bairro,cidade,estado){
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
    db.run(`CREATE TABLE IF NOT EXISTS endereco (
    id INTEGER PRIMARY KEY,
    cep VARCHAR(9) NOT NULL,
    logadouro VARCHAR(255) NOT NULL,
    numero INT,
    complemento VARCHAR(255),
    bairro VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL
)`)
db.run(`INSERT INTO endereco (cep,logadouro,numero,complemento,bairro,cidade,estado) VALUES (?,?,?,?,?,?,?)`, [cep,logadouro,numero,complemento,bairro,cidade,estado] )
}

async function criarEPopulartabelaCometarios(img,nome,profissao,comentario){
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
    db.run(`CREATE TABLE IF NOT EXISTS comentarios (
    id INT INTEGER PRIMARY KEY,
    img VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    profissao VARCHAR(255) NOT NULL,
    comentario VARCHAR(255) NOT NULL
)`)
    db.run(`INSERT INTO coomentarios (img,nome,profissao,comentario) VALOUES (?,?,?,?)`, [img,nome,profissao,comentario])
}

async function dropTable(table) {
    let db;
    try {
        db = await open({
            filename: './banco.db',
            driver: sqlite3.Database
        });

        await db.run(`DROP TABLE IF EXISTS ${table}`);
        
        console.log(`Tabela ${table} apagada com sucesso!`);
    } catch (error) {
        console.error(`Erro ao apagar tabela ${table}:`, error.message);
    } finally {
        if (db) await db.close();
    }
}

