import { CLI } from './app/adapters/cli/cli';

async function bootstrap() {
  const cli = new CLI();
  await cli.configure();
}

bootstrap().catch((err) => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});
