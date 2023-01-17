import { get, readable } from 'svelte/store';
import { CreateClient } from 'websocket-rpc/client';
import { connection, secret } from './settings';
import type { Contract } from './contract';

class WebSocketClient {

    private url: string = '';
    private token: string = '';
    private websocket?: Awaited<ReturnType<typeof CreateClient<Contract>>>;

    private async Hash(text: string): Promise<string> {
        const buffer = new TextEncoder().encode(text);
        const hash = await crypto.subtle.digest('SHA-256', buffer); // browser
        //const hash = await (await import('node:crypto')).subtle.digest('SHA-256', buffer); // node
        const bytes = new Uint8Array(hash);
        return bytes.reduce((hex, byte) => hex + ('00' + byte.toString(16)).slice(-2), '').toUpperCase();
    }

    public async Configure(url: string, secret: string): Promise<void> {
        this.url = url;
        this.token = await this.Hash(secret);
    }

    async Connect() {
        try {
            if(!this.websocket) {
                const uri = new URL(this.url);
                uri.searchParams.set('token', this.token);
                this.websocket = await CreateClient<Contract>(uri);
            }

            await new Promise<void>(async (resolve, reject) => {
                setTimeout(() => reject(new Error('Failed to connect to HakuNeko within the given timeout!')), 5000);
                switch(this.websocket!.readyState) {
                    case WebSocket.OPEN:
                        return resolve();
                    case WebSocket.CONNECTING:
                        this.websocket!.onopen = () => resolve();
                        return;
                    default:
                        reject(new Error(`Unsupported WebSocket Status: ${this.websocket!.readyState}`));
                }
            });
        } catch(error) {
            console.warn(error);
        }
    }

    async Disconnect() {
        this.websocket?.close();
        this.websocket = undefined;
    }

    public get Remote() {
        return this.websocket?.RPC;
    }
}

export const websocket = readable<WebSocketClient>(new WebSocketClient());

function configure() {
    console.log('Updating WebSocketClient:', get(connection), get(secret));
    get(websocket).Configure(get(connection), get(secret));
}

connection.subscribe(configure);
secret.subscribe(configure);
configure();