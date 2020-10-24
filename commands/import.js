/**
 * Inert CLI
 * Command: import
 * Made with ♥ by Jake Sarjeant
 */

const chalk = require('chalk');
const execa = require('execa');

const fs = require('fs');

module.exports = async function import_() {
    if (!fs.existsSync('./inert.config.js')) {
        console.log(`${chalk.cyan(process.cwd())} is not an Inert project ${chalk.gray("(No 'inert.config.js' found)")}`);
        return false;
    }

    const command = `inert-compiler import`
    console.log(`❯ ${chalk.cyan(command)}`);

    let child = execa.command('npx ' + command, {all: true, shell: true});
    child.all.pipe(process.stdout);
    await child;

    return true;
}