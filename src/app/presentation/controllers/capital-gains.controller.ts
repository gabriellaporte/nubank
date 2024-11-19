import { Operation } from '../../domain/value-objects/operation';
import { OperationBatch } from '../../domain/value-objects/operation-batch';
import { CalculateTaxesForOperationsUseCase } from '../../application/usecases/calculate-taxes-for-operations.use-case';
import { Tax } from '../../domain/handlers/operation.handler.interface';

export class CapitalGainsController {
  constructor(
    private readonly calculateTaxesUseCase: CalculateTaxesForOperationsUseCase
  ) {}

  calculate(data: Operation[][]): Tax[][] {
    return data.map((batch) =>
      this.calculateTaxesUseCase.execute(new OperationBatch(batch))
    );
  }
}
