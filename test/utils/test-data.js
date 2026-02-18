/**
 * Arquivo de dados de teste
 * Organize seus dados de teste aqui para facilitar a manutenção
 */

/**
 * Dados de usuários para testes
 */
const users = {
    valid: {
        username: 'usuario.valido',
        password: 'Senha@123',
        email: 'usuario.valido@example.com'
    },
    invalid: {
        username: 'usuario.invalido',
        password: 'senhaerrada',
        email: 'invalido@example.com'
    },
    admin: {
        username: 'admin',
        password: 'Admin@123',
        email: 'admin@example.com'
    },
    blocked: {
        username: 'usuario.bloqueado',
        password: 'Senha@123',
        email: 'bloqueado@example.com'
    }
};

/**
 * Mensagens esperadas
 */
const messages = {
    login: {
        success: 'Login realizado com sucesso',
        invalidCredentials: 'Credenciais inválidas',
        emptyFields: 'Preencha todos os campos',
        blockedUser: 'Usuário bloqueado'
    },
    validation: {
        requiredField: 'Este campo é obrigatório',
        invalidEmail: 'Email inválido',
        shortPassword: 'Senha deve ter no mínimo 6 caracteres'
    },
    home: {
        welcome: 'Bem-vindo'
    }
};

/**
 * Configurações baseadas no ambiente
 */
const environments = {
    dev: {
        baseUrl: 'https://dev.example.com',
        apiUrl: 'https://api-dev.example.com'
    },
    staging: {
        baseUrl: 'https://staging.example.com',
        apiUrl: 'https://api-staging.example.com'
    },
    production: {
        baseUrl: 'https://example.com',
        apiUrl: 'https://api.example.com'
    }
};

/**
 * Dados de teste de exemplo
 */
const testData = {
    products: [
        {
            name: 'Produto 1',
            price: 99.99,
            category: 'Eletrônicos'
        },
        {
            name: 'Produto 2',
            price: 149.99,
            category: 'Livros'
        }
    ],
    searchTerms: [
        'smartphone',
        'laptop',
        'livro',
        'headphone'
    ]
};

/**
 * Timeouts padrão
 */
const timeouts = {
    short: 5000,
    medium: 10000,
    long: 30000,
    veryLong: 60000
};

module.exports = {
    users,
    messages,
    environments,
    testData,
    timeouts
};
