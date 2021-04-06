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
import { Body4 } from '../models';
import { Body5 } from '../models';
import { Body7 } from '../models';
import { Model } from '../models';
import { ModelVersion } from '../models';
import { PageTokenList } from '../models';
import { Status } from '../models';
/**
 * ModelsApi - axios parameter creator
 * @export
 */
export declare const ModelsApiAxiosParamCreator: (configuration?: Configuration) => {
    /**
     *
     * @summary Create a model
     * @param {Model} body Request payload to create a model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModel: (body: Model, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary Create a model version
     * @param {ModelVersion} body Request payload to create a model version
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModelVersion: (body: ModelVersion, name: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary Delete a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModel: (name: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary delete a model version
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModelVersion: (name: string, version: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary get a model version
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getModelVersion: (name: string, version: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary list versions of a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listModelVersions: (name: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary Retrieve a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveModel: (name: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary Transition model version stage
     * @param {Body4} body
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transitionModelVersionStage: (body: Body4, name: string, version: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary Update a model
     * @param {Body7} body Model object to update
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateModel: (body: Body7, name: string, options?: any) => Promise<RequestArgs>;
    /**
     *
     * @summary update a model version
     * @param {Body5} body
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateModelVersion: (body: Body5, name: string, version: string, options?: any) => Promise<RequestArgs>;
};
/**
 * ModelsApi - functional programming interface
 * @export
 */
export declare const ModelsApiFp: (configuration?: Configuration) => {
    /**
     *
     * @summary Create a model
     * @param {Model} body Request payload to create a model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModel(body: Model, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Model>>;
    /**
     *
     * @summary Create a model version
     * @param {ModelVersion} body Request payload to create a model version
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModelVersion(body: ModelVersion, name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ModelVersion>>;
    /**
     *
     * @summary Delete a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModel(name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Status>>;
    /**
     *
     * @summary delete a model version
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModelVersion(name: string, version: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Status>>;
    /**
     *
     * @summary get a model version
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getModelVersion(name: string, version: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ModelVersion>>;
    /**
     *
     * @summary list versions of a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listModelVersions(name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageTokenList>>;
    /**
     *
     * @summary Retrieve a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveModel(name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Model>>;
    /**
     *
     * @summary Transition model version stage
     * @param {Body4} body
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transitionModelVersionStage(body: Body4, name: string, version: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ModelVersion>>;
    /**
     *
     * @summary Update a model
     * @param {Body7} body Model object to update
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateModel(body: Body7, name: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Model>>;
    /**
     *
     * @summary update a model version
     * @param {Body5} body
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateModelVersion(body: Body5, name: string, version: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ModelVersion>>;
};
/**
 * ModelsApi - factory interface
 * @export
 */
export declare const ModelsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    /**
     *
     * @summary Create a model
     * @param {Model} body Request payload to create a model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModel(body: Model, options?: any): AxiosPromise<Model>;
    /**
     *
     * @summary Create a model version
     * @param {ModelVersion} body Request payload to create a model version
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createModelVersion(body: ModelVersion, name: string, options?: any): AxiosPromise<ModelVersion>;
    /**
     *
     * @summary Delete a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModel(name: string, options?: any): AxiosPromise<Status>;
    /**
     *
     * @summary delete a model version
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteModelVersion(name: string, version: string, options?: any): AxiosPromise<Status>;
    /**
     *
     * @summary get a model version
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getModelVersion(name: string, version: string, options?: any): AxiosPromise<ModelVersion>;
    /**
     *
     * @summary list versions of a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listModelVersions(name: string, options?: any): AxiosPromise<PageTokenList>;
    /**
     *
     * @summary Retrieve a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrieveModel(name: string, options?: any): AxiosPromise<Model>;
    /**
     *
     * @summary Transition model version stage
     * @param {Body4} body
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transitionModelVersionStage(body: Body4, name: string, version: string, options?: any): AxiosPromise<ModelVersion>;
    /**
     *
     * @summary Update a model
     * @param {Body7} body Model object to update
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateModel(body: Body7, name: string, options?: any): AxiosPromise<Model>;
    /**
     *
     * @summary update a model version
     * @param {Body5} body
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateModelVersion(body: Body5, name: string, version: string, options?: any): AxiosPromise<ModelVersion>;
};
/**
 * ModelsApi - object-oriented interface
 * @export
 * @class ModelsApi
 * @extends {BaseAPI}
 */
export declare class ModelsApi extends BaseAPI {
    /**
     *
     * @summary Create a model
     * @param {Model} body Request payload to create a model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    createModel(body: Model, options?: any): Promise<import("axios").AxiosResponse<Model>>;
    /**
     *
     * @summary Create a model version
     * @param {ModelVersion} body Request payload to create a model version
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    createModelVersion(body: ModelVersion, name: string, options?: any): Promise<import("axios").AxiosResponse<ModelVersion>>;
    /**
     *
     * @summary Delete a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    deleteModel(name: string, options?: any): Promise<import("axios").AxiosResponse<Status>>;
    /**
     *
     * @summary delete a model version
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    deleteModelVersion(name: string, version: string, options?: any): Promise<import("axios").AxiosResponse<Status>>;
    /**
     *
     * @summary get a model version
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    getModelVersion(name: string, version: string, options?: any): Promise<import("axios").AxiosResponse<ModelVersion>>;
    /**
     *
     * @summary list versions of a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    listModelVersions(name: string, options?: any): Promise<import("axios").AxiosResponse<PageTokenList>>;
    /**
     *
     * @summary Retrieve a model
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    retrieveModel(name: string, options?: any): Promise<import("axios").AxiosResponse<Model>>;
    /**
     *
     * @summary Transition model version stage
     * @param {Body4} body
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    transitionModelVersionStage(body: Body4, name: string, version: string, options?: any): Promise<import("axios").AxiosResponse<ModelVersion>>;
    /**
     *
     * @summary Update a model
     * @param {Body7} body Model object to update
     * @param {string} name The unique name of the model
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    updateModel(body: Body7, name: string, options?: any): Promise<import("axios").AxiosResponse<Model>>;
    /**
     *
     * @summary update a model version
     * @param {Body5} body
     * @param {string} name The unique name of the model
     * @param {string} version The version of the model to retrieve
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ModelsApi
     */
    updateModelVersion(body: Body5, name: string, version: string, options?: any): Promise<import("axios").AxiosResponse<ModelVersion>>;
}
