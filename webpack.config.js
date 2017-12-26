const path = require('path');
const webpack = require('webpack');
let env = process.env.NODE_ENV;

module.exports = require(path.resolve(__dirname, 'cfg', 'dev'));