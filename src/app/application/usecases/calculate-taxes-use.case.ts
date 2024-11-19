import { Portfolio } from '../../domain/value-objects/portfolio';
import { OperationHandlerFactory } from '../handlers';
import { Tax } from '../../domain/handlers/operation.handler.interface';
import { Operation } from '../../domain/value-objects';

export class CalculateTaxesUseCase {
  execute(operationsBatch: Operation[]): Tax[] {
    const portfolio = new Portfolio();
    return operationsBatch.map((op) => {
      const operation = Operation.fromJSON(op);
      const handler = OperationHandlerFactory.create(operation);
      return handler.handle(operation, portfolio);
    });
  }
}
