import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config';
import viteDevConfig from './vite.dev.config';
import viteProConfig from './vite.pro.config';

const envResolver = {
    "build": () => Object.assign({}, viteBaseConfig, viteProConfig),
    "serve": () => Object.assign({}, viteBaseConfig, viteDevConfig)
}

export default defineConfig(({ command }) => {
    return envResolver[command]();
})