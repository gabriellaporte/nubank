import { Operation } from '@/app/domain/value-objects';
import { BUY_TYPE, SELL_TYPE } from '@/app/shared/constants';
import {
  BuyOperationStrategy,
  OperationStrategyFactory,
  SellOperationStrategy,
} from '@/app/application/strategies';

describe('OperationStrategyFactory', () => {
  describe('create', () => {
    it('should return BuyOperationStrategy for "buy" type operations', () => {
      const operation = new Operation(BUY_TYPE, 10, 100);

      const strategy = OperationStrategyFactory.create(operation);

      expect(strategy).toBeInstanceOf(BuyOperationStrategy);
    });

    it('should return SellOperationStrategy for "sell" type operations', () => {
      const operation = new Operation(SELL_TYPE, 10, 100);

      const strategy = OperationStrategyFactory.create(operation);

      expect(strategy).toBeInstanceOf(SellOperationStrategy);
    });

    it('should throw an error for unsupported operation types', () => {
      const unsupportedOperation = {
        type: 'invalid',
        unitCost: 10,
        quantity: 100,
      } as Operation;

      expect(() =>
        OperationStrategyFactory.create(unsupportedOperation)
      ).toThrow('No strategy found for operation type: invalid');
    });
  });
});
