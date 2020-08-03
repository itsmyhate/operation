export class UserToken {
  public accessToken: string;
  public refreshToken: string;
  public expiresIn: number;
  public time: number;
  public scope: string[];
  public tokenType: string;
  public cacheMark: string;

  constructor(options: {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    time?: number;
    scope?: string[];
    tokenType?: string;
    cacheMark?: string;
  } = {}) {
    this.accessToken = options.accessToken || '';
    this.refreshToken = options.refreshToken || '';
    this.expiresIn = !!options.expiresIn ? options.expiresIn : 0;
    this.time = !!options.time ? options.time : 0;
    this.scope = !!options.scope  ? options.scope : [];
    this.tokenType = options.tokenType || '';
    this.cacheMark = options.cacheMark || '';
  }
}
