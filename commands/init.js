/**
 * Inert CLI
 * Command: init
 * Made with ♥ by Jake Sarjeant
 */

const { prompt } = require('enquirer');
const chalk = require('chalk');
const ora = require('ora');

const execa = require('execa');

const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
ncp.limit = 16;

function ncp_async(source, dest) {
    return new Promise((resolve, reject) => {
        try {
            ncp(source, dest, (e) => {
                if (e) reject(e);
                resolve();
            });
        } catch (e) {
            throw e;
        }
    });
}

module.exports = async function init() {
    let failed = false;
    // Message
    console.log(`Initalizing a new project ${chalk.cyan(process.cwd())}\n`);

    // Create package.json
    const spinner = ora('Creating package.json');
    await execa.command('npm init -y').catch((e) => { spinner.fail(`Error: ${e.message}`); failed = true });
    if (failed) return false;
    spinner.succeed();

    // Install packages
    spinner.start(`Installing package: ${chalk.cyan('inert-compiler')}`);
    await execa.command('npm install inert-compiler').catch((e) => { spinner.fail(`Error: ${e.message}`); failed = true });
    if (failed) return false;

    spinner.text = `Installing package: ${chalk.cyan('http-server')}`
    await execa.command('npm install http-server --save-dev').catch((e) => { spinner.fail(`Error: ${e.message}`); failed = true });
    if (failed) return false;

    spinner.succeed('Installed dependencies');

    // Create folders and files
    spinner.start(`Creating boilerplate folders and files: Step ${chalk.cyan(1)}/2`);
    fs.mkdirSync('./assets');
    fs.mkdirSync('./posts');
    fs.mkdirSync('./public');
    fs.mkdirSync('./scss');
    fs.mkdirSync('./templates');

    spinner.succeed().start(`Creating boilerplate folders and files: Step ${chalk.cyan(2)}/2`);
    await ncp_async(path.resolve(__dirname, '../template/scss'), './scss').catch((e) => { spinner.fail(`Error: ${e}`); failed = true });
    if (failed) return false;
    await ncp_async(path.resolve(__dirname, '../template/templates'), './templates').catch((e) => { spinner.fail(`Error: ${e}`); failed = true });
    if (failed) return false;
    spinner.succeed();

    // Create inert.config.js
    console.log(`A configuration file will now be generated. Please answer a few questions:\n`);
    const answers = await prompt([{
        type: 'input',
        message: 'Name your blog:',
        name: 'blogName'
    }, {
        type: 'input',
        message: `What's your name?`,
        name: 'ownerName',
    }, {
        type: 'input',
        message: 'Describe yourself:',
        name: 'description'
    }]).catch(e => failed = true);
    if (failed) return false;

    const configText = `const config = {
    build: {
        input: "./posts",
        output: "./public",
        sassEntry: './scss/index.scss',
        sassFolder: './scss',
        sassOutput: 'index.css',
        templates: {
            home: './templates/home.ejs',
            post: './templates/post.ejs'
        }
    },
    blogName: \`${answers.blogName.replace('`', '')}\`,
    ownerName: \`${answers.ownerName.replace('`', '')}\`,
    description: \`${answers.description.replace('`', '')}\`,
    navLinks: [
        {
            href: '/',
            text: 'Home'
        },
        {
            href: '/about',
            text: 'About'
        },
        {
            href: 'https://dev.to/username',
            text: 'DEV.to'
        },
        {
            href: 'https://twitter.com/username',
            text: 'Twitter'
        }
    ],
    assets: './assets',
}

module.exports = config;`;

    fs.writeFileSync('./inert.config.js', configText);
    console.log(`\n${chalk.green('Successfully generated a new Inert project')}`)
    console.log(`\nTo build your project, run ${chalk.cyan('inert build')}\nTo serve a demo of your project, run ${chalk.cyan('inert serve')}\n\nMake sure to point your server's root directory to ${chalk.cyan(path.resolve(process.cwd(), './public'))}\n`);
    console.log('Have fun!');

    return true;
}