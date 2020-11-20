"use strict";
/**
 * Inert CLI v2
 *
 * Made with ♥️ by Jake Sarjeant
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var get_package_version_1 = __importDefault(require("@jsbits/get-package-version"));
var chalk_1 = require("chalk");
var tauris_1 = require("tauris");
var build_1 = __importDefault(require("./commands/build"));
var create_1 = __importDefault(require("./commands/create"));
var header = " _____                 _   \n|_   _|               | |  \n  | |  _ __   ___ _ __| |_ \n  | | | '_ \\ / _ \\ '__| __|\n _| |_| | | |  __/ |  | |_ \n|_____|_| |_|\\___|_|   \\__| CLI v" + get_package_version_1.default(__dirname);
var argv = new tauris_1.Command('inert')
    .header(header)
    .describe("Create and compile " + chalk_1.cyan('inert.js') + " blogs")
    .option('v', {
    alias: ['version'],
    description: 'Display the version number and exit',
    type: 'boolean'
})
    .command(build_1.default)
    .command(create_1.default)
    .demandArgument()
    .parse(process.argv.slice(2));
if (argv) {
    if (argv.v) {
        console.log("v" + get_package_version_1.default(__dirname));
    }
}
