#!/usr/bin/env node

'use strict';

const fs = require('fs');
const readline = require('readline');

const minimist = require('minimist');
const args = minimist(process.argv.slice(2), {
	alias: {
		'h': 'help',
		'e': 'exit',
		'i': 'input',
		'o': 'output'
	},
	'--': false
});

console.log(args);

const help = () => {

	console.log('Usage: jwalker [options]');
	console.log();
	console.log('  Use - (or omit) for stdin or stdout.');
	console.log();
	console.log('  Options:');
	console.log('    -i=[file], --input=[file]         Input file.');
	console.log('    -o=[file], --output=[file]        Output file.');
	console.log('    -e, --exit                        Exit on errors.');
	console.log();

	process.exit(0);

};

if (args.help === true) return help();

const exits = (args.exit === true);

args.input = args.input || '--';
args.output = args.output || '--';

const inputStream = (args.input === '--' ? process.stdin : fs.createReadStream(args.input));
const outputStream = (args.output === '--' ? process.stdout : fs.createWriteStream(args.output));

const line = readline.createInterface({
	input: inputStream
});

line.on('line', line => {
	try {
		outputStream.write(JSON.stringify(JSON.parse(line), null, 4) + '\n', 'utf8');
	} catch(err) {
		console.warn('Unable to parse line: ' + line);
		if (exits) process.exit(1);
	}
});
