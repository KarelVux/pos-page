import {BaseService} from "@/services/base/BaseService";
import type {IJWTResponse} from "@/dto/identity/IJWTResponse";


export default class ImageHandlerService extends BaseService {
    constructor() {
        super('/images/');
    }


    async uploadFile(jwtData: IJWTResponse, fileData: File): Promise<undefined> {
        try {

            const formData = new FormData();
            formData.append('file', fileData);

            const response = await this.axios.post('http://localhost:5009/api/v1/images/upload', formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwtData.jwt
                    }
                }
            );

            if (response.status === 200) {
                console.log( 'Image uploaded successfully.');
            } else {
                console.log('Failed to upload image.');
            }

            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }


/*
        try {
            const formData = new FormData();
            formData.append('file', fileData);

            const response = await fetch('http://localhost:5009/api/v1/images/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.status == 200) {
                console.log( 'Image uploaded successfully.');
            } else {
                console.log( 'Failed to upload image.');
            }
        } catch (error) {
            console.error(error);
            console.error ('An error occurred during the image upload.');
        }
        */
    }

}