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
/**
 *
 * @export
 * @interface ModelApi
 */
export interface ModelApi {
    /**
     *
     * @type {string}
     * @memberof ModelApi
     */
    id?: any;
    /**
     *
     * @type {WorkspaceMetadata}
     * @memberof ModelApi
     */
    metadata: any;
    /**
     *
     * @type {string}
     * @memberof ModelApi
     */
    state?: ModelApiStateEnum;
    /**
     *
     * @type {ModelApiSpec}
     * @memberof ModelApi
     */
    spec: any;
    /**
     *
     * @type {number}
     * @memberof ModelApi
     */
    uptime?: any;
    /**
     *
     * @type {string}
     * @memberof ModelApi
     */
    createAt?: any;
    /**
     *
     * @type {string}
     * @memberof ModelApi
     */
    lastStart?: any;
    /**
     *
     * @type {string}
     * @memberof ModelApi
     */
    lastUpdate?: any;
}
/**
    * @export
    * @enum {string}
    */
export declare enum ModelApiStateEnum {
    CREATED = "CREATED",
    STARTING = "STARTING",
    RUNNING = "RUNNING",
    STOPPED = "STOPPED"
}
