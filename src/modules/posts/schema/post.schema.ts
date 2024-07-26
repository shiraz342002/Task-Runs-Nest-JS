import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

import { Transform } from "class-transformer";
// import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString,  } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";
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
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "title of the Post",
    title: "title",
  })
  @Prop({ type: String, required: false, trim: true })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Description of Post",
    title: "Description",
  })
  @Prop({ type: String, required: false, trim: true })
  description: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Images of the Post',
    type: [],
    example: ['image1.jpg', 'image2.jpg'],
  })
  @Prop({ type: [String], default: [],required:false })
  images: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "City of the Post",
    example: "New York",
  })
  @Prop({ type: String, required: true, trim: true })
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Street Address of the Post",
    example: "123 Main St",
  })
  @Prop({ type: String, required: true, trim: true })
  streetAddress?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "State of the Post",
    example: "NY",
  })
  @Prop({ type: String, required: true, trim: true })
  state?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Zip code of the Poster",
    example: "10001",
  })
  @Prop({ type: String, required: true, trim: true })
  zipCode?: string;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true})
  userId: string;

  @IsBoolean()@IsOptional()
  @Transform(({ value }) => value === "true")
  @ApiProperty()
  @Prop({ type: Boolean, required: false, trim: true })
  isUrgent: boolean;

  @IsBoolean()@IsOptional()
  @Transform(({ value }) => value === "true")
  @ApiProperty()
  @Prop({ type: Boolean, required: false, trim: true })
  isHelpFree: boolean;

  @IsBoolean()@IsOptional()
  @Transform(({ value }) => value === "true")
  @ApiProperty()
  @Prop({ type: Boolean, required: false, trim: true })
  obo: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Prop({ type: String, required: false, trim: true })
  price: string;

  @ApiProperty({
    description: "Coordinates of the location [longitude, latitude]",
    title: "Coordinates",
  })
  
  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };



}

const PostSchema = SchemaFactory.createForClass(PostEntity);
PostSchema.index({ location: "2dsphere" });

// Hooks
PostSchema.virtual("id").get(function (this: PostDocument) {
  return this._id.toString();
});

export { PostSchema };
