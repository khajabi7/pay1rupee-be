import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Razorpay from 'razorpay';
//import * as Razorpay from 'razorpay';
import { Payment } from './payment.entity';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
//import { Multer } from 'multer'; // Add this import
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private razorpay = new Razorpay({
    key_id: this.configService.get<string>('RAZORPAY_KEY_ID'),
    key_secret: this.configService.get<string>('RAZORPAY_KEY_SECRET')
  });

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private configService: ConfigService // Inject ConfigService
  ) {}

  async createOrder() {
    console.log('Creating Razorpay order...');
    try {
        
      const options = {
        amount: 100,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      };
      const order = await this.razorpay.orders.create(options);
      console.log('Order created successfully:', order);
      return { orderId: order.id };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create Razorpay order');
    }
  }

  async verifyPayment(data: { paymentId: string; orderId: string; signature: string }) {
    const existingPayment = await this.paymentRepository.findOne({ where: { transactionId: data.paymentId } });
    if (existingPayment) return { success: false, message: 'Payment already processed' };

    const generatedSignature = crypto
      .createHmac('sha256', '8untlWrLNyGBcyKSlICnrVbJ')
      .update(`${data.orderId}|${data.paymentId}`)
      .digest('hex');

    if (generatedSignature !== data.signature) return { success: false, message: 'Invalid payment signature' };

    const payment = this.paymentRepository.create({
      transactionId: data.paymentId,
      amount: 1.0,
      status: 'success',
    });
    await this.paymentRepository.save(payment);
    return { success: true };
  }

  async getPaymentCount() {
    const count = await this.paymentRepository.count({ where: { status: 'success' } });
    console.log('DB count:', count); // debug
    return { totalCount: count };
  }

  // async uploadVideo(file: Multer.File): Promise<{ url: string }> {
  //   const uploadDir = path.join(__dirname, '..', '..', 'Uploads');
  //   if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  //   const filePath = path.join(uploadDir, `${Date.now()}-${file.originalname}`);
  //   fs.writeFileSync(filePath, file.buffer);
  //   const url = `http://localhost:3000/uploads/${path.basename(filePath)}`;
  //   return { url };
  // }

  // async uploadVideo(file: Express.Multer.File): Promise<{ url: string }> {
  //   const uploadDir = path.join(__dirname, '..', '..', 'uploads');
  //   if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  //   const filePath = path.join(uploadDir, `${Date.now()}-${file.originalname}`);
  //   fs.writeFileSync(filePath, file.buffer);
  //   const url = `http://localhost:3000/uploads/${path.basename(filePath)}`;
  //   return { url };
  // }

  async getVideos(): Promise<{ urls: string[] }> {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) return { urls: [] };
    const files = fs.readdirSync(uploadDir).filter(file => file.endsWith('.mp4')); // Adjust extension as needed
    const urls = files.map(file => `http://localhost:3000/uploads/${file}`);
    return { urls };
  }
}