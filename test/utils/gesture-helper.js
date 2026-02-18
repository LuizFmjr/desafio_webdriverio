/**
 * Gestures e ações específicas para mobile
 */

class GestureHelper {
    /**
     * Realiza um swipe horizontal (esquerda ou direita)
     * @param {string} direction - 'left' ou 'right'
     * @param {number} percentage - Porcentagem da tela (0-1)
     */
    async swipeHorizontal(direction = 'left', percentage = 0.8) {
        const { width, height } = await driver.getWindowSize();
        const anchor = height / 2;
        const startPoint = direction === 'left' 
            ? width * percentage 
            : width * (1 - percentage);
        const endPoint = direction === 'left'
            ? width * (1 - percentage)
            : width * percentage;

        await driver.touchPerform([
            { action: 'press', options: { x: startPoint, y: anchor } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: endPoint, y: anchor } },
            { action: 'release' }
        ]);
    }

    /**
     * Realiza um swipe vertical (cima ou baixo)
     * @param {string} direction - 'up' ou 'down'
     * @param {number} percentage - Porcentagem da tela (0-1)
     */
    async swipeVertical(direction = 'up', percentage = 0.8) {
        const { width, height } = await driver.getWindowSize();
        const anchor = width / 2;
        const startPoint = direction === 'up'
            ? height * percentage
            : height * (1 - percentage);
        const endPoint = direction === 'up'
            ? height * (1 - percentage)
            : height * percentage;

        await driver.touchPerform([
            { action: 'press', options: { x: anchor, y: startPoint } },
            { action: 'wait', options: { ms: 500 } },
            { action: 'moveTo', options: { x: anchor, y: endPoint } },
            { action: 'release' }
        ]);
    }

    /**
     * Rola até um elemento estar visível (Android)
     * @param {string} text - Texto do elemento
     */
    async scrollToElementAndroid(text) {
        await $(
            `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("${text}"))`
        );
    }

    /**
     * Rola até um elemento estar visível (iOS)
     * @param {WebdriverIO.Element} element - Elemento para rolar até
     */
    async scrollToElementIOS(element) {
        await driver.execute('mobile: scroll', { element, direction: 'down' });
    }

    /**
     * Toque longo em um elemento
     * @param {WebdriverIO.Element} element - Elemento
     * @param {number} duration - Duração em ms
     */
    async longPress(element, duration = 1000) {
        await driver.touchAction([
            { action: 'press', element },
            { action: 'wait', ms: duration },
            { action: 'release' }
        ]);
    }

    /**
     * Toque duplo em um elemento
     * @param {WebdriverIO.Element} element - Elemento
     */
    async doubleTap(element) {
        const { x, y } = await element.getLocation();
        const { width, height } = await element.getSize();
        const centerX = x + (width / 2);
        const centerY = y + (height / 2);

        await driver.touchAction([
            { action: 'tap', x: centerX, y: centerY },
            { action: 'wait', ms: 100 },
            { action: 'tap', x: centerX, y: centerY }
        ]);
    }

    /**
     * Zoom in (pinch out)
     */
    async zoomIn() {
        const { width, height } = await driver.getWindowSize();
        const centerX = width / 2;
        const centerY = height / 2;
        
        await driver.multiTouchAction([
            {
                action: 'press', options: { x: centerX, y: centerY - 100 }
            },
            {
                action: 'moveTo', options: { x: centerX, y: centerY - 200 }
            },
            {
                action: 'release'
            }
        ], [
            {
                action: 'press', options: { x: centerX, y: centerY + 100 }
            },
            {
                action: 'moveTo', options: { x: centerX, y: centerY + 200 }
            },
            {
                action: 'release'
            }
        ]);
    }

    /**
     * Zoom out (pinch in)
     */
    async zoomOut() {
        const { width, height } = await driver.getWindowSize();
        const centerX = width / 2;
        const centerY = height / 2;
        
        await driver.multiTouchAction([
            {
                action: 'press', options: { x: centerX, y: centerY - 200 }
            },
            {
                action: 'moveTo', options: { x: centerX, y: centerY - 100 }
            },
            {
                action: 'release'
            }
        ], [
            {
                action: 'press', options: { x: centerX, y: centerY + 200 }
            },
            {
                action: 'moveTo', options: { x: centerX, y: centerY + 100 }
            },
            {
                action: 'release'
            }
        ]);
    }

    /**
     * Arrasta um elemento para outro
     * @param {WebdriverIO.Element} fromElement - Elemento origem
     * @param {WebdriverIO.Element} toElement - Elemento destino
     */
    async dragAndDrop(fromElement, toElement) {
        const from = await fromElement.getLocation();
        const to = await toElement.getLocation();
        
        await driver.touchAction([
            { action: 'press', x: from.x, y: from.y },
            { action: 'wait', ms: 500 },
            { action: 'moveTo', x: to.x, y: to.y },
            { action: 'release' }
        ]);
    }
}

module.exports = new GestureHelper();
