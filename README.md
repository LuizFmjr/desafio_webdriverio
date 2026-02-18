# 📱 Automação de Testes Mobile - WebdriverIO + Appium

Projeto de automação de testes mobile utilizando as melhores práticas e tecnologias modernas.

## 🚀 Tecnologias Utilizadas

- **Linguagem**: JavaScript
- **Framework**: WebdriverIO v8
- **Biblioteca**: Appium v2
- **Gerenciador de Testes**: Mocha
- **Relatórios**: Allure Report
- **CI/CD**: GitLab CI/CD
- **Cloud de Dispositivos**: BrowserStack

## 📁 Estrutura do Projeto

```
webdriveio/
├── config/                          # Arquivos de configuração
│   ├── wdio.conf.js                # Configuração base do WebdriverIO
│   ├── wdio.browserstack.conf.js   # Configuração para BrowserStack
│   ├── wdio.android.conf.js        # Configuração para Android local
│   └── wdio.ios.conf.js            # Configuração para iOS local
├── test/
│   ├── pageobjects/                # Page Objects
│   │   ├── base.page.js           # Classe base com métodos comuns
│   │   ├── login.page.js          # Page Object da tela de login
│   │   └── home.page.js           # Page Object da tela home
│   ├── specs/                      # Arquivos de teste
│   │   ├── login.test.js          # Testes de login
│   │   └── home.test.js           # Testes da home
│   └── utils/                      # Utilitários e helpers
│       └── helpers.js             # Funções auxiliares
├── allure-results/                 # Resultados dos testes (gerado)
├── allure-report/                  # Relatório HTML (gerado)
├── screenshots/                    # Screenshots (gerado)
├── .env.example                    # Exemplo de variáveis de ambiente
├── .gitignore                      # Arquivos ignorados pelo Git
├── .gitlab-ci.yml                  # Configuração do GitLab CI/CD
└── package.json                    # Dependências do projeto
```

## 📋 Pré-requisitos

### Para testes locais:

- Node.js >= 16.x
- npm >= 8.x
- Java JDK >= 11 (para Appium e Allure)
- Android Studio (para testes Android locais)
- Xcode (para testes iOS locais - apenas macOS)

### Para testes no BrowserStack:

- Conta no BrowserStack
- App mobile (.apk para Android ou .app/.ipa para iOS)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd webdriveio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas credenciais
# - BROWSERSTACK_USERNAME
# - BROWSERSTACK_ACCESS_KEY
# - BROWSERSTACK_APP_ID
# - BROWSERSTACK_APP_ID_IOS
```

### 4. Faça upload do seu app no BrowserStack

```bash
# Android
curl -u "USERNAME:ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/app.apk"

# iOS
curl -u "USERNAME:ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/app.ipa"
```

Cole o `app_url` retornado no arquivo `.env`.

## 🎯 Executando os Testes

### Testes no BrowserStack

```bash
# Executar todos os testes no BrowserStack
npm run test:browserstack

# Executar teste específico
npx wdio run ./config/wdio.browserstack.conf.js --spec ./test/specs/login.test.js
```

### Testes Locais

#### Android

```bash
# 1. Inicie o Appium
appium

# 2. Em outro terminal, execute os testes
npm run test:android
```

#### iOS (apenas macOS)

```bash
# 1. Inicie o Appium
appium

# 2. Em outro terminal, execute os testes
npm run test:ios
```

## 📊 Relatórios

### Allure Report

```bash
# Gerar relatório
npm run allure:generate

# Abrir relatório no navegador
npm run allure:open

# Limpar resultados e relatórios anteriores
npm run allure:clean
```

O Allure Report fornece:
- ✅ Visão geral dos resultados dos testes
- 📸 Screenshots de falhas
- 📝 Logs detalhados
- 📊 Gráficos e estatísticas
- 🏷️ Categorização por severidade e features

## 🔄 CI/CD - GitLab

O projeto está configurado para executar automaticamente no GitLab CI/CD.

### Configuração no GitLab

1. Acesse **Settings** → **CI/CD** → **Variables**
2. Adicione as seguintes variáveis:
   - `BROWSERSTACK_USERNAME`: Seu username do BrowserStack
   - `BROWSERSTACK_ACCESS_KEY`: Sua access key do BrowserStack
   - `BROWSERSTACK_APP_ID`: ID do app Android no BrowserStack
   - `BROWSERSTACK_APP_ID_IOS`: ID do app iOS no BrowserStack (opcional)

### Pipeline

O pipeline possui 3 estágios:

1. **Install**: Instala as dependências
2. **Test**: Executa os testes no BrowserStack
3. **Report**: Gera o relatório Allure

### Acessar Relatórios

Os relatórios ficam disponíveis em:
- **Artifacts**: Disponíveis por 7 dias após a execução
- **GitLab Pages**: URL permanente (apenas para branch main/master)

## 📝 Escrevendo Testes

### Estrutura de um Page Object

```javascript
const BasePage = require('./base.page');

class MeuPage extends BasePage {
    // Seletores
    get meuElemento() {
        return $('~accessibility-id');
    }

    // Métodos de ação
    async minhaAcao() {
        await this.clickElement(this.meuElemento);
    }
}

module.exports = new MeuPage();
```

### Estrutura de um Teste

```javascript
const MeuPage = require('../pageobjects/meu.page');
const allure = require('@wdio/allure-reporter').default;

describe('Minha Suite de Testes', () => {
    it('Deve fazer algo', async () => {
        allure.addSeverity('critical');
        allure.addFeature('Minha Feature');
        allure.addStory('Minha História');

        // Arrange
        // Preparação

        // Act
        await MeuPage.minhaAcao();

        // Assert
        expect(resultado).toBe(esperado);
    });
});
```

## 🛠️ Boas Práticas

### Page Objects

- ✅ Use Page Object Pattern
- ✅ Separe seletores de ações
- ✅ Utilize métodos da BasePage
- ✅ Use accessibility IDs quando possível

### Testes

- ✅ Siga o padrão AAA (Arrange, Act, Assert)
- ✅ Use descrições claras nos testes
- ✅ Adicione severidade e categorias no Allure
- ✅ Faça assertions específicas
- ✅ Evite sleeps/waits fixos

### Seletores

Prioridade de seletores:

1. Accessibility ID: `$('~accessibility-id')`
2. ID (Android): `$('android=new UiSelector().resourceId("id")')`
3. Class name: `$('android.widget.Button')`
4. XPath (último recurso): `$('//button[@text="Login"]')`

## 🐛 Troubleshooting

### Appium não conecta ao dispositivo

```bash
# Verificar dispositivos Android
adb devices

# Reiniciar ADB
adb kill-server
adb start-server

# Verificar simuladores iOS
xcrun simctl list
```

### Erro de timeout

- Aumente o `waitforTimeout` no arquivo de configuração
- Verifique se o elemento possui o seletor correto
- Verifique se o app está na tela esperada

### BrowserStack não executa

- Verifique suas credenciais no arquivo `.env`
- Confirme que o APP_ID está correto
- Verifique seu saldo/minutos no BrowserStack

## 📚 Documentação Adicional

- [WebdriverIO](https://webdriver.io/)
- [Appium](https://appium.io/)
- [Mocha](https://mochajs.org/)
- [Allure Report](https://docs.qameta.io/allure/)
- [BrowserStack](https://www.browserstack.com/docs/app-automate)

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para automação de testes mobile**
