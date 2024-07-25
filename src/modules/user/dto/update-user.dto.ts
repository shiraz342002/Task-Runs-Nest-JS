import { ApiProperty, PartialType } from "@nestjs/swagger";
import { JSONSchema } from "class-validator-jsonschema";
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { Prop } from "@nestjs/mongoose";
import { UserUpdateDto } from "src/modules/auth/dto/user.update.dto";

export class UpdateUserDto extends PartialType(UserUpdateDto)
 {
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @ApiProperty()
  @IsOptional()
  @JSONSchema({
    description: "Name of User",
    title: "Name",
  })
  @Prop({ type: "string", trim: true, required: true})
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @JSONSchema({
    description: "Email of User",
    title: "Email",
  })
  @Prop({
    type: "string",
    required: false,
    trim: true,
    lowercase: true,
    default: "",
  })
  email: string;

  @IsString()
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsOptional()
  @JSONSchema({
    description: "Password of User",
    title: "Password",
  })
  @Prop({ type: "string", trim: true, required: false, default: "" })
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(5)
  @JSONSchema({
    description: "Information about User",
    title: "About",
  })

  @Prop({ type: "string", default: "" })
  about: string;
  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  @JSONSchema({
    description: "Avatar of User",
    title: "Avatar",
  })
  @Prop({ type: "string", trim: true, default: "" })
  avatar: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  @JSONSchema({
    description: "phone",
    title: "phone",
  })
  @Prop({ type: "string", trim: true, default: "" })
  phone?: string;

  @IsString()
  @ApiProperty()
  @MinLength(3)
  @IsOptional()
  @JSONSchema({
    description:"Address of the User",
    title:"Address"
  })
  @Prop({type:"string",trim:true,required:false})
  address?:string;

  @IsString()
  @ApiProperty()
  @MinLength(2)
  @IsOptional()
  @JSONSchema({
    description:"Profession of the User",
    title:"Profession"
  })
  @Prop({type:"string",trim:true,required:false})
  profession?:string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @JSONSchema({
    description:"Zip Code",
    title:"Zip Code"
  })
  @Prop({type:"string",trim:true,required:false,default:""})
  zip_code?:number;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @MinLength(2)
  @JSONSchema({
    description:"City of the User",
    title:"City"
  })
  @Prop({type:"string",trim:true,required:false,default:""})
  city?:string;

}
