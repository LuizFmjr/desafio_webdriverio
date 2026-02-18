# Configuração do Appium

## Instalação do Appium 2.x

```bash
# Instalar Appium globalmente
npm install -g appium

# Verificar instalação
appium --version
```

## Drivers

### Android - UiAutomator2

```bash
# Instalar driver
appium driver install uiautomator2

# Verificar drivers instalados
appium driver list
```

### iOS - XCUITest

```bash
# Instalar driver (apenas macOS)
appium driver install xcuitest

# Verificar drivers instalados
appium driver list
```

## Iniciar o Appium

### Modo padrão

```bash
appium
```

### Com configurações personalizadas

```bash
appium --address 127.0.0.1 --port 4723 --relaxed-security
```

### Com logs detalhados

```bash
appium --log-level debug
```

## Verificar Setup

### Android

```bash
# Verificar se o Android SDK está configurado
echo $ANDROID_HOME

# Verificar dispositivos
adb devices

# Verificar versão do Android
adb shell getprop ro.build.version.release
```

### iOS (macOS apenas)

```bash
# Listar simuladores
xcrun simctl list

# Verificar Xcode
xcode-select --print-path

# Verificar ferramentas de linha de comando
xcode-select --install
```

## Inspector (Interface gráfica)

Para inspecionar elementos do app:

```bash
# Instalar Appium Inspector
# Download em: https://github.com/appium/appium-inspector/releases

# Ou usar via navegador
# https://inspector.appiumpro.com/
```

### Configuração do Inspector

**Capabilities para Android:**
```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "emulator-5554",
  "appium:app": "/path/to/app.apk"
}
```

**Capabilities para iOS:**
```json
{
  "platformName": "iOS",
  "appium:automationName": "XCUITest",
  "appium:deviceName": "iPhone 14",
  "appium:platformVersion": "16.0",
  "appium:app": "/path/to/app.app"
}
```

## Plugins Úteis

```bash
# Plugin de imagens (encontrar elementos por imagem)
appium plugin install images

# Plugin de relaxed security
appium plugin install relaxed-caps
```

## Troubleshooting

### Android

**Problema**: adb not found

**Solução**:
```bash
# Adicionar ao PATH (Linux/Mac)
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Windows - adicionar nas variáveis de ambiente
ANDROID_HOME=C:\Users\<seu-usuario>\AppData\Local\Android\Sdk
Path=%Path%;%ANDROID_HOME%\platform-tools
```

**Problema**: Emulator não inicia

**Solução**:
```bash
# Listar AVDs disponíveis
emulator -list-avds

# Iniciar emulador específico
emulator -avd <nome-do-avd>
```

### iOS

**Problema**: WebDriverAgent build failed

**Solução**:
```bash
# Reconstruir WDA
cd /path/to/appium/drivers/xcuitest/node_modules/appium-webdriveragent
./Scripts/bootstrap.sh
```

## Documentação Oficial

- [Appium Documentation](https://appium.io/docs/en/2.0/)
- [Appium Drivers](https://appium.io/docs/en/2.0/ecosystem/drivers/)
- [Appium Capabilities](https://appium.io/docs/en/2.0/guides/caps/)
