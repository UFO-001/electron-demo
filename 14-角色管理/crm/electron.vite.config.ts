import path, { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
//自动导入elementPlus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { tr } from 'element-plus/es/locale'

const publicDir = resolve('resources')
const envDir = resolve('build')

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    publicDir,
    envDir,
    envPrefix:'RENDERER_',//环境变量的前缀
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@router': resolve('src/renderer/src/router'),
        '@views':resolve('src/renderer/src/views'),
        '@store':resolve('src/renderer/src/store'),
        '@hooks':resolve('src/renderer/src/hooks'),
        '@utils':resolve('src/renderer/src/utils'),
        '@api':resolve('src/renderer/src/api'),
        '@config':resolve('src/renderer/src/config'),
        '@type':resolve('src/renderer/src/type'),
        '@layout':resolve('src/renderer/src/layout')
      }
    },
    server:{
      "proxy":{
        "/api":{
          target:'http://uat.crm.xuexiluxian.cn',
          changeOrigin:true,
          rewrite:path => path.replace(/^\/api/,'')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
})
