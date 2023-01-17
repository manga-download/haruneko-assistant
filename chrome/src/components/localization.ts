import { readable } from 'svelte/store';

type Locale = typeof en;

const en = {
    Settings_Label: 'Settings',
    Setting_Connection_Label: 'Connection',
    Setting_Connection_Description: 'Enter the WebSocket connection to the running HakuNeko instance (can be found in HakuNeko settings)',
    Setting_Secret_Label: 'Secret',
    Setting_Secret_Description: 'Enter the secret passphrase for the WebSocket connection to the running HakuNeko instance (can be found in HakuNeko settings)',
    Controls_Label: 'Actions',
    Control_Button_CloudFlareBypass_Label: 'Bypass CloudFlare',
    Control_Button_CloudFlareBypass_Description: 'Instruct the running HakuNeko instance to use the current browser cookies to bypass CloudFlare for this website',
    Control_Button_LoadMediaContainer_Label: 'Open Media-Container',
    Control_Button_LoadMediaContainer_Description: 'Instruct the running HakuNeko instance to load and list the media entries for the current website'
};

const locales: Record<string, Locale> = {
    'en': en,
    'en-US': {
        ...en
    }
};

const locale = navigator.languages.filter(code => code in locales).map(code => locales[code]).shift() ?? en;
export const L = readable<Locale>(locale);