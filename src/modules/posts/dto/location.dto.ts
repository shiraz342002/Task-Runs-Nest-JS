import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
    @ApiProperty({
        description: 'Geolocation coordinates of the post',
        type: 'object',
        properties: {
          type: {
            type: 'string',
            example: 'Point',
            description: 'The type of the location',
          },
          coordinates: {
            type: 'array',
            items: { type: 'number' },
            example: [-74.0060, 40.7128],
            description: 'Array of coordinates: [longitude, latitude]',
          },
        },
      })
      location: {
        type: string;
        coordinates: [number, number];
      };

  @ApiProperty({
    description: 'Radius in meters to search within.',
    example: 5000,
  })
  @IsNumber()
  radius: number;
}
