import { registerApplication, start } from "single-spa";

// 注册应用
registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: (location) => location.pathname === "/react",
});

registerApplication({
  name: "@xxy/react",
  app: () =>
    System.import("@xxy/react"),
  activeWhen: (location) => location.pathname === "/react",
});

// registerApplication({
//   name: "@xxy/navbar",
//   app: () => System.import("@xxy/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
