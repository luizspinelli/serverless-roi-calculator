import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'ROI Calculator API - Ready to calculate your serverless ROI!'
  }
}
