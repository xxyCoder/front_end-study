/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: ["src/index.js", "src/util.js"],
  output: [{ // 多产物配置
    dir: "dist/es",
    format: "esm"
  }, {
    dir: "dist/cjs",
    format: "cjs"
  }]
}

export default buildOptions