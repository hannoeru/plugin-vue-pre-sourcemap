# plugin-vue: block sourcemaps ignore `pre` transforms

A `pre` plugin edits `src/App.vue` and returns a correct sourcemap. `App.vue` uses a non-setup `<script lang="ts">`, so plugin-vue loads the script from a separate `?vue&type=script` request.

```sh
npm install
npm run build   # Vite 8: build passes, but one src/App.vue entry in the sourcemap holds the transformed text
node -e "const fs=require('fs');const f=fs.readdirSync('dist/assets').find(f=>f.endsWith('.js.map'));const m=JSON.parse(fs.readFileSync('dist/assets/'+f));const disk=fs.readFileSync('src/App.vue','utf8');m.sources.forEach((s,i)=>s.endsWith('App.vue')&&console.log(s,'matches disk:',m.sourcesContent[i]===disk))"
# prints one entry with "matches disk: false"

npm i -D vite@7 && npm run build   # Vite 7: "Multiple conflicting contents for sourcemap source .../src/App.vue"
```

With `<script setup lang="ts">`, both builds are correct.
