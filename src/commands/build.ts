import { Command } from 'tauris';
import { measureTime } from './utils';

const buildCommand = new Command('build')
    .describe('Compile the project in the current folder')
    .option('W', {
        alias: ['watch'],
        description: 'Whether to watch for changes and recompile',
        type: 'boolean'
    })
    .handler(async (argv) => {
        const { compile, watch } = await import('inert-compiler');
        if (argv.w) {
            await watch();
        } else {
            await compile();
        }
        return true;
    });

export default buildCommand;