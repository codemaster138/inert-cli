import { render } from 'ejs';
import { prompt } from 'enquirer';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
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

const createCommand = new Command('create')
    .describe('Create a new project in the current folder')
    .usage('inert create')
    .handler((argv) => {
        measureTime(async () => {
            var template: string;
            var failed: boolean = false;
            template = (await prompt([{
                type: 'select',
                name: 'template',
                message: 'Pick a template',
                choices: ['Blog', 'Documentation']
            }]) as any).template;

            const spinner = ora('copying template').start();

            await copyAsync(resolve(__dirname, `../../templates/${template}`), '.');
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