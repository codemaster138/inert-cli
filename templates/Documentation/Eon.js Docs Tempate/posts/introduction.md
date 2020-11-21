---
title: 'Introduction'
description: 'Describe this section'
---

# Headline
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices accumsan enim, ut maximus magna cursus vitae. Integer pulvinar sem.

```ts
// Some Code
import { Command } from 'tauris';

const argv = new Command('test')
    .option('v', {
        alias: ['version'],
        description: 'Display the version',
        type: 'boolean'
    })
    .demandArgument()
    .parse(process.argv.slice(2))

if (argv) {
    if (argv.v) console.log('v1.0.0');
}
```