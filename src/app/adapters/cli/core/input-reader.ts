import * as readline from 'node:readline';

export class InputReader {
  /**
   * Reads input from stdin until an empty line or EOF (Ctrl+D).
   * @returns Input data as a string.
   */
  public async read(): Promise<string> {
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
}
