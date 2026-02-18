const { config } = require('./wdio.conf.js');
const path = require('path');

// ===========================
// Local Android Configuration
// ===========================
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
    platformName: 'Android',
    'appium:deviceName': 'emulator-5554',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'C:/Users/ferdn/Downloads/android.wdio.native.app.v2.0.0.apk',
    'appium:platformVersion': '16',
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:newCommandTimeout': 240,
    'appium:androidInstallTimeout': 90000
}];

config.maxInstances = 1;

// ===========================
// Hooks para Android Local
// ===========================
config.afterTest = async function(test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
        await driver.takeScreenshot();
    }
};

exports.config = config;
