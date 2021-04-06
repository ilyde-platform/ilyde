"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunStateEnum = void 0;
/**
    * @export
    * @enum {string}
    */
var RunStateEnum;
(function (RunStateEnum) {
    RunStateEnum["CREATED"] = "CREATED";
    RunStateEnum["STARTING"] = "STARTING";
    RunStateEnum["RUNNING"] = "RUNNING";
    RunStateEnum["ABORTED"] = "ABORTED";
    RunStateEnum["SUCCEEDED"] = "SUCCEEDED";
    RunStateEnum["FAILED"] = "FAILED";
})(RunStateEnum = exports.RunStateEnum || (exports.RunStateEnum = {}));
