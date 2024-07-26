
  // @IsString()
  // @MinLength(1)
  // @ApiProperty({
  //   description: "Title of the Post",
  //   example: "My Awesome Post",
  // })
  // @Prop({ type: String, required: false, trim: true })
  // title: string;

  // @IsString()
  // @MinLength(1)
  // @ApiProperty({
  //   description: "Description of the Post",
  //   example: "This is a detailed description of the post.",
  // })
  // @Prop({ type: String, required: false, trim: true })
  // description: string;

   // @ApiProperty({
  //   description: "Coordinates of the location [longitude, latitude]",
  //   type: 'object',
  //   example: { type: "Point", coordinates: [0, 0] },
  // })
  // @Prop({ type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] })
  // location: {
  //   type: string;
  //   coordinates: [number, number];
  // };

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty({
  //   description: "Is the task Urgent?",
  //   example: false,
  // })
  // @Transform(({ value }) => value === "true")
  // @Prop({ type: Boolean, required: false })
  // isUrgent?: boolean;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty({
  //   description: "Is the task Help Free?",
  //   example: true,
  // })
  // @Transform(({ value }) => value === "true")
  // @Prop({ type: Boolean, required: false })
  // isHelpFree?: boolean;

  // @IsBoolean()
  // @IsOptional()
  // @ApiProperty({
  //   description: "Or Best Offer",
  //   example: false,
  // })
  // @Transform(({ value }) => value === "true")
  // @Prop({ type: Boolean, required: false })
  // obo?: boolean;

  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   description: "Price of the service",
  //   example: "$100",
  // })
  // @Prop({ type: String, required: false })
  // price?: string;