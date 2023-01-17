<script lang="ts">
    import Control from './Control.svelte';
    import Settings from './Settings.svelte';
</script>

<style>
    :root {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        white-space: nowrap;
        user-select: none;
        width: 24em;
    }
</style>

<main>
    <Settings></Settings>
    <Control></Control>
</main>