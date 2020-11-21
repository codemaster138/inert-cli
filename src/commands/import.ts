import { Command } from 'tauris';
import { measureTime } from './utils';

const importCommand = new Command('import')
    .describe('Import from external source & compile the project in the current folder')
    .handler((argv) => {
        measureTime(async () => {
            const { import: _import } = await import('inert-compiler');
            await _import();
            return true;
        });
    });

export default importCommand;