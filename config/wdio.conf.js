exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        '../test/specs/**/*.js'
    ],
    exclude: [],
    
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [],
    
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    services: [],
    
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    
    //
    // =====
    // Hooks
    // =====
    /**
     * Gets executed once before all workers get launched.
     */
    onPrepare: function (config, capabilities) {
        console.log('========= Iniciando execução dos testes =========');
    },
    
    /**
     * Gets executed before a worker process is spawned and can be used to initialize specific service
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    
    /**
     * Gets executed before test execution begins
     */
    before: function (capabilities, specs) {
        const chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
    },
    
    /**
     * Runs before a WebdriverIO command gets executed.
     */
    beforeCommand: function (commandName, args) {
    },
    
    /**
     * Runs after a WebdriverIO command gets executed
     */
    afterCommand: function (commandName, args, result, error) {
    },
    
    /**
     * Gets executed after all tests are done.
     */
    after: function (result, capabilities, specs) {
    },
    
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     */
    onComplete: function(exitCode, config, capabilities, results) {
        console.log('========= Execução dos testes finalizada =========');
    },
    
    /**
     * Gets executed when a refresh happens.
     */
    onReload: function(oldSessionId, newSessionId) {
    },
    
    //
    // =====
    // Mocha
    // =====
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        require: []
    }
};
