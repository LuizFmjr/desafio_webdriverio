# Guia de Início Rápido - Quick Start

## 🚀 Começando em 5 minutos

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do BrowserStack.

### 3. Fazer upload do app no BrowserStack

```bash
# Substituir USERNAME, ACCESS_KEY e caminho do app
curl -u "USERNAME:ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/your/app.apk"
```

Cole o `app_url` retornado no arquivo `.env` na variável `BROWSERSTACK_APP_ID`.

### 4. Executar os testes

```bash
npm run test:browserstack
```

### 5. Ver o relatório

```bash
npm run allure:generate
npm run allure:open
```

## 📝 Comandos Úteis

```bash
# Executar testes
npm test                      # Testes com configuração padrão
npm run test:browserstack     # Testes no BrowserStack
npm run test:android          # Testes locais Android
npm run test:ios              # Testes locais iOS

# Relatórios
npm run allure:generate       # Gerar relatório Allure
npm run allure:open           # Abrir relatório no navegador
npm run allure:clean          # Limpar resultados anteriores

# Desenvolvimento
npx wdio run config/wdio.browserstack.conf.js --spec test/specs/login.test.js
```

## 🔍 Estrutura de Comandos do Appium Local

### Android

```bash
# 1. Verificar dispositivos conectados
adb devices

# 2. Instalar o app
adb install path/to/app.apk

# 3. Iniciar Appium
appium

# 4. Em outro terminal, executar os testes
npm run test:android
```

### iOS (macOS apenas)

```bash
# 1. Listar simuladores
xcrun simctl list

# 2. Iniciar simulador
xcrun simctl boot "iPhone 14"

# 3. Instalar o app no simulador
xcrun simctl install booted path/to/app.app

# 4. Iniciar Appium
appium

# 5. Em outro terminal, executar os testes
npm run test:ios
```

## 🎯 Personalizando Testes

### Criar um novo teste

1. Crie um novo arquivo em `test/specs/`
2. Importe os Page Objects necessários
3. Escreva seus testes usando Mocha

```javascript
const LoginPage = require('../pageobjects/login.page');

describe('Meu novo teste', () => {
    it('Deve fazer algo', async () => {
        // Seu teste aqui
    });
});
```

### Criar um novo Page Object

1. Crie um novo arquivo em `test/pageobjects/`
2. Estenda a BasePage
3. Defina os seletores e métodos

```javascript
const BasePage = require('./base.page');

class NovoPage extends BasePage {
    get elemento() { return $('~id'); }
    
    async acao() {
        await this.clickElement(this.elemento);
    }
}

module.exports = new NovoPage();
```

## 🐛 Problemas Comuns

### Erro: ECONNREFUSED

**Causa**: Appium não está rodando

**Solução**: Inicie o Appium com `appium` antes de executar os testes locais

### Erro: An unknown server-side error occurred

**Causa**: Dispositivo/simulador não está disponível ou seletor incorreto

**Solução**: 
- Verifique se o dispositivo está conectado: `adb devices`
- Verifique se o seletor do elemento está correto

### Erro: BrowserStack authentication failed

**Causa**: Credenciais inválidas no arquivo `.env`

**Solução**: Verifique se `BROWSERSTACK_USERNAME` e `BROWSERSTACK_ACCESS_KEY` estão corretos

### Teste timeout

**Causa**: Elemento não encontrado ou app lento

**Solução**: 
- Aumente o `waitforTimeout` no arquivo de configuração
- Verifique se o seletor está correto
- Use `waitForElement` antes de interagir

## 📚 Próximos Passos

1. Personalize os Page Objects para seu app
2. Ajuste os seletores conforme necessário
3. Adicione mais casos de teste
4. Configure o GitLab CI/CD
5. Explore o Allure Report

---

Para mais detalhes, consulte o [README.md](README.md) completo.
