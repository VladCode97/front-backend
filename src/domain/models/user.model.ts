import {IAggregate} from "./aggregate.model";
import {RoleEnum} from "../enum/role.enum";


export interface IUser extends IAggregate {
    name: string;
    password: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    role: RoleEnum;
}