const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "xxy",
    projectName: "react",
    webpackConfigEnv,
    argv,
  });
  delete defaultConfig.externals  // react和react-dom打包到当前项目
  return merge(defaultConfig, {
    devServer: {
      port: 3000
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
