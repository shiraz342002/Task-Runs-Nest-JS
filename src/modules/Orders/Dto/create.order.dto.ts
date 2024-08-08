import { IsNotEmpty, IsDateString, IsMongoId } from 'class-validator';

export class CreateOrderDto {

  @IsNotEmpty()
  @IsMongoId()
  PostId: string;  

  @IsNotEmpty()
  @IsDateString()
  deadline: string; 
}
