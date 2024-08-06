import { Model } from 'mongoose';
import { PermissionDto } from './dto/permission.dto';
import { Permission, PermissionDocument } from './permission.schema';
import { Role, RoleDocument } from './role.schema';
export declare class CaslService {
    private roleModel;
    private permissionModel;
    constructor(roleModel: Model<RoleDocument>, permissionModel: Model<PermissionDocument>);
    findAllPermissionsOfUser(role: any): Promise<Role | null>;
    createPermissionOfUser(permission: PermissionDto): Promise<Permission | null>;
    createRoleOfUser(role: any): Promise<Role | null>;
}
