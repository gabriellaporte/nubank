import { OperationBatch } from '../../domain/value-objects/operation-batch';
import { Portfolio } from '../../domain/value-objects/portfolio';
import {
  BuyOperationHandler,
  OperationHandlerOrchestrator,
  SellOperationHandler,
} from '../handlers';

export class CalculateTaxesForOperationsUseCase {
  private readonly operationHandler: OperationHandlerOrchestrator;

  constructor() {
    const handlers = [new BuyOperationHandler(), new SellOperationHandler()];
    this.operationHandler = new OperationHandlerOrchestrator(handlers);
  }

  execute(operationBatch: OperationBatch): { tax: number }[] {
    const portfolio = new Portfolio();
    return operationBatch.operations.map((operation) =>
      this.operationHandler.process(operation, portfolio)
    );
  }
}
