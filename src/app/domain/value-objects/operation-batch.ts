import { Operation } from './operation';

export class OperationBatch {
  constructor(public readonly operations: Operation[]) {
    if (operations.length === 0) {
      throw new Error('Operation batch must contain at least one operation');
    }

    this.operations = operations.map((rawOperation) =>
      Operation.fromJSON(rawOperation)
    );

    console.log(this.operations);
  }
}
