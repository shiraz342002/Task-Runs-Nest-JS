import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { constTexts } from "../../constants";
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostEntity } from "./schema/post.schema";
import { User } from "../user/user.schema";
import { ApiPageOkResponse, Auth, AuthUser } from "src/decorators";
import { Action } from "src/casl/userRoles";
import { UpdatePostDto } from "./dto/posts-update.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptionsPostImages } from "src/configuration/multer.config";


@Controller(constTexts.postRoute.name)
@ApiTags(constTexts.postRoute.name)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @Auth(Action.Create, "Post")
  @ApiResponse({ status: 201, description: 'Post created successfully.' })
  @ApiBody({
    description: 'Post creation data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        streetAddress: { type: 'string' },
        city: { type: 'string' },
        zipCode: { type: 'string' },
        state: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images', 10, multerOptionsPostImages))
  async create(
    @AuthUser() user: User,
    @Body() createDto: PostEntity,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    if (images) {
      createDto.images = images.map(file => file.path);
    }
    createDto.userId = user.id;
    const post = await this.postsService.create(createDto);
    return post;
  }



  @Get()
  @ApiPageOkResponse({
    description: "Get all List",
    type: PostEntity,
  })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  findall(@Query("page") page = 1, @Query("limit") limit = 20) {
    return this.postsService.findall(page, limit);
  }

  @Patch(constTexts.postRoute.update)
  @ApiPageOkResponse({
    description: "Update Post",
    type: PostEntity,
  })

  @Auth(Action.Update, "Update")
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Post Updated successfully.' })
  @ApiBody({
    description: 'Post Updation data',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        title:{type:"string"},
        description:{type:"string"},
        price:{type:"string"},
        isUrgent:{type:"boolean"},
        isHelpFree:{type:"boolean"},
        obo:{type:"boolean"},
        streetAddress: { type: 'string' },
        city: { type: 'string' },
        zipCode: { type: 'string' },
        state: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('images', 10, multerOptionsPostImages))
  async update(@Param("id") id: string,
  @Body() updateDatato: UpdatePostDto,
  @UploadedFiles() images: Express.Multer.File[]
) {
  if (images) {
    UpdatePostDto.images = images.map(file => file.path);
  }
    console.log(updateDatato);
    console.log(id);
    return this.postsService.update(id, updateDatato);
  }

  @Delete(constTexts.postRoute.delete)
  @ApiPageOkResponse({
    description: "Update Post",
    type: PostEntity,
  })
  @Auth(Action.Update, "Post")
  async deletePost(@Param("id") id: string) {
    return this.postsService.deletePost(id);
  }
}
