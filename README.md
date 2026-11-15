# plugin-vue: block sourcemaps ignore `pre` transforms

A `pre` plugin edits `src/App.vue` and returns a correct sourcemap. `App.vue` uses a non-setup `<script lang="ts">`, so plugin-vue loads the script from a separate `?vue&type=script` request.

```sh
npm install
npm run build              # Vite 8: build passes, but dist/assets/*.js.map lists src/App.vue twice
npm i -D vite@7 && npm run build   # Vite 7: "Multiple conflicting contents for sourcemap source .../src/App.vue"
```

With `<script setup lang="ts">`, both builds are correct.
