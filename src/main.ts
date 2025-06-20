import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  // Enable CORS with detailed configuration
  app.enableCors({
    origin: ['http://localhost:4200', 'https://pay1rupee-challenge.vercel.app','https://www.pay1rupee.co.in/','https://www.pay1rupee.co.in'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app)); // Enable Socket.IO
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads/' });
  
  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);
  console.log(`Backend running on ${port}`);
}
bootstrap();