
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // swagger config
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('App Open API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Swagger UI → http://localhost:3000/swagger
  SwaggerModule.setup('swagger', app, document);

  // also expose JSON → http://localhost:3000/swagger-json
  app.getHttpAdapter().getInstance().get('/swagger-json', (req, res) => {
    res.json(document);
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);

  Logger.log(`🚀 App running at http://localhost:${port}`);
  Logger.log(`📄 Swagger UI: http://localhost:${port}/swagger`);
  Logger.log(`📄 Swagger JSON: http://localhost:${port}/swagger-json`);
}

bootstrap();
