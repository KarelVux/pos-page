import { BaseService } from "../base/BaseService";
import type {IRegisterData} from "@/dto/identity/IRegisterData";
import type {ILoginData} from "@/dto/identity/ILoginData";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";


export class IdentityService extends BaseService {
    constructor() {
        super('v1/identity/account/');
    }

    async register(data: IRegisterData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('register', data);

            console.log('register response', response);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async login(data: ILoginData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('login', data);

            console.log('login response', response);
            if (response.status === 200) {
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async logout(data: IJWTResponse): Promise<true | undefined> {
        console.log(data);

        try {
            const response = await this.axios.post(
                'logout',
                data,
                {
                    headers: {
                        'Authorization': 'Bearer ' + data.jwt
                    }
                }
            );

            console.log('logout response', response);
            if (response.status === 200) {
                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

}