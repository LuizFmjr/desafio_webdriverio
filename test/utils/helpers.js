/**
 * Helpers e utilitários para os testes
 */

/**
 * Aguarda um tempo específico
 * @param {number} ms - Tempo em milissegundos
 */
async function waitFor(ms) {
    await driver.pause(ms);
}

/**
 * Gera um email aleatório para testes
 * @returns {string} Email gerado
 */
function generateRandomEmail() {
    const timestamp = Date.now();
    return `teste.${timestamp}@example.com`;
}

/**
 * Gera um username aleatório
 * @returns {string} Username gerado
 */
function generateRandomUsername() {
    const timestamp = Date.now();
    return `user_${timestamp}`;
}

/**
 * Formata data para string
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data formatada
 */
function formatDate(date = new Date()) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Aguarda até que uma condição seja verdadeira
 * @param {Function} condition - Função que retorna boolean
 * @param {number} timeout - Tempo máximo de espera em ms
 * @param {number} interval - Intervalo entre verificações em ms
 */
async function waitUntil(condition, timeout = 30000, interval = 500) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        if (await condition()) {
            return true;
        }
        await waitFor(interval);
    }
    
    throw new Error('Timeout: condição não foi satisfeita');
}

/**
 * Retorna dados de teste baseado no ambiente
 * @returns {Object} Dados de teste
 */
function getTestData() {
    const env = process.env.ENV || 'dev';
    
    const testData = {
        dev: {
            validUser: {
                username: 'usuario.teste',
                password: 'senha123'
            },
            invalidUser: {
                username: 'usuario.invalido',
                password: 'senhaerrada'
            }
        },
        staging: {
            validUser: {
                username: 'usuario.staging',
                password: 'senha456'
            },
            invalidUser: {
                username: 'invalid.staging',
                password: 'wrongpass'
            }
        },
        production: {
            validUser: {
                username: 'usuario.prod',
                password: 'senha789'
            },
            invalidUser: {
                username: 'invalid.prod',
                password: 'wrongpwd'
            }
        }
    };
    
    return testData[env] || testData.dev;
}

/**
 * Verifica se está rodando no Android
 * @returns {boolean} True se for Android
 */
function isAndroid() {
    return driver.capabilities.platformName.toLowerCase() === 'android';
}

/**
 * Verifica se está rodando no iOS
 * @returns {boolean} True se for iOS
 */
function isIOS() {
    return driver.capabilities.platformName.toLowerCase() === 'ios';
}

/**
 * Retorna o seletor baseado na plataforma
 * @param {string} androidSelector - Seletor para Android
 * @param {string} iosSelector - Seletor para iOS
 * @returns {string} Seletor apropriado
 */
function getPlatformSelector(androidSelector, iosSelector) {
    return isAndroid() ? androidSelector : iosSelector;
}

module.exports = {
    waitFor,
    generateRandomEmail,
    generateRandomUsername,
    formatDate,
    waitUntil,
    getTestData,
    isAndroid,
    isIOS,
    getPlatformSelector
};
