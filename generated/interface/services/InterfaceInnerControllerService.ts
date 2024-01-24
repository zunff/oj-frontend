/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InterfaceInfo } from '../models/InterfaceInfo';
import type { InvokeCountRequest } from '../models/InvokeCountRequest';
import type { UserInterfaceInfo } from '../models/UserInterfaceInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InterfaceInnerControllerService {

    /**
     * getByUrlAndMethod
     * @param method method
     * @param url url
     * @returns InterfaceInfo OK
     * @throws ApiError
     */
    public static getByUrlAndMethodUsingGet(
method: string,
url: string,
): CancelablePromise<InterfaceInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/interface/inner/get/url/method',
            query: {
                'method': method,
                'url': url,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getUserInterfaceInfo
     * @param accessKey accessKey
     * @param interfaceId interfaceId
     * @returns UserInterfaceInfo OK
     * @throws ApiError
     */
    public static getUserInterfaceInfoUsingGet(
accessKey: string,
interfaceId: number,
): CancelablePromise<UserInterfaceInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/interface/inner/user/get/accessKey/interfaceId',
            query: {
                'accessKey': accessKey,
                'interfaceId': interfaceId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * invokeCount
     * @param invokeCountRequest invokeCountRequest
     * @returns boolean OK
     * @returns any Created
     * @throws ApiError
     */
    public static invokeCountUsingPost(
invokeCountRequest: InvokeCountRequest,
): CancelablePromise<boolean | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/inner/user/invoke/count',
            body: invokeCountRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * saveUserInterfaceInfo
     * @param userInterfaceInfo userInterfaceInfo
     * @returns boolean OK
     * @returns any Created
     * @throws ApiError
     */
    public static saveUserInterfaceInfoUsingPost(
userInterfaceInfo: UserInterfaceInfo,
): CancelablePromise<boolean | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/inner/user/save',
            body: userInterfaceInfo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateUserInterfaceInfoById
     * @param userInterfaceInfo userInterfaceInfo
     * @returns boolean OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserInterfaceInfoByIdUsingPost(
userInterfaceInfo: UserInterfaceInfo,
): CancelablePromise<boolean | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/inner/user/update/id',
            body: userInterfaceInfo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
