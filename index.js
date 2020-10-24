#!/usr/bin/env node
/**
 * Inert CLI
 * Made with ♥ by Jake Sarjeant
 */

const init = require('./commands/init');
const build = require('./commands/build');

const chalk = require('chalk');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv =
    yargs(hideBin(process.argv))
    .command('init', 'Create a new project', (yargs) => {}, (argv) => {
        init().catch(e => {
            console.log(`\nWhoops! Something went wrong:\n${e}\n\nIf this error message does not seem helpful, please open an issue at ${chalk.cyan('https://github.com/codemaster138/inert-cli/issues')}`);
        });
    })
    .command('build', 'Build your project', (yargs) => {
        yargs.option('watch')
    }, async (argv) => {
        const timeBefore = Date.now();
        
        let success;
        success = await build(argv.watch).catch(e => {
            success = false;
            console.log(`\nWhoops! Something went wrong:\n${e}\n\nIf this error message does not seem helpful, please open an issue at ${chalk.cyan('https://github.com/codemaster138/inert-cli/issues')}`);
        });

        const timeTaken = Date.now() - timeBefore;

        console.log(`\nTask ${success ? chalk.cyan('succeded') : chalk.red('failed')} in ${timeTaken / 1000}s`);
    })
    .alias('version', 'v')
    .help('help')
    .alias('help', 'h')
    .demandCommand()
    .recommendCommands()
    .strict()
    .argv;