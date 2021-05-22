import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Configuration
const SERVER_PORT = parseInt(process.env.PORT, 10) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  await app.listen(SERVER_PORT);

  logger.verbose(`The server is running on port: ${SERVER_PORT}`);
}
bootstrap();
