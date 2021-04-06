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
 * @interface WorkspaceSpec
 */
export interface WorkspaceSpec {
    /**
     *
     * @type {string}
     * @memberof WorkspaceSpec
     */
    revision: any;
    /**
     *
     * @type {string}
     * @memberof WorkspaceSpec
     */
    ide: any;
    /**
     *
     * @type {string}
     * @memberof WorkspaceSpec
     */
    environment: any;
    /**
     *
     * @type {string}
     * @memberof WorkspaceSpec
     */
    hardware: any;
    /**
     *
     * @type {Array&lt;WorkspaceSpecDatasets&gt;}
     * @memberof WorkspaceSpec
     */
    datasets?: any;
}
