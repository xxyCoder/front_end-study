import { defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './vite.base.config';
import viteDevConfig from './vite.dev.config';
import viteProConfig from './vite.pro.config';

const envResolver = {
    "build": () => Object.assign({}, viteBaseConfig, viteProConfig),
    "serve": () => Object.assign({}, viteBaseConfig, viteDevConfig)
}

export default defineConfig(({ command, mode }) => {

    const env = loadEnv(mode, process.cwd(), "");   // 第三个参数为文件名，默认为 .env
    console.log("env:", env);
    return envResolver[command]();
})