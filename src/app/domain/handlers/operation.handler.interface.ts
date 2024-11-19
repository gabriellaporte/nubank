import { Operation } from '../value-objects/operation';
import { Portfolio } from '../value-objects/portfolio';

export interface OperationHandler {
  canHandle(operation: Operation): boolean;

  handle(operation: Operation, portfolio: Portfolio): Tax;
}

export type Tax = {
  tax: number;
};
