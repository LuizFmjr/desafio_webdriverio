# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-02-18

### Adicionado

#### Estrutura do Projeto
- Estrutura inicial do projeto com WebdriverIO v8
- Configuração do Appium v2 para testes mobile
- Integração com Mocha como gerenciador de testes
- Configuração do Allure Report para relatórios detalhados
- Pipeline CI/CD com GitLab
- Integração com BrowserStack para testes em nuvem

#### Configurações
- `wdio.conf.js` - Configuração base do WebdriverIO
- `wdio.browserstack.conf.js` - Configuração para BrowserStack
- `wdio.android.conf.js` - Configuração para testes Android locais
- `wdio.ios.conf.js` - Configuração para testes iOS locais
- `.gitlab-ci.yml` - Pipeline de CI/CD
- `.env.example` - Template de variáveis de ambiente

#### Page Objects
- `base.page.js` - Classe base com métodos reutilizáveis
- `login.page.js` - Page Object para tela de login
- `home.page.js` - Page Object para tela home

#### Testes
- `login.test.js` - Suite de testes de login
- `home.test.js` - Suite de testes da home

#### Utilitários
- `helpers.js` - Funções auxiliares
- `gesture-helper.js` - Helpers para gestos mobile
- `test-data.js` - Dados de teste centralizados

#### Documentação
- `README.md` - Documentação completa do projeto
- `QUICKSTART.md` - Guia de início rápido
- `APPIUM_SETUP.md` - Guia de configuração do Appium
- `CONTRIBUTING.md` - Guia de contribuição
- `CHANGELOG.md` - Histórico de mudanças

#### Scripts NPM
- `test` - Executar testes com configuração padrão
- `test:browserstack` - Executar testes no BrowserStack
- `test:android` - Executar testes Android locais
- `test:ios` - Executar testes iOS locais
- `allure:generate` - Gerar relatório Allure
- `allure:open` - Abrir relatório Allure
- `allure:clean` - Limpar resultados anteriores

#### Estrutura de Pastas
- `config/` - Arquivos de configuração
- `test/pageobjects/` - Page Objects
- `test/specs/` - Arquivos de teste
- `test/utils/` - Utilitários e helpers
- `app/android/` - Apps Android para testes locais
- `app/ios/` - Apps iOS para testes locais
- `allure-results/` - Resultados dos testes
- `screenshots/` - Screenshots capturadas

### Recursos Principais

#### WebdriverIO
- Versão 8.x com todas as funcionalidades modernas
- Suporte para Android e iOS
- Execução paralela de testes
- Retry automático em caso de falha

#### Appium
- Appium 2.x com drivers atualizados
- UiAutomator2 para Android
- XCUITest para iOS
- Suporte para gestos mobile complexos

#### Relatórios
- Allure Report com gráficos e estatísticas
- Screenshots automáticos em falhas
- Categorização por severidade e features
- Histórico de execuções

#### CI/CD
- Pipeline GitLab com 3 estágios
- Execução automática em branches e MRs
- Cache de dependências
- Publicação de relatórios via GitLab Pages
- Artifacts disponíveis por 7-30 dias

#### BrowserStack
- Testes em dispositivos reais
- Suporte para Android e iOS
- Gravação de vídeos
- Logs de rede
- Debug remoto

### Dependências Principais

- @wdio/cli: ^8.29.1
- @wdio/mocha-framework: ^8.29.1
- @wdio/allure-reporter: ^8.29.1
- @wdio/browserstack-service: ^8.29.1
- @wdio/appium-service: ^8.29.1
- appium: ^2.4.1
- chai: ^4.3.10
- allure-commandline: ^2.25.0

---

**Legenda:**
- `Adicionado` - Novas funcionalidades
- `Modificado` - Mudanças em funcionalidades existentes
- `Descontinuado` - Funcionalidades que serão removidas
- `Removido` - Funcionalidades removidas
- `Corrigido` - Correções de bugs
- `Segurança` - Correções de vulnerabilidades
