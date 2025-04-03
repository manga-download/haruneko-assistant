import { mount } from 'svelte';
import App from './components/App.svelte';

mount(App, {
    target: document.getElementById('app')!
});