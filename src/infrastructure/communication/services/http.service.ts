import Axios, {AxiosResponse} from 'axios';

export class HttpService {
    private static httpService: HttpService;

    private constructor() {
    }

    static get Instance(): HttpService {
        if (HttpService.httpService === undefined) {
            HttpService.httpService = new HttpService();
        }
        return HttpService.httpService;
    }

    get(url: string, token?: string): Promise<AxiosResponse> {
        return Axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

    post<T>(url: string, data: T, token?: string) {
        return Axios.post(url, {...data}, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }

    delete<T>(url: string, token?: string) {
        return Axios.delete(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
    }    

}