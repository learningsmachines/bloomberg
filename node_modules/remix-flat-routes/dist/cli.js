#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const fs_extra_1 = require("fs-extra");
const migrate_1 = require("./migrate");
main();
function main() {
    const argv = process.argv.slice(2);
    if (argv.length < 2) {
        usage();
        process.exit(1);
    }
    const sourceDir = argv[0];
    const targetDir = argv[1];
    if (sourceDir === targetDir) {
        console.error('source and target directories must be different');
        process.exit(1);
    }
    if (!fs.existsSync(sourceDir)) {
        console.error(`source directory '${sourceDir}' does not exist`);
        process.exit(1);
    }
    let options = { convention: 'flat-files', force: false };
    for (let option of argv.slice(2)) {
        if (option === '--force') {
            options.force = true;
            continue;
        }
        if (option.startsWith('--convention=')) {
            let convention = option.substring('--convention='.length);
            if (convention === 'flat-files' ||
                convention === 'flat-folders' ||
                convention === 'hybrid') {
                options.convention = convention;
            }
            else {
                usage();
                process.exit(1);
            }
        }
        else {
            usage();
            process.exit(1);
        }
    }
    if (fs.existsSync(targetDir)) {
        if (!options.force) {
            console.error(`❌ target directory '${targetDir}' already exists`);
            console.error(`   use --force to overwrite`);
            process.exit(1);
        }
        (0, fs_extra_1.removeSync)(targetDir);
    }
    (0, migrate_1.migrate)(sourceDir, targetDir, options);
}
function usage() {
    console.log(`Usage: migrate <sourceDir> <targetDir> [options]

Options:
  --convention=<convention>
    The convention to use when migrating.
      flat-files - Migrates to flat files
      flat-folders - Migrates to flat directories with route.tsx files
      hybrid - Keep folder structure with '+' suffix and _layout files
  --force
    Overwrite target directory if it exists
`);
}
