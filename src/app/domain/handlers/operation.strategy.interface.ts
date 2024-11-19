import { Operation, Portfolio } from '../value-objects';

export interface OperationStrategy {
  handle(operation: Operation, portfolio: Portfolio): Tax;
}

export type Tax = {
  tax: number;
};
