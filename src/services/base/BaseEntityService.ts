import {BaseService} from "./BaseService";
import type {IBaseEntity} from "@/dto/management/IBaseEntity";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import type {AxiosError} from "axios";
import {IdentityService} from "@/services/identity/IdentityService";

export abstract class BaseEntityService<TEntity extends IBaseEntity> extends BaseService {
    constructor(
        baseUrl: string,
    ) {
        super(baseUrl);
    }

    async getAll(jwtData: IJWTResponse): Promise<TEntity[] | undefined> {
        try {
            const response = await this.axios.get<TEntity[]>('',
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtData.jwt
                    }
                }
            );

            console.log('response', response);
            if (response.status === 200) {
                return response.data;
            }

            return undefined;
        } catch (e) {
       /*     console.log('error: ', (e as Error).message, e);
            if ((e as AxiosError).response?.status === 401) {
                console.error("JWT expired, refreshing!");
                // try to refresh the jwt
                const identityService = new IdentityService();
                const refreshedJwt = await identityService.refreshToken(jwtData);
                if (refreshedJwt) {
                    this.setJwtResponse(refreshedJwt);

                    const response = await this.axios.get<TEntity[]>('',
                        {
                            headers: {
                                'Authorization': 'Bearer ' + refreshedJwt.jwt
                            }
                        }
                    );
                    if (response.status === 200) {
                        return response.data;
                    }
                }
            }*/
            return undefined;
        }
    }
}