export class InputParser {
  /**
   * Parses and validates input string as JSON.
   * @param input Input string.
   * @returns Parsed JSON array.
   * @throws Error if the input is not valid JSON.
   */
  public static parse(input: string): any[] {
    try {
      return JSON.parse(`[${input.replace(/\n/g, ',')}]`);
    } catch {
      throw new Error('Invalid JSON input. Please provide valid JSON data.');
    }
  }
}
