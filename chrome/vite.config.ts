import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    plugins: [ svelte() ],
    build: {
        minify: 'esbuild',
    },
    esbuild: {
        minifySyntax: true,
        minifyWhitespace: true,
        minifyIdentifiers: false,
        keepNames: true,
    },
});