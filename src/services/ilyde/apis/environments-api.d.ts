/**
 * Ilyde Apis
 * OpenApi interface which exposes Ilyde resources to frontends
 *
 * OpenAPI spec version: 0.2.0
 * Contact: alessiofiorentino@hopenly.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
import { RequestArgs, BaseAPI } from '../base';
import { HardwareTier } from '../models';
import { PageLimitList } from '../models';
import { Status } from '../models';
/**
 * EnvironmentsApi - axios parameter creator
 * @export
 */
export declare const EnvironmentsApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     *
     * @summary Create HardwareTier
     * @param {HardwareTier} body HardwareTier payload
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createHardwaretier: (body: HardwareTier, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary Delete HardwareTier
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteHardwaretier: (id: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary List available compute environments
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listEnvironments: (limit?: number, page?: number, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary List available HardwareTiers
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listHardwaretiers: (limit?: number, page?: number, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary List available Ide for workspaces
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listIde: (limit?: number, page?: number, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary Retrieve HardwareTier
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveHardwaretier: (id: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary Update HardwareTier
     * @param {HardwareTier} body HardwareTier payload
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateHardwaretier: (body: HardwareTier, id: string, options?: any) => Promise<RequestArgs>;
};
/**
 * EnvironmentsApi - functional programming interface
 * @export
 */
export declare const EnvironmentsApiFp: (configuration?: Configuration) => {
    /**
     *
     * @summary Create HardwareTier
     * @param {HardwareTier} body HardwareTier payload
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createHardwaretier(body: HardwareTier, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HardwareTier>>;
    /**
     *
     * @summary Delete HardwareTier
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteHardwaretier(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Status>>;
    /**
     *
     * @summary List available compute environments
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listEnvironments(limit?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageLimitList>>;
    /**
     *
     * @summary List available HardwareTiers
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listHardwaretiers(limit?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageLimitList>>;
    /**
     *
     * @summary List available Ide for workspaces
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listIde(limit?: number, page?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageLimitList>>;
    /**
     *
     * @summary Retrieve HardwareTier
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveHardwaretier(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HardwareTier>>;
    /**
     *
     * @summary Update HardwareTier
     * @param {HardwareTier} body HardwareTier payload
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateHardwaretier(body: HardwareTier, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HardwareTier>>;
};
/**
 * EnvironmentsApi - factory interface
 * @export
 */
export declare const EnvironmentsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     *
     * @summary Create HardwareTier
     * @param {HardwareTier} body HardwareTier payload
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createHardwaretier(body: HardwareTier, options?: any): AxiosPromise<HardwareTier>;
    /**
     *
     * @summary Delete HardwareTier
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteHardwaretier(id: string, options?: any): AxiosPromise<Status>;
    /**
     *
     * @summary List available compute environments
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listEnvironments(limit?: number, page?: number, options?: any): AxiosPromise<PageLimitList>;
    /**
     *
     * @summary List available HardwareTiers
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listHardwaretiers(limit?: number, page?: number, options?: any): AxiosPromise<PageLimitList>;
    /**
     *
     * @summary List available Ide for workspaces
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listIde(limit?: number, page?: number, options?: any): AxiosPromise<PageLimitList>;
    /**
     *
     * @summary Retrieve HardwareTier
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveHardwaretier(id: string, options?: any): AxiosPromise<HardwareTier>;
    /**
     *
     * @summary Update HardwareTier
     * @param {HardwareTier} body HardwareTier payload
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateHardwaretier(body: HardwareTier, id: string, options?: any): AxiosPromise<HardwareTier>;
};
/**
 * EnvironmentsApi - object-oriented interface
 * @export
 * @class EnvironmentsApi
 * @extends {BaseAPI}
 */
export declare class EnvironmentsApi extends BaseAPI {
    /**
     *
     * @summary Create HardwareTier
     * @param {HardwareTier} body HardwareTier payload
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EnvironmentsApi
     */
    createHardwaretier(body: HardwareTier, options?: any): Promise<import("axios").AxiosResponse<HardwareTier>>;
    /**
     *
     * @summary Delete HardwareTier
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EnvironmentsApi
     */
    deleteHardwaretier(id: string, options?: any): Promise<import("axios").AxiosResponse<Status>>;
    /**
     *
     * @summary List available compute environments
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EnvironmentsApi
     */
    listEnvironments(limit?: number, page?: number, options?: any): Promise<import("axios").AxiosResponse<PageLimitList>>;
    /**
     *
     * @summary List available HardwareTiers
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EnvironmentsApi
     */
    listHardwaretiers(limit?: number, page?: number, options?: any): Promise<import("axios").AxiosResponse<PageLimitList>>;
    /**
     *
     * @summary List available Ide for workspaces
     * @param {number} [limit]
     * @param {number} [page]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EnvironmentsApi
     */
    listIde(limit?: number, page?: number, options?: any): Promise<import("axios").AxiosResponse<PageLimitList>>;
    /**
     *
     * @summary Retrieve HardwareTier
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EnvironmentsApi
     */
    retrieveHardwaretier(id: string, options?: any): Promise<import("axios").AxiosResponse<HardwareTier>>;
    /**
     *
     * @summary Update HardwareTier
     * @param {HardwareTier} body HardwareTier payload
     * @param {string} id The ID of the hardware resource
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EnvironmentsApi
     */
    updateHardwaretier(body: HardwareTier, id: string, options?: any): Promise<import("axios").AxiosResponse<HardwareTier>>;
}
