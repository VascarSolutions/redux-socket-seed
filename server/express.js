var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('./../webpack.config.js')
var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var path = require('path');

module.exports = function(app) {

    if(process.env.NODE_ENV == 'development'){
        var compiler = webpack(webpackConfig)
        app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}))
        app.use(webpackHotMiddleware(compiler))
    }

    app.use(express.static(path.join(__dirname, '..','deploy')));

    function shouldCompress(req, res) {
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false;
        }

        // fallback to standard filter function
        return function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        }
    }
    app.use(compression({
        filter: shouldCompress,
        level: 9 // max level of compression, default 6
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.get('/',function(req, res) {
        if(process.env.NODE_ENV == 'development'){
            res.sendFile(path.resolve(path.join(__dirname, '..','client', 'index.html')))
        }else{
            res.sendFile(path.resolve(path.join(__dirname, '..','deploy', 'index.html')))
        }
    })


}