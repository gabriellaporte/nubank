import { Operation } from '../../domain/value-objects/operation';
import { Portfolio } from '../../domain/value-objects/portfolio';
import { OperationHandler } from './';

export class OperationHandlerOrchestrator {
  constructor(private readonly handlers: OperationHandler[]) {}

  process(operation: Operation, portfolio: Portfolio): { tax: number } {
    const handler = this.handlers.find((h) => h.canHandle(operation));
    if (!handler) {
      throw new Error(`No handler found for operation type: ${operation.type}`);
    }

    return handler.handle(operation, portfolio);
  }
}
