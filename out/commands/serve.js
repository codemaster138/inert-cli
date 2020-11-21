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
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var http_1 = require("http");
var path_1 = require("path");
var tauris_1 = require("tauris");
var mime_types_1 = __importDefault(require("mime-types"));
var build_1 = __importDefault(require("./build"));
var serveCommand = new tauris_1.Command('serve')
    .describe('Serve up a demo of your site')
    .handler(function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    var path;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!fs_1.existsSync(path_1.resolve(process.cwd(), './inert.config.js'))) {
                    console.log("Missing configuration file. Try creating a site with " + chalk_1.cyan("inert " + chalk_1.bold('init')));
                    return [2 /*return*/];
                }
                console.log('Building your site...');
                return [4 /*yield*/, build_1.default._handler({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(function () { return resolve(''); }, 2000);
                    })];
            case 2:
                _a.sent();
                path = path_1.resolve(process.cwd(), require(path_1.resolve(process.cwd(), './inert.config.js')).build.output);
                http_1.createServer(function (req, res) {
                    try {
                        var filePath_1 = !(fs_1.statSync(path_1.resolve(path, '.' + req.url)).isDirectory()) ? path_1.resolve(path, '.' + req.url) : path_1.resolve(path, '.' + req.url, './index.html');
                        fs_1.readFile(filePath_1, function (err, data) {
                            if (err) {
                                res.writeHead(404);
                                console.log("404 => " + err);
                                res.end(JSON.stringify(err));
                                return;
                            }
                            res.writeHead(200, { 'content-type': mime_types_1.default.lookup(filePath_1) || 'text/plain; charset=utf-8' });
                            res.end(data);
                        });
                    }
                    catch (err) {
                        res.writeHead(404);
                        console.log("404 => " + err);
                        res.end(JSON.stringify(err));
                        return;
                    }
                }).listen(8080, function () {
                    console.log(chalk_1.green('✔︎') + " Serving your site at \u00BB " + chalk_1.cyan("http://localhost:8080/") + " \u00AB");
                });
                return [2 /*return*/];
        }
    });
}); });
exports.default = serveCommand;
