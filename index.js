#!/usr/bin/env node
/**
 * Inert CLI
 * Made with ♥ by Jake Sarjeant
 */

const init = require('./commands/init');
const build = require('./commands/build');
const serve = require('./commands/serve');
const import_ = require('./commands/import');

const chalk = require('chalk');

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv =
    yargs(hideBin(process.argv))

        .command('init', 'Create a new project', (yargs) => { }, (argv) => {
            runInit();
        })

        .command('build', 'Build your project', (yargs) => {
            yargs.option('watch')
        }, (argv) => {
            runBuild(argv);
        })

        .command('import', 'Import from an external CMS (requires configuration)', (yargs) => {}, (argv) => {
            runImport();
        })

        .command('serve', 'Serve a demo on http://127.0.0.1:8080/', (yargs) => { }, (argv) => {
            serve().catch(e => {
                console.log(`\nWhoops! Something went wrong:\n${e}\n\nIf this error message does not seem helpful, please open an issue at ${chalk.cyan('https://github.com/codemaster138/inert-cli/issues')}`);
            })
        })

        .alias('version', 'v')
        .help('help')
        .alias('help', 'h')
        .demandCommand()
        .recommendCommands()
        .strict()
        .argv;

async function runInit() {
    const timeBefore = Date.now();

    let success;
    success = await init().catch(e => {
        success = false;
        console.log(`\nWhoops! Something went wrong:\n${e}\n\nIf this error message does not seem helpful, please open an issue at ${chalk.cyan('https://github.com/codemaster138/inert-cli/issues')}`);
    });

    console.log('\nInitial Build Running...');
    await runBuild({watch: false});

    const timeTaken = Date.now() - timeBefore;

    console.log(`\nTask ${success ? chalk.cyan('succeded') : chalk.red('failed')} in ${timeTaken / 1000}s`);
}

async function runBuild(argv) {
    const timeBefore = Date.now();

    let success;
    success = await build(argv.watch).catch(e => {
        success = false;
        console.log(`\nWhoops! Something went wrong:\n${e}\n\nIf this error message does not seem helpful, please open an issue at ${chalk.cyan('https://github.com/codemaster138/inert-cli/issues')}`);
    });

    const timeTaken = Date.now() - timeBefore;

    console.log(`\nTask ${success ? chalk.cyan('succeded') : chalk.red('failed')} in ${timeTaken / 1000}s`);
}

async function runImport(argv) {
    const timeBefore = Date.now();

    let success;
    success = await import_().catch(e => {
        success = false;
        console.log(`\nWhoops! Something went wrong:\n${e}\n\nIf this error message does not seem helpful, please open an issue at ${chalk.cyan('https://github.com/codemaster138/inert-cli/issues')}`);
    });

    const timeTaken = Date.now() - timeBefore;

    console.log(`\nTask ${success ? chalk.cyan('succeded') : chalk.red('failed')} in ${timeTaken / 1000}s`);
}