var path = require('path')
var webpack = require('webpack')

module.exports = {
  // './src/Listeners.js','./src/Mixins.js','./src/Send.js'
  entry: ['./src/WebSocket.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.min.js'
  },
  module: {
    rules: [
        {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
            }
        }
    ]
}

}