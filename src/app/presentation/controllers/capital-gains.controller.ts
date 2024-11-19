import { Operation } from '../../domain/value-objects/operation';
import { CalculateTaxesUseCase } from '../../application/usecases/calculate-taxes-use.case';
import { Tax } from '../../domain/handlers/operation.handler.interface';

export class CapitalGainsController {
  constructor(private readonly calculateTaxesUseCase: CalculateTaxesUseCase) {}

  calculate(data: Operation[][]): Tax[][] {
    return data.map((operationsBatch) =>
      this.calculateTaxesUseCase.execute(operationsBatch)
    );
  }
}
