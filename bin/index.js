#!/usr/bin/env node

'use strict';

const
	fs = require('fs');

const
	minimist = require('minimist');

const
	JWalker = require('../lib');

const
	args = minimist(process.argv.slice(2), {
		alias: {
			'h': 'help',
			's': 'spaces',
			'p': 'passthrough',
			'i': 'input',
			'o': 'output'
		},
		'--': false
	});

const help = () => {

	console.info('Usage: jwalker [options]');
	console.info();
	console.info('  Use -- (or omit) for stdin or stdout.');
	console.info();
	console.info('  Options:');
	console.info('    -i=[file], --input=[file]         Input file.');
	console.info('    -o=[file], --output=[file]        Output file.');
	console.info('    -p, --passthrough                 Passthrough non-JSON.');
	console.info('    -s=[spaces], --spaces=[spaces]    Number of spaces per indentation (default=4).');
	console.info();

	process.exit(0);

};

if (args.help === true) return help();

args.input = args.input || '--';
args.output = args.output || '--';

(args.input === '--' ? process.stdin : fs.createReadStream(args.input))
	.pipe(new JWalker({ passthroughNonJSON: args.passthrough, spaces: args.spaces }))
	.pipe((args.output === '--' ? process.stdout : fs.createWriteStream(args.output)));
