import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

function getAllValidationMessages(errors: ValidationError[]): string {
  const messages: string[] = [];

  const traverse = (errorList: ValidationError[]) => {
    for (const error of errorList) {
      if (error.constraints) {
        messages.push(...Object.values(error.constraints));
      }

      if (error.children && error.children.length > 0) {
        traverse(error.children);
      }
    }
  };

  traverse(errors);

  return messages.join(', ');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const value = getAllValidationMessages(errors);

        return new BadRequestException(value);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}

void bootstrap();
