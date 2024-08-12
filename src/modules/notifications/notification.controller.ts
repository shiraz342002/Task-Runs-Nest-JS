import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { constTexts } from "src/constants";
import { NotificationService } from "./notification.service";
import { User } from "../user/schema/user.schema";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { Auth } from "src/decorators";
import { Action } from "src/casl/userRoles";

@Controller(constTexts.notificationRoute.name)
@ApiTags(constTexts.notificationRoute.name)
export class NotificationController {
    constructor(private readonly notificationService:NotificationService){}
    @Auth(Action.Read, "User")
    @Get(constTexts.notificationRoute.viewMyNotification)
    async getMyNotification(
    @AuthUser() user: User,
    ):Promise<any>{
    const notifications=await this.notificationService.getMyNotification(user.id)
    return notifications
    }

        
}