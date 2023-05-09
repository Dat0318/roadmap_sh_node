const output = fs.createWriteStream(`${path}/${filename}`);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

const argv = require('yargs')
  .usage('Release extension.\nUsage: $0 <browser>')
  .describe('browser', 'Target browser: chrome | firefox | opera')
  .string('browser')
  .showHelpOnFail(false, 'Specify --help for available options')
  .help('help').argv;

console.log(argv.browser);

// pipe archive data to the file
archive.pipe(output);
archive.directory(sourceDir, false);
archive.finalize();

output.on('close', () =>
  resolve({
    path: output.path,
    size: archive.pointer(),
  })
);

output.on('end', () => {
  console.log('Data has been drained');
});

archive.on('error', (err) => {
  reject(err);
});
