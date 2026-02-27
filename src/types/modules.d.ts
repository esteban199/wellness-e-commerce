// Temporary type declarations until devDependencies are properly installed
// Run `npm install` to install all devDependencies including @types/jsonwebtoken

declare module 'jsonwebtoken' {
  export interface SignOptions {
    expiresIn?: string | number;
    algorithm?: string;
    issuer?: string;
    audience?: string;
  }

  export interface VerifyOptions {
    algorithms?: string[];
    issuer?: string;
    audience?: string;
  }

  export interface JwtPayload {
    [key: string]: unknown;
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
  }

  export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: string | Buffer,
    options?: SignOptions
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions
  ): JwtPayload | string;

  export function decode(
    token: string,
    options?: { complete?: boolean; json?: boolean }
  ): null | JwtPayload | string;
}
