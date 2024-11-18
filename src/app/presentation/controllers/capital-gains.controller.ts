import { Operation } from '../../domain/value-objects/operation';
import { OperationBatch } from '../../domain/value-objects/operation-batch';
import { CalculateTaxesForOperationsUseCase } from '../../application/usecases/calculate-taxes-for-operations.use-case';

export class CapitalGainsController {
  constructor(
    private readonly calculateTaxesUseCase: CalculateTaxesForOperationsUseCase
  ) {}

  calculate(data: Operation[][]): void {
    const response = data.map(async (batch) =>
      this.calculateTaxesUseCase.execute(new OperationBatch(batch))
    );

    console.log(response);
  }
}
