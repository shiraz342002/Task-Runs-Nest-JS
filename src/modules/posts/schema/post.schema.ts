import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import {
  JSONSchema,
  validationMetadatasToSchemas,
} from "class-validator-jsonschema";
import mongoose, { Document } from "mongoose";

export type PostDocument = PostEntity & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class PostEntity {
  id: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  @JSONSchema({
    description: "Title of the Post",
    title: "title",
  })
  @Prop({ type: String, required: true, trim: true })
  title: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  @JSONSchema({
    description: "Description of Post",
    title: "Description",
  })
  @Prop({ type: String, required: true, trim: true })
  description: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Images of Post',
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @Prop({ type: [String], default: [] })
  images: string[];

  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Price of the service",
    title: "Price",
  })
  @Prop({ type: Number, required: false })
  price: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Is the task Urgent?",
    title: "Urgent Task",
  })
  @Prop({ type: Boolean, required: false })
  isUrgent: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Street Address of the Poster",
    title: "Street Address"
  })
  @Prop({ type: String, required: false, trim: true })
  streetAddress: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "City of the Poster",
    title: "City"
  })
  @Prop({ type: String, required: false, trim: true })
  city: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "State of the Poster",
    title: "State"
  })
  @Prop({ type: String, required: false, trim: true })
  state: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Zip code of the Poster",
    title: "Zip Code"
  })
  @Prop({ type: String, required: false, trim: true })
  zipcode: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  userId: string;
}

const PostSchema = SchemaFactory.createForClass(PostEntity);
PostSchema.index({ location: "2dsphere" });

// Hooks
PostSchema.virtual("id").get(function (this: PostDocument) {
  return this._id.toString();
});

export { PostSchema };
export const userJsonSchema = validationMetadatasToSchemas();
