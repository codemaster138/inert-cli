import { render } from 'ejs';
import { prompt } from 'enquirer';
import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import ncp from 'ncp';
import ora from 'ora';
import { resolve } from 'path';
import { Command } from 'tauris';
import { measureTime } from './utils';

function copyAsync(src: string, dest: string) {
    return new Promise<void>((resolve, reject) => {
        ncp(src, dest, (err) => {
            if (err) reject(err);
            resolve();
        })
    });
}

const createCommand = new Command('init')
    .describe('Create a new project in the current folder')
    .usage('inert create')
    .handler((argv) => {
        measureTime(async () => {
            var failed: boolean = false;
            const group = (await prompt([{
                type: 'select',
                name: 'group',
                message: 'What kind of a site do you want to create?',
                choices: ['Blog', 'Documentation']
            }]) as any).group;

            const templates = readdirSync(resolve(__dirname, `../../templates/${group}`));
            const template = (await prompt([{
                type: 'select',
                name: 'template',
                message: 'Pick a template (more coming soon...):',
                choices: templates
            }]) as any).template

            const spinner = ora('copying template').start();

            await copyAsync(resolve(__dirname, `../../templates/${group}/${template}`), '.');
            spinner.succeed();

            console.log();
            console.log(`Almost done! Now let's set up your configuration:`);

            const answers: any = await prompt(JSON.parse(readFileSync('./config.json').toString())).catch(() => (failed = true));
            unlinkSync('./config.json');
            if (failed) return false;

            writeFileSync('./inert.config.js', render(readFileSync('./inert.config.ejs').toString(), { answers }));
            unlinkSync('./inert.config.ejs');

            return true;
        });
    });

export default createCommand;