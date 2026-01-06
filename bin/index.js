#!/usr/bin/env node

import fs from 'fs';

import argumentsParser from '@trenskow/arguments-parser';

import JWalker from '../lib/index.js';

const {
	input,
	output,
	spaces = '\t',
	passthrough
} = await argumentsParser().options({
	'input': {
		type: String,
		default: '--',
		description: 'Input file (-- for stdin).'
	},
	'output': {
		type: String,
		default: '--',
		description: 'Output file (-- for stdout).'
	},
	'spaces': {
		type: Number,
		description: 'Use number of spaces for indentation (default is tab).'
	},
	'passthrough': {
		type: Boolean,
		default: false,
		description: 'Passthrough non-JSON lines.'
	}
});

(input === '--' ? process.stdin : fs.createReadStream(input))
	.pipe(new JWalker({ passthroughNonJSON: passthrough, spaces: spaces }))
	.pipe((output === '--' ? process.stdout : fs.createWriteStream(output)));
