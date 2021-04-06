"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStateEnum = exports.ProjectTemplateEnum = exports.ProjectVisibilityEnum = void 0;
/**
    * @export
    * @enum {string}
    */
var ProjectVisibilityEnum;
(function (ProjectVisibilityEnum) {
    ProjectVisibilityEnum["PRIVATE"] = "PRIVATE";
    ProjectVisibilityEnum["PUBLIC"] = "PUBLIC";
})(ProjectVisibilityEnum = exports.ProjectVisibilityEnum || (exports.ProjectVisibilityEnum = {}));
/**
    * @export
    * @enum {string}
    */
var ProjectTemplateEnum;
(function (ProjectTemplateEnum) {
    ProjectTemplateEnum["GENERIC"] = "GENERIC";
})(ProjectTemplateEnum = exports.ProjectTemplateEnum || (exports.ProjectTemplateEnum = {}));
/**
    * @export
    * @enum {string}
    */
var ProjectStateEnum;
(function (ProjectStateEnum) {
    ProjectStateEnum["OPEN"] = "OPEN";
    ProjectStateEnum["CLOSED"] = "CLOSED";
})(ProjectStateEnum = exports.ProjectStateEnum || (exports.ProjectStateEnum = {}));
