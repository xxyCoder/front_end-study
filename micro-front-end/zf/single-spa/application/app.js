import { reroute } from "../navigation/reroute.js";
import { NOT_LOADED } from "./app.helper.js";

export const apps = [];
// 查看路径是否匹配，匹配成功则加载应用
export function registerApplication(appName, loadApp, activeWhen, customProps) {
    const registeration = {
        name: appName,
        loadApp,
        activeWhen,
        customProps,
        status: NOT_LOADED
    };
    apps.push(registeration);

    reroute();  // 重写路由
}