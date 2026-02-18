const BasePage = require('./base.page');

/**
 * Page Object para a tela de Login
 */
class LoginPage extends BasePage {
    /**
     * Define os seletores dos elementos da página
     */
    get usernameField() {
        // Android e iOS podem ter seletores diferentes
        // Exemplo usando accessibility id (recomendado para cross-platform)
        return $('~username-input');
        // Ou por resource-id no Android:
        // return $('android=new UiSelector().resourceId("com.app:id/username")');
        // Ou por accessibility id no iOS:
        // return $('~username');
    }

    get passwordField() {
        return $('~password-input');
    }

    get loginButton() {
        return $('~login-button');
    }

    get errorMessage() {
        return $('~error-message');
    }

    get loginTitle() {
        return $('~login-title');
    }

    get forgotPasswordLink() {
        return $('~forgot-password-link');
    }

    get signupLink() {
        return $('~signup-link');
    }

    /**
     * Métodos de ação da página
     */

    /**
     * Realiza o login com credenciais fornecidas
     * @param {string} username - Nome de usuário
     * @param {string} password - Senha
     */
    async login(username, password) {
        await this.setValue(this.usernameField, username);
        await this.setValue(this.passwordField, password);
        await this.hideKeyboard();
        await this.clickElement(this.loginButton);
    }

    /**
     * Verifica se está na tela de login
     * @returns {Promise<boolean>} True se estiver na tela de login
     */
    async isLoginPageDisplayed() {
        return await this.isElementVisible(this.loginTitle);
    }

    /**
     * Obtém a mensagem de erro exibida
     * @returns {Promise<string>} Texto da mensagem de erro
     */
    async getErrorMessage() {
        return await this.getText(this.errorMessage);
    }

    /**
     * Verifica se a mensagem de erro está visível
     * @returns {Promise<boolean>} True se a mensagem de erro estiver visível
     */
    async isErrorMessageDisplayed() {
        return await this.isElementVisible(this.errorMessage);
    }

    /**
     * Clica no link "Esqueci minha senha"
     */
    async clickForgotPassword() {
        await this.clickElement(this.forgotPasswordLink);
    }

    /**
     * Clica no link de cadastro
     */
    async clickSignup() {
        await this.clickElement(this.signupLink);
    }

    /**
     * Limpa os campos de entrada
     */
    async clearFields() {
        await this.usernameField.clearValue();
        await this.passwordField.clearValue();
    }
}

module.exports = new LoginPage();
