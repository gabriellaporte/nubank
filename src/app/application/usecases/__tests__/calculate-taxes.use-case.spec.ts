import { CalculateTaxesUseCase } from '@/app/application/usecases/calculate-taxes.use-case';
import { Operation, Portfolio } from '@/app/domain/value-objects';
import {
  BuyOperationStrategy,
  OperationStrategyFactory,
  SellOperationStrategy,
} from '@/app/application/strategies';

jest.mock('@/app/application/strategies/operation.strategy.factory');
jest.mock('@/app/domain/value-objects/portfolio');
jest.mock('@/app/domain/value-objects/operation');

describe('CalculateTaxesUseCase', () => {
  let sut: CalculateTaxesUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    sut = new CalculateTaxesUseCase();
  });

  describe('execute', () => {
    it('should calculate taxes for a batch of operations', () => {
      const rawOperations = [
        { operation: 'buy', 'unit-cost': 10, quantity: 100 },
        { operation: 'sell', 'unit-cost': 15, quantity: 50 },
      ];

      const mockBuyOperation = new Operation('buy', 10, 100);
      const mockSellOperation = new Operation('sell', 15, 50);

      jest
        .spyOn(Operation, 'fromJSON')
        .mockReturnValueOnce(mockBuyOperation)
        .mockReturnValueOnce(mockSellOperation);

      const mockBuyStrategy = new BuyOperationStrategy();
      const mockSellStrategy = new SellOperationStrategy();

      jest
        .spyOn(OperationStrategyFactory, 'create')
        .mockImplementationOnce(() => mockBuyStrategy)
        .mockImplementationOnce(() => mockSellStrategy);

      jest.spyOn(mockBuyStrategy, 'handle').mockReturnValue({ tax: 0 });
      jest.spyOn(mockSellStrategy, 'handle').mockReturnValue({ tax: 200 });

      const result = sut.execute(rawOperations as unknown as Operation[]);

      expect(result).toEqual([{ tax: 0 }, { tax: 200 }]);
      expect(Operation.fromJSON).toHaveBeenCalledTimes(2);
      expect(OperationStrategyFactory.create).toHaveBeenCalledTimes(2);
      expect(mockBuyStrategy.handle).toHaveBeenCalledWith(
        mockBuyOperation,
        expect.any(Portfolio)
      );
      expect(mockSellStrategy.handle).toHaveBeenCalledWith(
        mockSellOperation,
        expect.any(Portfolio)
      );
    });

    it('should handle empty operations batch gracefully', () => {
      const result = sut.execute([]);

      expect(result).toEqual([]);
      expect(Operation.fromJSON).not.toHaveBeenCalled();
      expect(OperationStrategyFactory.create).not.toHaveBeenCalled();
    });
  });
});
