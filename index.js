#!/usr/bin/env node
/**
 * Inert CLI
 * Made with ♥ by Jake Sarjeant
 */

const init = require('./commands/init');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv =
    yargs(hideBin(process.argv))
    .command('init', 'Create a new project', (yargs) => {}, (argv) => {
        init().catch(e => {
            console.log(`\nWhoops! Something went wrong:\n${e}\n\nIf this error message does not seem helpful, please open an issue at ${chalk.cyan('https://github.com/codemaster138/inert-cli/issues')}`);
        });
    })
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .demandCommand()
    .recommendCommands()
    .strict()
    .argv;