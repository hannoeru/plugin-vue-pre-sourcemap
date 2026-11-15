import vue from '@vitejs/plugin-vue'
import MagicString from 'magic-string'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      // Any `pre` plugin that edits the SFC source and returns a correct map.
      name: 'rewrite-sfc',
      enforce: 'pre',
      transform(code, id) {
        if (!id.endsWith('.vue'))
          return
        const s = new MagicString(code)
        s.replace('before', 'after')
        return { code: s.toString(), map: s.generateMap({ source: id, includeContent: true, hires: true }) }
      },
    },
    vue(),
  ],
  build: { sourcemap: true },
})
