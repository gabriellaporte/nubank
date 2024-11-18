import { Operation } from '../../domain/value-objects/operation';
import { Portfolio } from '../../domain/value-objects/portfolio';

export interface OperationHandler {
  canHandle(operation: Operation): boolean;

  handle(operation: Operation, portfolio: Portfolio): Tax;
}

export type Tax = {
  tax: number;
};
