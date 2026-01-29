#!/usr/bin/env node

import dotenv from "dotenv";
import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import { login, logout, whoami } from "./commands/auth/login.js";
import { wakeUp } from "./commands/ai/wakeUp.js";


dotenv.config();

async function main() {
    // Display banner
    console.log(
        chalk.cyan(
            figlet.textSync("MindShell CLI", {
                font: "Standard",
                horizontalLayout: "default",
            })
        )
    );
    console.log(chalk.gray("  CLI based AI tool\n"));

    const program = new Command("mindshell");

    program
        .version("1.0.0")
        .description("MindShell CLI - Device Flow Authentication");

    // Add commands
    program.addCommand(login);
    program.addCommand(logout);
    program.addCommand(whoami);
    program.addCommand(wakeUp);

    // Default action shows help
    program.action(() => {
        program.help();
    });

    program.parse();
}

main().catch((error) => {
    console.error(chalk.red("Error running Orbital CLI:"), error);
    process.exit(1);
});

