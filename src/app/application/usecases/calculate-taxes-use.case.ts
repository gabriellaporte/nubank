import { Portfolio } from '../../domain/value-objects/portfolio';
import { OperationStrategyFactory } from '../handlers';
import { Tax } from '../../domain/handlers/operation.strategy.interface';
import { Operation } from '../../domain/value-objects';

export class CalculateTaxesUseCase {
  execute(operationsBatch: Operation[]): Tax[] {
    const portfolio = new Portfolio();
    return operationsBatch.map((op) => {
      const operation = Operation.fromJSON(op);
      const strategy = OperationStrategyFactory.create(operation);
      return strategy.handle(operation, portfolio);
    });
  }
}
