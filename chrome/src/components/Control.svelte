<script lang="ts">
    import { L } from './localization';
    import { websocket } from './websocket';

    let canSetCloudFlareBypass = true;
    let canLoadMediaContainerFromURL = true;

    async function GetCurrentURL(): Promise<string> {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const tab = tabs.shift();
        return tab?.url ?? '';
    }

    async function SetCloudFlareBypass() {
        try {
            canSetCloudFlareBypass = false;
            canLoadMediaContainerFromURL = false;
            const url = await GetCurrentURL();
            const cookies = (await chrome.cookies.getAll({ url })).filter(cookie => [ '__cf_bm', 'cf_clearance' ].includes(cookie.name));
            cookies.forEach(cookie => delete cookie.expirationDate);
            await $websocket.Connect();
            await $websocket.Remote?.SetCloudFlareBypass(navigator.userAgent, cookies);
        } catch(error) {
            console.warn(error);
        }
        try {
            await $websocket.Disconnect();
        } finally {
            canSetCloudFlareBypass = true;
            canLoadMediaContainerFromURL = true;
        }
    }

    async function LoadMediaContainerFromURL() {
        try {
            canSetCloudFlareBypass = false;
            canLoadMediaContainerFromURL = false;
            const url = await GetCurrentURL();
            await $websocket.Connect();
            await $websocket.Remote?.LoadMediaContainerFromURL(url);
        } catch(error) {
            console.warn(error);
        }
        try {
            await $websocket.Disconnect();
        } finally {
            canSetCloudFlareBypass = true;
            canLoadMediaContainerFromURL = true;
        }
    }
</script>

<style>
    .container {
        gap: 0.75em;
        display: grid;
    }

    button {
        padding: 0.5em;
        text-align: left;
    }

    button > .icon {
        width: 24px;
        margin-right: 0.25em;
        vertical-align: middle;
    }
</style>

<h3>{$L.Controls_Label}</h3>
<div class="container">
    <button type="button" on:click="{SetCloudFlareBypass}" title="{$L.Control_Button_CloudFlareBypass_Description}" disabled={!canSetCloudFlareBypass}>
        <img src="/assets/cloudflare.svg" alt="" class="icon">
        {$L.Control_Button_CloudFlareBypass_Label}
    </button>
    <button type="button" on:click="{LoadMediaContainerFromURL}" title="{$L.Control_Button_LoadMediaContainer_Description}" disabled={!canLoadMediaContainerFromURL}>
        <img src="/assets/mediafolder.svg" alt="" class="icon">
        {$L.Control_Button_LoadMediaContainer_Label}
    </button>
</div>