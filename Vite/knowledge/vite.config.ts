import { defineConfig, normalizePath } from 'vite'
import autoprefixer from 'autoprefixer'
import windi from "vite-plugin-windicss";
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr';
import viteImagemin from 'vite-plugin-imagemin';

export const config = {
  root: path.join(__dirname, 'src'), // 项目根目录
}

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    windi(),
    svgr(),
    viteImagemin({
      svgo: {
        plugins: [{
          name: "removeViewBox"
        },{
          name: "removeEmptyAttrs",
          active: false
        }]
      }
    })
  ],
  // css相关配置
  css: {
    // 预设
    preprocessorOptions: {
      scss: {
        // 会为每个scss文件开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    // 模块化
    modules: {
      generateScopedName: "[name]_[local]_[hash:base64:5]"
    },
    // postcss
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  build: {
    assetsInlineLimit: 6 * 1024
  }
})
