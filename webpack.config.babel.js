const { HotModuleReplacementPlugin, NamedModulesPlugin } = require('webpack');

const WDS_PORT = 9999;
const myTitle = 'My Hot Awesome 30-10-2017';

module.exports = {
  "entry": ["react-hot-loader/patch", "./src/App.jsx"],
  "resolve" : {"extensions": [".js", ".jsx"]},
  "output": {
    "publicPath": "/",
    "filename": "./dist/bundle.js"
  },
  "devtool": "sourcemap",
  "module": {
    "rules": [{
        "test": /\.jsx$/,
        "loader": "babel-loader",
        "query": {
          "plugins": ["transform-function-bind"],
          "presets": [
            "react", ["es2015", {
              "modules": false
            }]
          ]
        }
      }]
  },
  "plugins": [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  ],
  "devServer": {
    "port": WDS_PORT,
    "hot": true,
    "host": "0.0.0.0"
  }

};
// this file: webpack.config.babel.js fork from https://kodaktor.ru/j/min_react_webpack
