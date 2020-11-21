/**
 * Inert CLI v2
 * 
 * Made with ♥️ by Jake Sarjeant
 */

import getPackageVersion from '@jsbits/get-package-version';
import { cyan } from 'chalk';
import { Command } from 'tauris';
import build from './commands/build';
import create from './commands/create';
import _import from './commands/import';
import serve from './commands/serve';

const header = ` _____                 _   
|_   _|               | |  
  | |  _ __   ___ _ __| |_ 
  | | | '_ \\ / _ \\ '__| __|
 _| |_| | | |  __/ |  | |_ 
|_____|_| |_|\\___|_|   \\__| CLI v${getPackageVersion(__dirname)}`;

const argv = new Command('inert')
    .header(header)
    .describe(`Create and compile ${cyan('inert.js')} blogs`)
    .option('v', {
        alias: ['version'],
        description: 'Display the version number and exit',
        type: 'boolean'
    })
    .command(build)
    .command(create)
    .command(_import)
    .command(serve)
    .demandArgument()
    .parse(process.argv.slice(2));

if (argv) {
    if (argv.v) {
        console.log(`v${getPackageVersion(__dirname)}`);
    }
}