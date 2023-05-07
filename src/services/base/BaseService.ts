import Axios, {AxiosError} from 'axios';
import type {AxiosResponse, AxiosRequestConfig, AxiosInstance} from 'axios';
import {IdentityService} from "@/services/identity/IdentityService";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";
import {useIdentityStore} from "@/stores/identityStore";

export abstract class BaseService {
    private static hostBaseURL = 'http://localhost:5009/api/';
    protected axios: AxiosInstance;


    constructor(baseUrl: string) {

        this.axios = Axios.create(
            {
                baseURL: BaseService.hostBaseURL + baseUrl,
                headers: {
                    common: {
                        'Content-Type': 'application/json'
                    }
                }
            }
        );

        this.axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2));
            return request;
        });

        const identityStore = useIdentityStore();

        this.axios.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log('Received response', JSON.stringify(response, null, 2));

                return response;
            },
            async (error: AxiosError) => {
                if (error.response?.status === 401) {
                    console.error("Refreshing JWT");

                    const identityService = new IdentityService();
                    const refreshedJwt = await identityService.refreshToken(identityStore.$state.authenticationJwt as IJWTResponse);
                    if (refreshedJwt) {

                        console.log("JWT was successfully  refreshed")
                        identityStore.$state.authenticationJwt = refreshedJwt;

                        const config = error.config as AxiosRequestConfig | undefined;
                        if (config) {
                            config.headers!.Authorization = 'Bearer ' + refreshedJwt.jwt;
                            console.log("Sending previously failed request")
                            return this.axios.request(config);
                        }

                        /*
                                                error.config!.headers.Authorization = 'Bearer ' + refreshedJwt.jwt;

                                                console.log("Sending previously failed request")
                                                return this.axios.request(error.config)

                                                */
                    }

                    return Promise.reject(error);
                }
            }
        )
    }
}


