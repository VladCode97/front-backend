import {IUser} from "../models/user.model";

export type AuthResponseOutput = {
    token: string;
    idDocument: number;
}

export type AuthSignIn = Pick<IUser, "username" | "password">
export type AuthSignUp = Pick<IUser, "username" | "password" | "name" | "role">