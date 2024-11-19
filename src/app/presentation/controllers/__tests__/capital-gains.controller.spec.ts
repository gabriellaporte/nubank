import { CapitalGainsController } from '@/app/presentation/controllers/capital-gains.controller';
import { CalculateTaxesUseCase } from '@/app/application/usecases/calculate-taxes.use-case';
import { Operation } from '@/app/domain/value-objects';
import { Tax } from '@/app/domain/strategies/operation.strategy.interface';

jest.mock('@/app/application/usecases/calculate-taxes.use-case');

describe('CapitalGainsController', () => {
  let controller: CapitalGainsController;
  let mockCalculateTaxesUseCase: jest.Mocked<CalculateTaxesUseCase>;

  beforeEach(() => {
    mockCalculateTaxesUseCase =
      new CalculateTaxesUseCase() as jest.Mocked<CalculateTaxesUseCase>;
    jest.clearAllMocks();
    controller = new CapitalGainsController(mockCalculateTaxesUseCase);
  });

  describe('calculate', () => {
    it('should delegate calculation to CalculateTaxesUseCase and return the results', () => {
      const operationsBatch1: Operation[] = [
        new Operation('buy', 10, 100),
        new Operation('sell', 20, 50),
      ];
      const operationsBatch2: Operation[] = [
        new Operation('buy', 15, 200),
        new Operation('sell', 25, 100),
      ];

      const mockResult1: Tax[] = [{ tax: 0 }, { tax: 200 }];
      const mockResult2: Tax[] = [{ tax: 0 }, { tax: 500 }];

      jest
        .spyOn(mockCalculateTaxesUseCase, 'execute')
        .mockImplementationOnce(() => mockResult1)
        .mockImplementationOnce(() => mockResult2);

      const data = [operationsBatch1, operationsBatch2];
      const result = controller.calculate(data);

      expect(result).toEqual([mockResult1, mockResult2]);
      expect(mockCalculateTaxesUseCase.execute).toHaveBeenCalledTimes(2);
      expect(mockCalculateTaxesUseCase.execute).toHaveBeenCalledWith(
        operationsBatch1
      );
      expect(mockCalculateTaxesUseCase.execute).toHaveBeenCalledWith(
        operationsBatch2
      );
    });

    it('should handle an empty data set gracefully', () => {
      const data: Operation[][] = [];
      const result = controller.calculate(data);

      expect(result).toEqual([]);
      expect(mockCalculateTaxesUseCase.execute).not.toHaveBeenCalled();
    });
  });
});
