import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-11-20.acacia',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  createCharge({ amount }: CreateChargeDto) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      payment_method: 'pm_card_visa',
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
  }
}
