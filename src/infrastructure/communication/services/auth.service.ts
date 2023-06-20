import {HttpService} from "./http.service";
import {AuthResponseOutput, AuthSignIn, AuthSignUp} from "../../../domain/types/auth.type";
import { URL_ENVIROMENT } from "../../../utils/enviroment";

export class AuthService {
    private httpService: HttpService;

    constructor() {
        this.httpService = HttpService.Instance;
    }

    async signIn(user: AuthSignIn): Promise<AuthResponseOutput> {
        try {
            const response = await (this.httpService.post<AuthSignIn>(`${URL_ENVIROMENT}/auth/signIn`, user));
            return response.data;
        } catch (exception) {
            throw exception;
        }
    }

    async signUp(user: AuthSignUp) {
        try {
            const response = await (this.httpService.post<AuthSignUp>(`${URL_ENVIROMENT}/auth/signUp`, user));
            return response.data;
        } catch (exception) {
            throw exception;
        }
    }

}