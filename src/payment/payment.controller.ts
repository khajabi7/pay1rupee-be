import { Controller, Post, Get, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaymentService } from './payment.service';
//import { Multer } from 'multer';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-order')
  async createOrder() {
    return this.paymentService.createOrder();
  }

  @Post('verify')
  async verifyPayment(@Body() data: { paymentId: string; orderId: string; signature: string }) {
    return this.paymentService.verifyPayment(data);
  }

  @Get('count')
  async getCount() {
    return this.paymentService.getPaymentCount();
  }

  // @Post('upload-video')
  // @UseInterceptors(FileInterceptor('video'))
  // async uploadVideo(@UploadedFile() file: Multer.File) {
  //   return this.paymentService.uploadVideo(file);
  // }

  // @Post('upload-video')
  // @UseInterceptors(FileInterceptor('video'))
  // async uploadVideo(@UploadedFile() file: Express.Multer.File) {
  //   return this.paymentService.uploadVideo(file);
  // }

  @Get('videos')
  async getVideos() {
    return this.paymentService.getVideos();
  }
}