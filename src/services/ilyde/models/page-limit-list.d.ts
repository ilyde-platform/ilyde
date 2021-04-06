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
 * @interface PageLimitList
 */
export interface PageLimitList {
    /**
     *
     * @type {number}
     * @memberof PageLimitList
     */
    total: any;
    /**
     *
     * @type {number}
     * @memberof PageLimitList
     */
    page: any;
    /**
     *
     * @type {number}
     * @memberof PageLimitList
     */
    limit: any;
    /**
     *
     * @type {Array&lt;DatasetVersion | Dataset | Project | ProjectRevision | Environment | HardwareTier | User | Ide | Experiment | Run | Workspace | ModelApi&gt;}
     * @memberof PageLimitList
     */
    data: any;
}
