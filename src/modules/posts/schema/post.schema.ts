import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  MinLength,
  // ValidateNested,
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
    description: "title of the Post",
    title: "title",
  })
  @Prop({ type: "string", required: true, trim: true })
  title: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  @JSONSchema({
    description: "Description of Post",
    title: "Description",
  })
  @Prop({ type: "string", required: true, trim: true })
  description: string;

  @IsOptional()
  @ApiProperty()
  @JSONSchema({
    description: "Images of Post",
    title: "Images",
    type: "array",
    items: {
      type: "string",
    },
  })
  @Prop({ type: [{ type: String, trim: true }] })
  image: string[];
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
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
//console.log('schemas=>', JSON.stringify(userJsonSchema)); logger , exclude fileds, test cases
