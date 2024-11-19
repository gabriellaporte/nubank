import { CapitalGainsController } from '../../../presentation/controllers/capital-gains.controller';
import { CalculateTaxesUseCase } from '../../../application/usecases/calculate-taxes.use-case';
import { InputReader } from '../core/input-reader';
import { InputParser } from '../core/input-parser';
import { Command } from '../commands/command.interface';
import { Portfolio } from '@/app/domain/value-objects';

export class CalculateCommand implements Command {
  private readonly controller: CapitalGainsController;

  constructor() {
    const portfolio = new Portfolio();
    const useCase = new CalculateTaxesUseCase(portfolio);
    this.controller = new CapitalGainsController(useCase);
  }

  public async execute(): Promise<void> {
    const inputReader = new InputReader();
    const input = await inputReader.read();

    const data = InputParser.parse(input);
    const taxes = this.controller.calculate(data);
    console.log('\n');
    taxes.forEach((batch) => console.log(JSON.stringify(batch)));
  }
}
