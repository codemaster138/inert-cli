"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ejs_1 = require("ejs");
var enquirer_1 = require("enquirer");
var fs_1 = require("fs");
var ncp_1 = __importDefault(require("ncp"));
var ora_1 = __importDefault(require("ora"));
var path_1 = require("path");
var tauris_1 = require("tauris");
var utils_1 = require("./utils");
function copyAsync(src, dest) {
    return new Promise(function (resolve, reject) {
        ncp_1.default(src, dest, function (err) {
            if (err)
                reject(err);
            resolve();
        });
    });
}
var createCommand = new tauris_1.Command('init')
    .describe('Create a new project in the current folder')
    .usage('inert create')
    .handler(function (argv) {
    utils_1.measureTime(function () { return __awaiter(void 0, void 0, void 0, function () {
        var failed, group, templates, template, spinner, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failed = false;
                    return [4 /*yield*/, enquirer_1.prompt([{
                                type: 'select',
                                name: 'group',
                                message: 'What kind of a site do you want to create?',
                                choices: ['Blog', 'Documentation']
                            }])];
                case 1:
                    group = (_a.sent()).group;
                    templates = fs_1.readdirSync(path_1.resolve(__dirname, "../../templates/" + group));
                    return [4 /*yield*/, enquirer_1.prompt([{
                                type: 'select',
                                name: 'template',
                                message: 'Pick a template (more coming soon...):',
                                choices: templates
                            }])];
                case 2:
                    template = (_a.sent()).template;
                    spinner = ora_1.default('copying template').start();
                    return [4 /*yield*/, copyAsync(path_1.resolve(__dirname, "../../templates/" + group + "/" + template), '.')];
                case 3:
                    _a.sent();
                    spinner.succeed();
                    console.log();
                    console.log("Almost done! Now let's set up your configuration:");
                    return [4 /*yield*/, enquirer_1.prompt(JSON.parse(fs_1.readFileSync('./config.json').toString())).catch(function () { return (failed = true); })];
                case 4:
                    answers = _a.sent();
                    fs_1.unlinkSync('./config.json');
                    if (failed)
                        return [2 /*return*/, false];
                    fs_1.writeFileSync('./inert.config.js', ejs_1.render(fs_1.readFileSync('./inert.config.ejs').toString(), { answers: answers }));
                    fs_1.unlinkSync('./inert.config.ejs');
                    return [2 /*return*/, true];
            }
        });
    }); });
});
exports.default = createCommand;
