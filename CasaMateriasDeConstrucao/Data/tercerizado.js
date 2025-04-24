import express from 'express';
import { criarEPopulartabelaUsuarios, criarEPopulartabelaEndereco } from './banco.js';

const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());

// Rota para criar um usuário
app.post('/api/usuarios', async (req, res) => {
    const { nome, cpf, email, telefone, senha, id_endereco } = req.body;

    try {
        const userId = await criarEPopulartabelaUsuarios(nome, cpf, email, telefone, senha, id_endereco);
        res.status(201).json({ message: 'Usuário criado com sucesso!', userId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
});

// Rota para criar um endereço
app.post('/api/enderecos', async (req, res) => {
    const { cep, logradouro, numero, complemento, bairro, cidade, estado } = req.body;

    try {
        const enderecoId = await criarEPopulartabelaEndereco(cep, logradouro, numero, complemento, bairro, cidade, estado);
        res.status(201).json({ message: 'Endereço criado com sucesso!', enderecoId });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar endereço', details: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});