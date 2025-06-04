import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      logging: true,
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'pay1rupee',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      ssl: {
        rejectUnauthorized: false, // Required for Supabase
      },
    }),
    PaymentModule,
  ],
})
export class AppModule {}

