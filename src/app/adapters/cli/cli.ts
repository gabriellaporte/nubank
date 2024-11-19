import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as readline from 'node:readline';
import { CapitalGainsController } from '../../presentation/controllers/capital-gains.controller';
import { CalculateTaxesUseCase } from '../../application/usecases/calculate-taxes-use.case';

export class CLI {
  async configure(): Promise<void> {
    yargs(hideBin(process.argv))
      .scriptName('capital-gains')
      .usage('$0 <command>')
      .command(
        'calculate',
        'Calculate taxes for capital gains',
        (yargs: Argv) => yargs, // No additional options
        async () => await this.run()
      )
      .help()
      .alias('help', 'h')
      .version('1.0.0')
      .alias('version', 'v')
      .strict()
      .parse();
  }

  private async run() {
    const usecase = new CalculateTaxesUseCase();
    const controller = new CapitalGainsController(usecase);
    const input = await this.readStdin();
    const data = this.parseInput(input);

    const taxes = controller.calculate(data);
    taxes.forEach((batch) => {
      console.log(JSON.stringify(batch));
    });
  }

  /**
   * Reads input from stdin until an empty line or EOF (Ctrl+D).
   * @returns Input data as a string.
   */
  private async readStdin(): Promise<string> {
    console.log(
      'Please enter your input (submit an empty line or press Ctrl+D to finish):'
    );

    return new Promise((resolve, reject) => {
      const lines: string[] = [];
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.on('line', (line) => {
        if (line.trim() === '') {
          rl.close();
        } else {
          lines.push(line);
        }
      });

      rl.on('close', () => {
        resolve(lines.join('\n').trim());
      });

      rl.on('error', (err) => {
        reject(err);
      });
    });
  }

  /**
   * Parses and validates input string as JSON.
   * @param input Input string.
   * @returns Parsed JSON array.
   * @throws Error if the input is not valid JSON.
   */
  private parseInput(input: string): any[] {
    try {
      return JSON.parse(`[${input.replace(/\n/g, ',')}]`);
    } catch {
      throw new Error('Invalid JSON input. Please provide valid JSON data.');
    }
  }
}
