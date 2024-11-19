import { OperationBatch } from '../../domain/value-objects/operation-batch';
import { Portfolio } from '../../domain/value-objects/portfolio';
import { OperationHandlerFactory } from '../handlers';

export class CalculateTaxesForOperationsUseCase {
  execute(operationBatch: OperationBatch): { tax: number }[] {
    const portfolio = new Portfolio();
    return operationBatch.operations.map((operation) =>
      OperationHandlerFactory.create(operation).handle(operation, portfolio)
    );
  }
}
