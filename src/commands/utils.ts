import { cyan, red } from "chalk";

export async function measureTime(call: (() => (boolean | Promise<boolean> | void | Promise<void>))) {
    const timeStart = Date.now();
    let success = false;
    try {
        success = await call() || false;
    } catch (e) {
        console.log(e);
    }
    console.log(`\nTask ${success ? cyan('succeeded') : red('failed')} in ${cyan(Date.now() - timeStart)}ms`);
}