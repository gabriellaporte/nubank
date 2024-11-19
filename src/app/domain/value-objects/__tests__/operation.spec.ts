import { Operation } from '../operation';
import { BUY_TYPE, SELL_TYPE } from '@/app/shared/constants';

describe('Operation', () => {
  describe('constructor and properties', () => {
    it('should correctly initialize with valid parameters', () => {
      const operation = new Operation(BUY_TYPE, 10, 100);

      expect(operation.type).toBe(BUY_TYPE);
      expect(operation.unitCost).toBe(10);
      expect(operation.quantity).toBe(100);
    });

    it('should throw an error for invalid operation type', () => {
      expect(() => new Operation('invalid', 10, 100)).toThrow(
        `Operation type must be "${BUY_TYPE}" or "${SELL_TYPE}"`
      );
    });

    it('should throw an error if unitCost is less than or equal to 0', () => {
      expect(() => new Operation(BUY_TYPE, 0, 100)).toThrow(
        'Unit cost must be greater than zero'
      );

      expect(() => new Operation(BUY_TYPE, -5, 100)).toThrow(
        'Unit cost must be greater than zero'
      );
    });

    it('should throw an error if quantity is less than or equal to 0', () => {
      expect(() => new Operation(BUY_TYPE, 10, 0)).toThrow(
        'Quantity must be greater than zero'
      );

      expect(() => new Operation(BUY_TYPE, 10, -50)).toThrow(
        'Quantity must be greater than zero'
      );
    });
  });

  describe('fromJSON', () => {
    it('should correctly create an Operation from valid JSON', () => {
      const json = { operation: BUY_TYPE, 'unit-cost': 10, quantity: 100 };
      const operation = Operation.fromJSON(json);

      expect(operation.type).toBe(BUY_TYPE);
      expect(operation.unitCost).toBe(10);
      expect(operation.quantity).toBe(100);
    });

    it('should throw an error if the JSON is invalid', () => {
      const json = { operation: 'invalid', 'unit-cost': -10, quantity: -100 };

      expect(() => Operation.fromJSON(json)).toThrow(
        `Operation type must be "${BUY_TYPE}" or "${SELL_TYPE}"`
      );
    });
  });

  describe('calculateNetProceeds', () => {
    it('should calculate net proceeds correctly when unitCost is greater than averagePrice', () => {
      const operation = new Operation(SELL_TYPE, 20, 100);
      const netProceeds = operation.calculateNetProceeds(10);

      expect(netProceeds).toBe(1000);
    });

    it('should calculate net proceeds correctly when unitCost is less than averagePrice', () => {
      const operation = new Operation(SELL_TYPE, 10, 100);
      const netProceeds = operation.calculateNetProceeds(20);

      expect(netProceeds).toBe(-1000);
    });

    it('should calculate net proceeds as 0 when unitCost equals averagePrice', () => {
      const operation = new Operation(SELL_TYPE, 10, 100);
      const netProceeds = operation.calculateNetProceeds(10);

      expect(netProceeds).toBe(0);
    });
  });
});
