type KeyedCookie<T = chrome.cookies.Cookie> = { [K in keyof T]: KeyedCookie<T[K]> };

export type Contract = {
    SetCloudFlareBypass(userAgent: string, cookies: KeyedCookie[]): Promise<void>;
    CanLoadMediaContainerFromURL(url: string): Promise<boolean>;
    LoadMediaContainerFromURL(url: string): Promise<void>;
};