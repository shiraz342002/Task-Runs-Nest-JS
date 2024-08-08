import { PickType } from '@nestjs/swagger';
import { PostEntity } from '../schema/post.schema';

export class CreatePostDto extends PickType(PostEntity, [
  'title',
  'description',
  'price',
  'obo',
  'location',
  'isUrgent',
  'isHelpFree',
  'streetAddress',
  'city',
  'zipCode',
  'state',
  'images',
  'userId',
] as const) {}
