import { Portfolio } from '../../domain/value-objects/portfolio';
import { OperationStrategyFactory } from '../strategies';
import { Tax } from '@/app/domain/strategies/operation.strategy.interface';
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
