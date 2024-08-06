import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { COA } from '../model/coa.schema';
export declare class COASeeder implements Seeder {
    private readonly coa;
    constructor(coa: Model<COA>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
