require('dotenv').config();
const { config } = require('./wdio.conf.js');

// ===========================
// BrowserStack Configuration
// ===========================
config.user = process.env.BROWSERSTACK_USERNAME;
config.key = process.env.BROWSERSTACK_ACCESS_KEY;

config.services = [
    ['browserstack', {
        buildIdentifier: process.env.CI_COMMIT_SHORT_SHA || 'local',
        browserstackLocal: false,
        opts: {
            forceLocal: false
        }
    }]
];

// =====================
// BrowserStack Capabilities
// =====================
config.capabilities = [
    {
        // Android Configuration
        platformName: 'Android',
        'appium:platformVersion': '13.0',
        'appium:deviceName': 'Samsung Galaxy S23',
        'appium:automationName': 'UiAutomator2',
        'appium:app': process.env.BROWSERSTACK_APP_ID || 'bs://<your-app-id>',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        
        // BrowserStack specific
        'bstack:options': {
            projectName: 'Mobile Automation Project',
            buildName: `Build ${process.env.CI_COMMIT_SHORT_SHA || 'Local'}`,
            sessionName: 'Android Test',
            debug: true,
            networkLogs: true,
            video: true,
            appiumVersion: '2.0.1'
        }
    },
    // {
    //     // iOS Configuration
    //     platformName: 'iOS',
    //     'appium:platformVersion': '16',
    //     'appium:deviceName': 'iPhone 14',
    //     'appium:automationName': 'XCUITest',
    //     'appium:app': process.env.BROWSERSTACK_APP_ID_IOS || 'bs://<your-ios-app-id>',
    //     'appium:autoAcceptAlerts': true,
    //     'appium:noReset': false,
    //     'appium:fullReset': false,
        
    //     // BrowserStack specific
    //     'bstack:options': {
    //         projectName: 'Mobile Automation Project',
    //         buildName: `Build ${process.env.CI_COMMIT_SHORT_SHA || 'Local'}`,
    //         sessionName: 'iOS Test',
    //         debug: true,
    //         networkLogs: true,
    //         video: true,
    //         appiumVersion: '2.0.1'
    //     }
    // }
];

config.maxInstances = 5;

// ===========================
// Test Configuration Updates
// ===========================
config.waitforTimeout = 30000;
config.connectionRetryTimeout = 180000;
config.connectionRetryCount = 3;

// ===========================
// Hooks Updates
// ===========================
config.afterTest = async function(test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
        await driver.takeScreenshot();
    }
};

exports.config = config;
