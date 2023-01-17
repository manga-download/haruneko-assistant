<script lang="ts">
    import { connection, secret } from './settings';
    import { L } from './localization';
</script>

<style>
    .container {
        gap: 0.75em;
        display: grid;
        align-items: center;
        grid-template-rows: max-content max-content;
        grid-template-columns: max-content auto;
    }

    input[type="text"] {
        padding: 0.5em;
    }
</style>

<h3>{$L.Settings_Label}</h3>
<div class="container">
    <div title="{$L.Setting_Connection_Description}">{$L.Setting_Connection_Label}</div>
    <input type="text" bind:value={$connection}>
    <div title="{$L.Setting_Secret_Description}">{$L.Setting_Secret_Label}</div>
    <input type="text" bind:value={$secret}>
</div>