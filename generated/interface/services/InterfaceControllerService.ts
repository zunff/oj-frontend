/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ExecuteCodeResponse_ } from '../models/BaseResponse_ExecuteCodeResponse_';
import type { BaseResponse_InterfaceInfo_ } from '../models/BaseResponse_InterfaceInfo_';
import type { BaseResponse_InterfaceInfoVO_ } from '../models/BaseResponse_InterfaceInfoVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_InterfaceInfo_ } from '../models/BaseResponse_Page_InterfaceInfo_';
import type { BaseResponse_Page_InterfaceInfoVO_ } from '../models/BaseResponse_Page_InterfaceInfoVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { InterfaceInfoAddRequest } from '../models/InterfaceInfoAddRequest';
import type { InterfaceInfoQueryRequest } from '../models/InterfaceInfoQueryRequest';
import type { InterfaceInfoUpdateRequest } from '../models/InterfaceInfoUpdateRequest';
import type { OnlineInvokeApiRequest } from '../models/OnlineInvokeApiRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InterfaceControllerService {

    /**
     * addInterfaceInfo
     * @param interfaceInfoAddRequest interfaceInfoAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addInterfaceInfoUsingPost(
interfaceInfoAddRequest: InterfaceInfoAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/add',
            body: interfaceInfoAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteInterfaceInfo
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteInterfaceInfoUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getInterfaceInfoById
     * @param id id
     * @returns BaseResponse_InterfaceInfo_ OK
     * @throws ApiError
     */
    public static getInterfaceInfoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_InterfaceInfo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/interface/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getInterfaceInfoVOById
     * @param id id
     * @returns BaseResponse_InterfaceInfoVO_ OK
     * @throws ApiError
     */
    public static getInterfaceInfoVoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_InterfaceInfoVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/interface/get/vo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listInterfaceInfoByPage
     * @param interfaceInfoQueryRequest interfaceInfoQueryRequest
     * @returns BaseResponse_Page_InterfaceInfo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listInterfaceInfoByPageUsingPost(
interfaceInfoQueryRequest: InterfaceInfoQueryRequest,
): CancelablePromise<BaseResponse_Page_InterfaceInfo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/list/page',
            body: interfaceInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listInterfaceInfoVOByPage
     * @param interfaceInfoQueryRequest interfaceInfoQueryRequest
     * @returns BaseResponse_Page_InterfaceInfoVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listInterfaceInfoVoByPageUsingPost(
interfaceInfoQueryRequest: InterfaceInfoQueryRequest,
): CancelablePromise<BaseResponse_Page_InterfaceInfoVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/list/page/vo',
            body: interfaceInfoQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * onlineInvokeApi
     * @param onlineInvokeApiRequest onlineInvokeApiRequest
     * @returns BaseResponse_ExecuteCodeResponse_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static onlineInvokeApiUsingPost(
onlineInvokeApiRequest: OnlineInvokeApiRequest,
): CancelablePromise<BaseResponse_ExecuteCodeResponse_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/online/invoke',
            body: onlineInvokeApiRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateInterfaceInfo
     * @param interfaceInfoUpdateRequest interfaceInfoUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateInterfaceInfoUsingPost(
interfaceInfoUpdateRequest: InterfaceInfoUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/interface/update',
            body: interfaceInfoUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
