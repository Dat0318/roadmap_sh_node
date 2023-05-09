const webpack = require('webpack');
const webpackConfig = require('../package.json');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    throw error;
  }

  // do more things...
});

const statsString = stats.toString({
  colors: true,
  modules: false,
  entrypoints: false,
});

process.stdout.write(`${statsString}\n\n`);
process.stdout.write('Packing extension...\n');
