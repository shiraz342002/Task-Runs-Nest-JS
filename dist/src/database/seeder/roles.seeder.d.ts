import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Role } from '../model/role.schema';
export declare class RoleSeeder implements Seeder {
    private readonly role;
    constructor(role: Model<Role>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
