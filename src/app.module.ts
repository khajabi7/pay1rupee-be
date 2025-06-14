import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      logging: ['error', 'query', 'schema'],
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // Disable sync in production
      ssl: {
        rejectUnauthorized: false, // Bypass certificate validation
      },
      logger: 'advanced-console',
      extra: {
        connectionTimeoutMillis: 5000,
        max: 10, // Connection pool size
        family: 4, // Force IPv4 for Render
      },
    }),
    PaymentModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('DB Config:', {
      url: process.env.DATABASE_URL,
      ssl: process.env.PGSSLMODE,
      family: 4,
    });
  }
}