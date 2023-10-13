import Module from "./module";
import { forEachValue } from "./utils";

export default class ModuleCollection {
    constructor(rootModule) {
        this.root = null;
        this.register(rootModule, []);
    }
    register(rawModule, path) {
        const newModule = new Module(rawModule);
        if (path.length === 0) {    // 说明是根模块
            this.root = newModule;
        } else {
            const parent = path.slice(0, -1).reduce((module, current) => {
                return module.getChild(current);
            }, this.root)
            parent.addChild(path[path.length - 1], newModule);
        }

        if (rawModule.modules) {
            forEachValue(rawModule.modules, (rawChildModule, key) => {
                this.register(rawChildModule, path.concat(key));
            })
        }
    }
}