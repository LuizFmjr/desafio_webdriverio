const { config } = require('./wdio.conf.js');
const path = require('path');

// =======================
// Local iOS Configuration
// =======================
config.services = [
    ['appium', {
        args: {
            address: 'localhost',
            port: 4723,
            relaxedSecurity: true
        },
        logPath: './'
    }]
];

config.port = 4723;

config.capabilities = [{
    platformName: 'iOS',
    'appium:platformVersion': '16.0', // Ajuste conforme seu simulador/dispositivo
    'appium:deviceName': 'iPhone 14', // Nome do seu simulador ou dispositivo
    'appium:automationName': 'XCUITest',
    'appium:app': path.join(process.cwd(), 'app', 'ios', 'YourApp.app'), // Caminho para seu .app ou .ipa
    'appium:autoAcceptAlerts': true,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:newCommandTimeout': 240,
    'appium:wdaLaunchTimeout': 120000,
    'appium:iosInstallPause': 8000
}];

config.maxInstances = 1;

// ===========================
// Hooks para iOS Local
// ===========================
config.afterTest = async function(test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
        await driver.takeScreenshot();
    }
};

exports.config = config;
