import { defineConfig } from 'vite'

export default defineConfig({
    optimizeDeps: {
        exclude: [] // 哪些模块不需要预处理
    }
})