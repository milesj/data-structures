module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser.js',
            'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
            'src/*.js',
            'tests/*.js'
        ],
        exclude: [],
        preprocessors: {
            'src/*.js': ['babel'],
            'tests/*.js': ['babel']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'], //, 'Firefox', 'PhantomJS'],
        singleRun: true,
        babelPreprocessor: {
            options: {
                modules: 'common'
            }
        }
    });
};
