// See => chrome.cookies.Cookie
type MapInterface<T> = {
    [key in keyof T]: T[key];
};

export type Contract = {
    SetCloudFlareBypass(userAgent: string, cookies: MapInterface<chrome.cookies.Cookie>[]): Promise<void>;
    CanLoadMediaContainerFromURL(url: string): Promise<boolean>;
    LoadMediaContainerFromURL(url: string): Promise<void>;
};