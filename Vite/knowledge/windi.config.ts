import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  attributify: true, // 属性化，可以用props的方式定义样式属性
  shortcuts: {
    "flex-c": "flex justify-center items-center",
  }
})