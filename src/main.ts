import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger()
  const config = app.get(ConfigService)
  const port = parseInt(config.get<string>(SERVER_PORT), 10)|| 4000
  await app.listen(port);
  logger.verbose(`server at http://localhost:${port}`)
}
bootstrap();
