/**
 * Classe base para todos os Page Objects
 * Contém métodos comuns que podem ser reutilizados em todas as páginas
 */
class BasePage {
    /**
     * Aguarda um elemento estar visível
     * @param {WebdriverIO.Element} element - Elemento a ser aguardado
     * @param {number} timeout - Tempo máximo de espera em ms
     */
    async waitForElement(element, timeout = 30000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Clica em um elemento após aguardar que ele esteja visível
     * @param {WebdriverIO.Element} element - Elemento a ser clicado
     */
    async clickElement(element) {
        await this.waitForElement(element);
        await element.click();
    }

    /**
     * Define o valor de um campo de texto
     * @param {WebdriverIO.Element} element - Campo de texto
     * @param {string} value - Valor a ser inserido
     */
    async setValue(element, value) {
        await this.waitForElement(element);
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Obtém o texto de um elemento
     * @param {WebdriverIO.Element} element - Elemento
     * @returns {Promise<string>} Texto do elemento
     */
    async getText(element) {
        await this.waitForElement(element);
        return await element.getText();
    }

    /**
     * Verifica se um elemento está visível
     * @param {WebdriverIO.Element} element - Elemento
     * @returns {Promise<boolean>} True se visível
     */
    async isElementVisible(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Rola a tela até um elemento
     * @param {WebdriverIO.Element} element - Elemento destino
     */
    async scrollToElement(element) {
        await element.scrollIntoView();
    }

    /**
     * Aguarda um elemento não estar mais visível
     * @param {WebdriverIO.Element} element - Elemento
     * @param {number} timeout - Tempo máximo de espera
     */
    async waitForElementNotVisible(element, timeout = 30000) {
        await element.waitForDisplayed({ timeout, reverse: true });
    }

    /**
     * Tira uma captura de tela
     * @param {string} filename - Nome do arquivo
     */
    async takeScreenshot(filename) {
        await driver.saveScreenshot(`./screenshots/${filename}.png`);
    }

    /**
     * Esconde o teclado (útil para testes mobile)
     */
    async hideKeyboard() {
        if (driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
    }

    /**
     * Swipe/desliza na tela
     * @param {string} direction - Direção: 'up', 'down', 'left', 'right'
     */
    async swipe(direction) {
        const { width, height } = await driver.getWindowSize();
        const centerX = width / 2;
        const centerY = height / 2;

        let startX, startY, endX, endY;

        switch (direction.toLowerCase()) {
            case 'up':
                startX = centerX;
                startY = height * 0.8;
                endX = centerX;
                endY = height * 0.2;
                break;
            case 'down':
                startX = centerX;
                startY = height * 0.2;
                endX = centerX;
                endY = height * 0.8;
                break;
            case 'left':
                startX = width * 0.8;
                startY = centerY;
                endX = width * 0.2;
                endY = centerY;
                break;
            case 'right':
                startX = width * 0.2;
                startY = centerY;
                endX = width * 0.8;
                endY = centerY;
                break;
            default:
                throw new Error('Direção inválida. Use: up, down, left ou right');
        }

        await driver.touchPerform([
            { action: 'press', options: { x: startX, y: startY } },
            { action: 'wait', options: { ms: 1000 } },
            { action: 'moveTo', options: { x: endX, y: endY } },
            { action: 'release' }
        ]);
    }
}

module.exports = new BasePage();
