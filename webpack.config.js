const path = require('path');

module.exports = {
  mode: 'development', // 또는 'production'
  entry: '/index.js', // 진입점 파일 경로를 지정하세요
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
