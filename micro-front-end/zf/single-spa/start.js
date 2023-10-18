import { reroute } from "./navigation/reroute.js";

// 开启路径的监控
export let started = false;
export function start() {
    started = true; // 用户启动了
    reroute();
}