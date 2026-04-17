declare module '@networld-to/fediverse-helper' {
  export default class FediverseAccount {
    handle: string;
    webfingerInfo: any;
    instanceInfo: any;
    accountInfo: any;

    constructor(handle: string);
    getHandleHost(): string;
    getWebfingerInfo(refresh?: boolean): Promise<any>;
    getInstanceHost(): Promise<string>;
    getInstanceInfo(refresh?: boolean): Promise<any>;
    getAccountInfo(refresh?: boolean): Promise<any>;
    getOutboxPosts(): Promise<any[]>;
  }
}
