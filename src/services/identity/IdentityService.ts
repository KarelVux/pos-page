import {BaseService} from "@/services/base/BaseService";
import type {IRegisterData} from "@/dto/identity/IRegisterData";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import type {ILoginData} from "@/dto/identity/ILoginData";
import {useIdentityStore} from "@/stores/identityStore";

export class IdentityService extends BaseService {
    constructor() {
        super('v1/identity/account/');
    }

    identityStore = useIdentityStore();

    async register(data: IRegisterData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('register', data);

            console.log('register response', response);
            if (response.status === 200) {
                this.identityStore.$state.authenticationJwt = response.data;
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
                this.identityStore.$state.authenticationJwt = response.data;
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
                this.identityStore.$state.authenticationJwt = undefined;

                return true;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async refreshToken(data: IJWTResponse): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>(
                'refreshtoken',
                data
            );

            console.log('refresh token response', response);
            if (response.status === 200) {
                this.identityStore.$state.authenticationJwt  = response.data;
                return response.data;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

}