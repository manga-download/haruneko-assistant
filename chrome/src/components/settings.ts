import { writable } from 'svelte/store';

const fallback = {
    connection: 'ws://localhost:27544/hakuneko',
    secret: 'Connection#Secret'
};

// TODO: get/set settings in chrome.storage.sync

export const connection = writable<string>();
connection.set(localStorage.getItem('connection') ?? fallback.connection);
connection.subscribe(value => localStorage.setItem('connection', value));

export const secret = writable<string>();
secret.set(localStorage.getItem('secret') ?? fallback.secret);
secret.subscribe(value => localStorage.setItem('secret', value));