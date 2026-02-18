const HomePage = require('../pageobjects/home.page');
const allure = require('@wdio/allure-reporter').default;

describe('Testes da Home Page', () => {
    
    beforeEach(async () => {
        // Assumindo que o usuário já está logado
        // Em um cenário real, você pode criar um helper para fazer login antes
        allure.addFeature('Home/Dashboard');
    });

    it('Deve exibir a mensagem de boas-vindas', async () => {
        allure.addSeverity('medium');
        allure.addStory('Exibição da Home');
        allure.addDescription('Verifica se a mensagem de boas-vindas é exibida corretamente');

        // Assert
        const isHomeDisplayed = await HomePage.isHomePageDisplayed();
        expect(isHomeDisplayed).toBe(true);
        
        const welcomeMsg = await HomePage.getWelcomeMessage();
        expect(welcomeMsg).toBeTruthy();
        
        allure.addStep('Mensagem de boas-vindas verificada');
    });

    it('Deve abrir o menu principal', async () => {
        allure.addSeverity('high');
        allure.addStory('Navegação do menu');
        allure.addDescription('Verifica se o menu principal abre corretamente');

        // Act
        await HomePage.openMenu();
        
        // Assert - Ajustar conforme sua aplicação
        await driver.pause(2000);
        
        allure.addStep('Menu principal aberto');
    });

    it('Deve realizar busca', async () => {
        allure.addSeverity('high');
        allure.addStory('Funcionalidade de busca');
        allure.addDescription('Verifica se a busca funciona corretamente');

        // Act
        const searchTerm = 'produto';
        await HomePage.search(searchTerm);
        
        // Assert - Ajustar conforme sua aplicação
        await driver.pause(2000);
        
        allure.addStep(`Busca realizada com termo: ${searchTerm}`);
    });

    it('Deve abrir perfil do usuário', async () => {
        allure.addSeverity('medium');
        allure.addStory('Perfil do usuário');
        allure.addDescription('Verifica navegação para o perfil do usuário');

        // Act
        await HomePage.openProfile();
        
        // Assert - Ajustar conforme sua aplicação
        await driver.pause(2000);
        
        allure.addStep('Perfil do usuário aberto');
    });

    afterEach(async () => {
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
