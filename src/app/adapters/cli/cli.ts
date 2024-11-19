import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CalculateCommand } from './commands/calculate.command';
import { Command } from './commands/command.interface';

export class CLI {
  private readonly commands: Record<string, Command> = {};

  constructor() {
    this.registerCommand('calculate', new CalculateCommand());
  }

  /**
   * Configures and initializes the CLI application.
   */
  async configure(): Promise<void> {
    const cli = yargs(hideBin(process.argv))
      .scriptName('capital-gains')
      .usage('$0 <command>')
      .help()
      .alias('help', 'h')
      .version('1.0.0')
      .alias('version', 'v')
      .strict();

    Object.keys(this.commands).forEach((command) => {
      cli.command(
        command,
        this.commands[command].constructor.name,
        (yargs: Argv) => yargs,
        async () => await this.commands[command].execute()
      );
    });

    await cli.parse();
  }

  /**
   * Registers a new command for the CLI.
   * @param name Command name.
   * @param command Command implementation.
   */
  private registerCommand(name: string, command: Command): void {
    this.commands[name] = command;
  }
}
