/**
 * Inert CLI
 * Command: build
 * Made with ♥ by Jake Sarjeant
 */

const chalk = require('chalk');
const execa = require('execa');

const fs = require('fs');

module.exports = async function serve() {
    if (!fs.existsSync('./inert.config.js')) {
        console.log(`${chalk.cyan(process.cwd())} is not an Inert project ${chalk.gray("(No 'inert.config.js' found)")}`);
        return false;
    }

    const command = `http-server ./public -p 8080`
    console.log(`❯ ${chalk.cyan(command)}`);

    let child = execa.command('npx ' + command);
    console.log('\nServing on http://127.0.0.1:8080/');
    await child;

    return true;
}