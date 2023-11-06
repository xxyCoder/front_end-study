/**
 * redirect 是否重定向
 * from 来源地址
 * to 重定向地址
 * exact 是否精准匹配
 * path 匹配的路径
 * component 渲染的组件
 * name 路由名字
 * meta 路由元信息
 * children 子路由
 */

import { lazy } from "react";
import RouterOne from "../views/RouterOne";

const routes = [{
    path: "/one",
    component: RouterOne
}, {
    path: "/two",
    exact: true,
    component: lazy(() => import("../views/RouterTwo"))
}, {
    path: "/three",
    exact: true,
    component: lazy(() => import("../views/RouterThree"))
}, {
    path: "/four",
    exact: true,
    render: () => <div>Four</div>
}, {
    redirect: true,
    to: "/one"
}];

export default routes;