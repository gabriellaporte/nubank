import yargs from 'yargs';
import { CLI } from '../cli';
import { Command } from '../commands/command.interface';

jest.mock('yargs');

describe('CLI', () => {
  let cli: CLI;

  class MockCommand implements Command {
    execute = jest.fn().mockResolvedValue(undefined);
  }

  beforeEach(() => {
    jest.clearAllMocks();
    cli = new CLI();
  });

  describe('configure', () => {
    it('should register commands dynamically with yargs', async () => {
      const mockYargsInstance = {
        scriptName: jest.fn().mockReturnThis(),
        usage: jest.fn().mockReturnThis(),
        help: jest.fn().mockReturnThis(),
        alias: jest.fn().mockReturnThis(),
        version: jest.fn().mockReturnThis(),
        strict: jest.fn().mockReturnThis(),
        command: jest.fn().mockReturnThis(),
        parse: jest.fn().mockResolvedValue(undefined),
      };
      (yargs as unknown as jest.Mock).mockReturnValue(mockYargsInstance);

      const mockCommand = new MockCommand();
      cli['commands']['testCommand'] = mockCommand;

      await cli.configure();

      const commandCallback = mockYargsInstance.command.mock.calls[0][2];
      const mockYargsArgv = {};
      const result = commandCallback(mockYargsArgv);
      expect(result).toBe(mockYargsArgv);
    });

    it('should execute a registered command dynamically', async () => {
      const mockYargsInstance = {
        scriptName: jest.fn().mockReturnThis(),
        usage: jest.fn().mockReturnThis(),
        help: jest.fn().mockReturnThis(),
        alias: jest.fn().mockReturnThis(),
        version: jest.fn().mockReturnThis(),
        strict: jest.fn().mockReturnThis(),
        command: jest
          .fn()
          .mockImplementation((name, desc, builder, handler) => {
            if (name === 'testCommand') {
              handler();
            }
            return mockYargsInstance;
          }),
        parse: jest.fn().mockResolvedValue(undefined),
      };

      (yargs as unknown as jest.Mock).mockReturnValue(mockYargsInstance);

      const mockCommand = new MockCommand();
      cli['commands']['testCommand'] = mockCommand;

      await cli.configure();

      expect(mockCommand.execute).toHaveBeenCalledTimes(1);
    });
  });
});
