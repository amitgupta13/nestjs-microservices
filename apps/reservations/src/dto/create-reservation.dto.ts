import { IsDateString, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsString()
  placeId: string;

  @IsString()
  invoiceId: string;
}
