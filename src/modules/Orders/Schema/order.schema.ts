import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  TaskAssignedBy: Types.ObjectId; 

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  TaskAssignedTo: Types.ObjectId; 

  @Prop({ required: true, type: Types.ObjectId, ref: 'PostEntity' })
  PostId: Types.ObjectId; 

  @Prop({ required: true, type: Boolean, default: false })
  isCompleted: boolean; 

  @Prop({ required: false, type: Date })
  deadline: Date;  
}

export const OrderSchema = SchemaFactory.createForClass(Order);
