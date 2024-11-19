import { InputParser } from '../input-parser';

describe('InputParser', () => {
  describe('parse', () => {
    it('should parse a single batch of operations correctly', () => {
      const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000}]`;

      const result = InputParser.parse(input);

      expect(result).toEqual([
        [
          { operation: 'buy', 'unit-cost': 10, quantity: 10000 },
          { operation: 'sell', 'unit-cost': 20, quantity: 5000 },
        ],
      ]);
    });

    it('should parse multiple batches of operations correctly', () => {
      const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000}]\n[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000}]`;

      const result = InputParser.parse(input);

      expect(result).toEqual([
        [
          { operation: 'buy', 'unit-cost': 10, quantity: 10000 },
          { operation: 'sell', 'unit-cost': 20, quantity: 5000 },
        ],
        [
          { operation: 'buy', 'unit-cost': 10, quantity: 10000 },
          { operation: 'sell', 'unit-cost': 20, quantity: 5000 },
        ],
      ]);
    });

    it('should throw an error for invalid JSON input', () => {
      const invalidInput = `
      {"operation":"buy","unit-cost":10,"quantity":100,
      {"operation":"sell","unit-cost":15,"quantity":50}
      `;

      expect(() => InputParser.parse(invalidInput)).toThrow(
        'Invalid JSON input. Please provide valid JSON data.'
      );
    });

    it('should return an empty array for empty input', () => {
      const input = ``;

      const result = InputParser.parse(input);

      expect(result).toEqual([]);
    });
  });
});
