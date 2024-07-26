import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { constTexts } from "../../constants";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { PostEntity } from "./schema/post.schema";
import { User } from "../user/user.schema";
import { ApiPageOkResponse, Auth, AuthUser } from "src/decorators";
import { Action } from "src/casl/userRoles";
import { UpdatePostDto } from "./dto/posts-update.dto";

@Controller(constTexts.postRoute.name)
@ApiTags(constTexts.postRoute.name)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiPageOkResponse({
    description: "Create Post",
    type: PostEntity,
  })
  @Auth(Action.Create, "Post")
  async create(@AuthUser() user: User, @Body() createDto: PostEntity) {
    createDto.userId = user.id;
    return this.postsService.create(createDto);
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
  @Auth(Action.Update, "Post")
  async update(@Param("id") id: string, @Body() updateDatato: UpdatePostDto) {
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
