const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const allure = require('@wdio/allure-reporter').default;
const { users, messages } = require('../utils/test-data');
const { waitFor, generateRandomEmail } = require('../utils/helpers');
const gestureHelper = require('../utils/gesture-helper');

/**
 * Suite de testes avançados demonstrando uso de helpers e gestos
 */
describe('Testes Avançados - Exemplos de Uso', () => {
    
    beforeEach(async () => {
        allure.addFeature('Testes Avançados');
    });

    describe('Uso de Test Data', () => {
        it('Deve fazer login usando dados centralizados', async () => {
            allure.addSeverity('critical');
            allure.addStory('Login com test data');

            // Usando dados do test-data.js
            await LoginPage.login(users.valid.username, users.valid.password);
            
            const welcomeMsg = await HomePage.getWelcomeMessage();
            expect(welcomeMsg).toContain(messages.home.welcome);
            
            allure.addStep('Login realizado com dados centralizados');
        });

        it('Deve validar mensagem de erro com credenciais inválidas', async () => {
            allure.addSeverity('high');
            allure.addStory('Validação de mensagens');

            // Usando dados inválidos do test-data.js
            await LoginPage.login(users.invalid.username, users.invalid.password);
            
            const errorMsg = await LoginPage.getErrorMessage();
            expect(errorMsg).toContain(messages.login.invalidCredentials);
            
            allure.addStep('Mensagem de erro validada');
        });
    });

    describe('Uso de Helpers', () => {
        it('Deve gerar email aleatório para cadastro', async () => {
            allure.addSeverity('medium');
            allure.addStory('Geração de dados randômicos');

            // Gerando email aleatório
            const randomEmail = generateRandomEmail();
            console.log('Email gerado:', randomEmail);
            
            expect(randomEmail).toContain('@example.com');
            expect(randomEmail).toMatch(/teste\.\d+@example\.com/);
            
            allure.addStep(`Email gerado: ${randomEmail}`);
        });

        it('Deve usar wait customizado', async () => {
            allure.addSeverity('low');
            allure.addStory('Waits customizados');

            await LoginPage.clickElement(LoginPage.loginButton);
            
            // Aguardando 2 segundos usando helper
            await waitFor(2000);
            
            allure.addStep('Wait customizado executado');
        });
    });

    describe('Gestos Mobile', () => {
        it('Deve realizar swipe horizontal', async () => {
            allure.addSeverity('medium');
            allure.addStory('Gestos - Swipe');

            // Assumindo que há um carrossel na home
            await HomePage.isHomePageDisplayed();
            
            // Swipe para a esquerda
            await gestureHelper.swipeHorizontal('left');
            await waitFor(1000);
            
            // Swipe para a direita
            await gestureHelper.swipeHorizontal('right');
            
            allure.addStep('Swipe horizontal executado');
        });

        it('Deve realizar swipe vertical para rolar página', async () => {
            allure.addSeverity('medium');
            allure.addStory('Gestos - Scroll');

            await HomePage.isHomePageDisplayed();
            
            // Scroll para baixo
            await gestureHelper.swipeVertical('up');
            await waitFor(1000);
            
            // Scroll para cima
            await gestureHelper.swipeVertical('down');
            
            allure.addStep('Scroll vertical executado');
        });

        it('Deve realizar long press em elemento', async () => {
            allure.addSeverity('low');
            allure.addStory('Gestos - Long Press');

            // Exemplo: long press em um item de lista
            // await gestureHelper.longPress(elemento, 2000);
            
            allure.addStep('Long press demonstrado (comentado - ajustar para seu app)');
        });

        it('Deve realizar double tap em elemento', async () => {
            allure.addSeverity('low');
            allure.addStory('Gestos - Double Tap');

            // Exemplo: double tap em uma imagem
            // await gestureHelper.doubleTap(elemento);
            
            allure.addStep('Double tap demonstrado (comentado - ajustar para seu app)');
        });
    });

    describe('Validações Complexas', () => {
        it('Deve validar múltiplos elementos após login', async () => {
            allure.addSeverity('high');
            allure.addStory('Validações múltiplas');

            await LoginPage.login(users.valid.username, users.valid.password);
            
            // Validando múltiplos elementos
            const isHomeDisplayed = await HomePage.isHomePageDisplayed();
            const welcomeMsg = await HomePage.getWelcomeMessage();
            const menuVisible = await HomePage.isElementVisible(HomePage.menuButton);
            
            // Múltiplas assertions
            expect(isHomeDisplayed).toBe(true);
            expect(welcomeMsg).toBeTruthy();
            expect(menuVisible).toBe(true);
            
            allure.addStep('Múltiplas validações realizadas');
        });

        it('Deve executar fluxo completo de login e logout', async () => {
            allure.addSeverity('critical');
            allure.addStory('Fluxo completo');

            // Login
            allure.addStep('Iniciando login');
            await LoginPage.login(users.valid.username, users.valid.password);
            
            // Verificar home
            allure.addStep('Verificando home page');
            const isHomeDisplayed = await HomePage.isHomePageDisplayed();
            expect(isHomeDisplayed).toBe(true);
            
            // Fazer alguma ação
            allure.addStep('Abrindo menu');
            await HomePage.openMenu();
            await waitFor(1000);
            
            // Logout
            allure.addStep('Fazendo logout');
            await HomePage.logout();
            
            // Verificar volta para login
            allure.addStep('Verificando volta para tela de login');
            await waitFor(2000);
            const isLoginDisplayed = await LoginPage.isLoginPageDisplayed();
            expect(isLoginDisplayed).toBe(true);
            
            allure.addStep('Fluxo completo executado com sucesso');
        });
    });

    describe('Tratamento de Erros', () => {
        it('Deve capturar screenshot em caso de falha', async () => {
            allure.addSeverity('medium');
            allure.addStory('Screenshots de falha');

            try {
                // Tentando usar credenciais que causarão erro
                await LoginPage.login(users.blocked.username, users.blocked.password);
                
                // Verificação que pode falhar
                const errorMsg = await LoginPage.getErrorMessage();
                expect(errorMsg).toContain(messages.login.blockedUser);
                
            } catch (error) {
                // Screenshot será capturado automaticamente pelo afterEach
                allure.addStep('Erro capturado - screenshot tirado');
                throw error;
            }
        });
    });

    afterEach(async () => {
        // Screenshot em caso de falha
        const testPassed = this.currentTest?.state === 'passed';
        if (!testPassed) {
            const screenshot = await driver.takeScreenshot();
            allure.addAttachment(
                `Falha - ${this.currentTest?.title}`,
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );
        }
    });
});
