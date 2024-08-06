import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { User } from '../model/user.schema';
export declare class UsersSeeder implements Seeder {
    private readonly user;
    constructor(user: Model<User>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
