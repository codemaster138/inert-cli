/**
 * Inert CLI
 * Command: build
 * Made with ♥ by Jake Sarjeant
 */

const chalk = require('chalk');
const execa = require('execa');

const fs = require('fs');

module.exports = async function build(watch) {
    if (!fs.existsSync('./inert.config.js')) {
        console.log(`${chalk.cyan(process.cwd())} is not an Inert project ${chalk.gray("No 'inert.config.js' found")}`);
        return false;
    }

    const command = `inert-compiler ${watch ? 'dev':  'build'}`
    console.log(`❯ ${chalk.cyan(command)}`);

    let child = execa.command('npx ' + command);
    await child;

    return true;
}