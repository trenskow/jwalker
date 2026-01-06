import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});
const gitIgnorePath = path.resolve(__dirname, '.gitignore');

export default [...compat.extends('eslint:recommended'),
	includeIgnoreFile(gitIgnorePath), {
		languageOptions: {
			globals: {
				...globals.node,
				...globals.mocha,
				Router: true,
				Endpoint: true,
				app: true
			},

			ecmaVersion: 'latest',
			sourceType: 'module'
		},

		rules: {
			indent: ['error', 'tab', {
				SwitchCase: 1
			}],

			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'always'],

			'no-console': ['error', {
				allow: ['warn', 'error', 'info']
			}],

			'no-unused-vars': ['warn', {
				argsIgnorePattern: '^_',
				caughtErrors: 'none'
			}],

			'no-empty': ['error', {
				allowEmptyCatch: true
			}],

			'no-trailing-spaces': ['error', {
				ignoreComments: true
			}],

			'require-atomic-updates': 'off',
			'no-implicit-globals': ['error'],
			'eol-last': ['error', 'always'],
			'comma-dangle': ['error', 'never']
		}
	}];
