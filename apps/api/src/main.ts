import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  // Debug Railway environment variables
  console.log('==============================');
  console.log('Environment Variables');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('PORT:', process.env.PORT);
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('JWT_ACCESS_SECRET:', process.env.JWT_ACCESS_SECRET);
  console.log('JWT_REFRESH_SECRET:', process.env.JWT_REFRESH_SECRET);
  console.log('WEB_ORIGIN:', process.env.WEB_ORIGIN);
  console.log('==============================');

  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: process.env.WEB_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Northbeam API')
    .setDescription(
      'Authentication, Accounts, and Transactions API for Northbeam',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT) || 4000;

  await app.listen(port);

  console.log(`🚀 Northbeam API running on port ${port}`);
  console.log(`📚 Swagger Docs: /docs`);
}

bootstrap();