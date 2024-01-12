/**
 * interface Options {
 *  filter: Regex,
 *  namespace?: string
 * }
 */

let envPlugin = {
  name: 'env',
  setup(build) {
    // 控制路径解析
    build.onResolve({ filters: /^env$/ }, args => ({
      path: args.path,
      namespace: 'env-ns'
    }))
    // 控制内容加载
    build.onLoad({ filters: /.*/, namespace: 'env-us' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json'
    }))
  }
}

require('esbuild').build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'out.js',
  plugins: [envPlugin]
}).catch(() => process.exit(1))