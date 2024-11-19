import { CalculateCommand } from '@/app/adapters/cli/commands/calculate.command';
import { InputReader } from '@/app/adapters/cli/core/input-reader';
import { CapitalGainsController } from '@/app/presentation/controllers/capital-gains.controller';
import { InputParser } from '@/app/adapters/cli/core/input-parser';

jest.mock('../../core/input-reader');
jest.mock('../../core/input-parser');
jest.mock('../../../../presentation/controllers/capital-gains.controller');

describe('CalculateCommand', () => {
  let calculateCommand: CalculateCommand;
  let mockInputReader: jest.Mocked<InputReader>;
  let mockController: jest.Mocked<CapitalGainsController>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockInputReader = new InputReader() as jest.Mocked<InputReader>;
    (InputReader as jest.Mock).mockImplementation(() => mockInputReader);
    (InputParser.parse as jest.Mock).mockImplementation(() => [
      [{ operation: 'buy', 'unit-cost': 10, quantity: 100 }],
    ]);

    mockController = new CapitalGainsController(
      jest.fn() as any
    ) as jest.Mocked<CapitalGainsController>;
    mockController.calculate.mockReturnValue([[{ tax: 0.0 }]]);
    (CapitalGainsController as jest.Mock).mockImplementation(
      () => mockController
    );

    calculateCommand = new CalculateCommand();
  });

  it('should read input, parse it, and call the controller to calculate taxes', async () => {
    const mockedInput = '[{"operation":"buy","unit-cost":10,"quantity":100}]';
    mockInputReader.read.mockResolvedValue(mockedInput);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await calculateCommand.execute();

    expect(mockInputReader.read).toHaveBeenCalledTimes(1);
    expect(InputParser.parse).toHaveBeenCalledWith(mockedInput);
    expect(mockController.calculate).toHaveBeenCalledWith([
      [{ operation: 'buy', 'unit-cost': 10, quantity: 100 }],
    ]);
    expect(consoleSpy).toHaveBeenCalledWith(JSON.stringify([{ tax: 0.0 }]));
    consoleSpy.mockRestore();
  });

  it('should throw an error if InputParser.parse fails', async () => {
    mockInputReader.read.mockResolvedValue(
      '{"operation":"invalid","unit-cost":-10,"quantity":-100}'
    );
    (InputParser.parse as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid JSON input');
    });

    await expect(calculateCommand.execute()).rejects.toThrow(
      'Invalid JSON input'
    );

    expect(mockController.calculate).not.toHaveBeenCalled();
  });
});
