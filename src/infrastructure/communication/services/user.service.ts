import {HttpService} from "./http.service";
import {IUser} from "../../../domain/models/user.model";
import { URL_ENVIROMENT } from "../../../utils/enviroment";

export class UserService {
    private httpService: HttpService;

    constructor() {
        this.httpService = HttpService.Instance;
    }

    async getUsers(): Promise<IUser[]> {
        const {token} = JSON.parse( localStorage.getItem('token')!)
        try {
            return (await this.httpService.get(`${URL_ENVIROMENT}/user/`, token)).data;
        } catch (exception) {
            throw exception;
        }
    }

}