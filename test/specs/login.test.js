const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const allure = require('@wdio/allure-reporter').default;

describe('Testes de Login', () => {
    
    beforeEach(async () => {
        // Setup antes de cada teste
        allure.addFeature('Autenticação');
    });

    it('Deve realizar login com credenciais válidas', async () => {
        allure.addSeverity('critical');
        allure.addStory('Login com sucesso');
        allure.addDescription('Verifica se o usuário consegue fazer login com credenciais válidas');

        // Arrange
        const username = 'usuario.teste';
        const password = 'senha123';
        
        // Act
        await LoginPage.login(username, password);
        
        // Assert
        const isHomeDisplayed = await HomePage.isHomePageDisplayed();
        expect(isHomeDisplayed).toBe(true);
        
        const welcomeMsg = await HomePage.getWelcomeMessage();
        expect(welcomeMsg).toContain('Bem-vindo');
        
        allure.addStep('Login realizado com sucesso');
    });

    it('Deve exibir mensagem de erro com credenciais inválidas', async () => {
        allure.addSeverity('high');
        allure.addStory('Login com credenciais inválidas');
        allure.addDescription('Verifica se o sistema exibe mensagem de erro ao usar credenciais inválidas');

        // Arrange
        const username = 'usuario.invalido';
        const password = 'senhaerrada';
        
        // Act
        await LoginPage.login(username, password);
        
        // Assert
        const isErrorDisplayed = await LoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);
        
        const errorMsg = await LoginPage.getErrorMessage();
        expect(errorMsg).toContain('Credenciais inválidas');
        
        allure.addStep('Mensagem de erro exibida corretamente');
    });

    it('Deve exibir mensagem de erro ao deixar campos vazios', async () => {
        allure.addSeverity('medium');
        allure.addStory('Validação de campos obrigatórios');
        allure.addDescription('Verifica validação quando campos obrigatórios estão vazios');

        // Act
        await LoginPage.login('', '');
        
        // Assert
        const isErrorDisplayed = await LoginPage.isErrorMessageDisplayed();
        expect(isErrorDisplayed).toBe(true);
        
        const errorMsg = await LoginPage.getErrorMessage();
        expect(errorMsg).toMatch(/campo.*obrigatório|preencha.*campos/i);
        
        allure.addStep('Validação de campos vazios funcionando');
    });

    it('Deve navegar para tela de cadastro', async () => {
        allure.addSeverity('low');
        allure.addStory('Navegação para cadastro');
        allure.addDescription('Verifica navegação para a tela de cadastro');

        // Act
        await LoginPage.clickSignup();
        
        // Assert - Ajustar conforme sua aplicação
        // Exemplo: verificar se chegou na tela de cadastro
        await driver.pause(2000);
        
        allure.addStep('Navegação para cadastro realizada');
    });

    it('Deve navegar para recuperação de senha', async () => {
        allure.addSeverity('medium');
        allure.addStory('Recuperação de senha');
        allure.addDescription('Verifica navegação para recuperação de senha');

        // Act
        await LoginPage.clickForgotPassword();
        
        // Assert - Ajustar conforme sua aplicação
        await driver.pause(2000);
        
        allure.addStep('Navegação para recuperação de senha realizada');
    });

    afterEach(async () => {
        // Screenshot em caso de falha
        const testPassed = this.currentTest?.state === 'passed';
        if (!testPassed) {
            await driver.takeScreenshot();
            allure.addAttachment('Screenshot da falha', 
                await driver.takeScreenshot(), 
                'image/png'
            );
        }
    });
});
