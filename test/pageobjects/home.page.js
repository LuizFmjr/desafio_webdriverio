const BasePage = require('./base.page');

/**
 * Page Object para a tela Home/Dashboard
 */
class HomePage extends BasePage {
    /**
     * Define os seletores dos elementos da página
     */
    get welcomeMessage() {
        return $('~welcome-message');
    }

    get menuButton() {
        return $('~menu-button');
    }

    get profileButton() {
        return $('~profile-button');
    }

    get logoutButton() {
        return $('~logout-button');
    }

    get searchField() {
        return $('~search-field');
    }

    /**
     * Métodos de ação da página
     */

    /**
     * Verifica se está na tela home
     * @returns {Promise<boolean>} True se estiver na home
     */
    async isHomePageDisplayed() {
        return await this.isElementVisible(this.welcomeMessage);
    }

    /**
     * Obtém a mensagem de boas-vindas
     * @returns {Promise<string>} Texto da mensagem
     */
    async getWelcomeMessage() {
        return await this.getText(this.welcomeMessage);
    }

    /**
     * Abre o menu
     */
    async openMenu() {
        await this.clickElement(this.menuButton);
    }

    /**
     * Realiza logout
     */
    async logout() {
        await this.clickElement(this.logoutButton);
    }

    /**
     * Abre o perfil do usuário
     */
    async openProfile() {
        await this.clickElement(this.profileButton);
    }

    /**
     * Realiza uma busca
     * @param {string} searchTerm - Termo de busca
     */
    async search(searchTerm) {
        await this.setValue(this.searchField, searchTerm);
        await this.hideKeyboard();
    }
}

module.exports = new HomePage();
