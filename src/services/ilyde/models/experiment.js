"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentStateEnum = void 0;
/**
    * @export
    * @enum {string}
    */
var ExperimentStateEnum;
(function (ExperimentStateEnum) {
    ExperimentStateEnum["CREATED"] = "CREATED";
    ExperimentStateEnum["STARTING"] = "STARTING";
    ExperimentStateEnum["RUNNING"] = "RUNNING";
    ExperimentStateEnum["ABORTED"] = "ABORTED";
    ExperimentStateEnum["SUCCEEDED"] = "SUCCEEDED";
    ExperimentStateEnum["FAILED"] = "FAILED";
})(ExperimentStateEnum = exports.ExperimentStateEnum || (exports.ExperimentStateEnum = {}));
