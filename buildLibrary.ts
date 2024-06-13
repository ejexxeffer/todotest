import path, { resolve } from 'path'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

import { build } from 'vite'
import { exec } from 'child_process'

const envDir = './env'
const envPrefix = 'APP'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
async function buildLibrary() {
  await build({
    root: resolve(__dirname, './src'),
    base: '/foo/',
    build: {
      outDir: '../dist',
      lib: {
        entry: resolve(__dirname, 'src/components/DatePicker/index.ts'),
        name: 'datepickertest',
        fileName: (format) => `datepickertest.${format}.ts`
      },
      reportCompressedSize: true,
      emptyOutDir: true,
      rollupOptions: {
        external: ['vue', './public/*'],
        output: {
          globals: {
            exports: 'named',
            vue: 'Vue'
          }
        }
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    envDir,
    envPrefix
  })
}

function buildTypesDeclaration() {
  exec('vue-tsc -p tsconfig.build-lib.json --declaration --emitDeclarationOnly')
}

async function main() {
  buildTypesDeclaration()
  await buildLibrary()
}

main()
