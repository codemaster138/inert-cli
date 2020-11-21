import { bold, cyan, green } from 'chalk';
import { existsSync, readFile, statSync } from 'fs';
import { createServer } from 'http';
import { resolve } from 'path';
import { Command } from 'tauris';
import mime from 'mime-types';
import build from './build';

const serveCommand = new Command('serve')
    .describe('Serve up a demo of your site')
    .handler(async (argv) => {
        if (!existsSync(resolve(process.cwd(), './inert.config.js'))) {
            console.log(`Missing configuration file. Try creating a site with ${cyan(`inert ${bold('init')}`)}`);
            return;
        }
        console.log('Building your site...');
        await (build as any)._handler({});
        await new Promise((resolve) => {
            setTimeout(() => resolve(''), 2000);
        });
        const path = resolve(process.cwd(), require(resolve(process.cwd(), './inert.config.js')).build.output)
        createServer((req: any, res) => {
            try {
                const filePath = !(statSync(resolve(path, '.' + req.url)).isDirectory()) ? resolve(path,'.' + req.url) : resolve(path, '.' + req.url, './index.html');
                readFile(filePath, function (err, data) {
                    if (err) {
                        res.writeHead(404);
                        console.log(`404 => ${err}`);
                        res.end(JSON.stringify(err));
                        return;
                    }
                    res.writeHead(200, { 'content-type': mime.lookup(filePath) || 'text/plain; charset=utf-8'});
                    res.end(data);
                });
            } catch (err) {
                res.writeHead(404);
                console.log(`404 => ${err}`);
                res.end(JSON.stringify(err));
                return;
            }
        }).listen(8080, () => {
            console.log(`${green('✔︎')} Serving your site at » ${cyan(`http://localhost:8080/`)} «`)
        });
    });

export default serveCommand;