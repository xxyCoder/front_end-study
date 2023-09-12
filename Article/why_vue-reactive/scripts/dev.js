const { build } = require('esbuild');
const { resolve } = require('path');
const argv = require('minimist')(process.argv.slice(2));

// 获取参数minimist
const target = argv['_'];
const format = argv['f'];

const pkg = require(resolve(__dirname, '../packages/reactivity/package.json'));

const outputFormat = format.startWith("global") ? 'iife' : format.startWith("cjs") ? "cjs" : "esm";

// 打包输出文件
const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${outputFormat}.js`);

// 调用ESbuild的NodeApi执行打包
build({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    bundle: true, // 将所有依赖打包进入
    sourcemap: true, // 是否需要sourceMap
    format: outputFormat, // 输出文件格式 IIFE、CJS、ESM
    globalName: pkg.buildOptions?.name, // 打包后全局注册的变量名 IIFE下生效
    platform: outputFormat === 'cjs' ? 'node' : 'browser', // 平台
    watch: true, // 表示检测文件变动重新打包
});