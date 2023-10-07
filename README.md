# HakuNeko Assistant

Browser extensions to interact with your running [HakuNeko](https://github.com/manga-download/haruneko) instance.
- Bypass CloudFlare
- Open Media-Containers

## Installation

...

### Chrome/Edge

- Download the latest extension from [GitHub](https://github.com/manga-download/haruneko-assistant/releases)
- Extract the content of the Extension (Zip Archive)
- Open Chrome/Edge and switch to the Extension Manager
- Enable Developer Mode and Load the unpacked Extension from its Directory

## Build/Bundle Chrome Extension

- Run `npm run build --workspaces`
- Install a version of chromium with e.g., `npx playwright-chromium install` and use the [Command Line](https://developer.chrome.com/docs/extensions/mv3/linux_hosting/#package-through-command-line)
- Pack the Extension directly from the Browser's Extension Manager