module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'jasmine'],
        files: [
            'node_modules/babel/node_modules/babel-core/browser-polyfill.js',
            'src/**/*.js',
            'tests/**/*.js'
        ],
        exclude: [],
        preprocessors: {
            'src/**/*.js': ['browserify'],
            'tests/**/*.js': ['browserify']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'], //, 'Firefox', 'PhantomJS'],
        singleRun: true,
        browserify: {
            debug: true,
            transform: ['babelify']
        }
    });
};
