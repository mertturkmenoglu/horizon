import ky from 'ky';
import { GetNewUploadUrlResponseDto, UploadImageType } from './dto';

const api = ky.create({
  credentials: 'include',
  prefixUrl: process.env.NEXT_PUBLIC_API ?? '',
});

export default api;

export async function uploadImages(
  files: File[],
  type: UploadImageType
): Promise<string[]> {
  const urls: string[] = [];
  for (const element of files) {
    const file = element;
    const res = await api
      .get(`uploads/new-url?type=${type}&count=1&mime=${file.type}`)
      .json<{ data: GetNewUploadUrlResponseDto[] }>();
    const url = res.data[0].Url;

    try {
      const r = await fetch(url, {
        method: 'PUT',
        body: file,
      });
      if (r.ok) {
        urls.push(url);
      }
    } catch (err) {}
  }

  for (let i = 0; i < urls.length; i++) {
    urls[i] = urls[i].split('?')[0];
  }

  return urls;
}

export const status = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,

  OK: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInfo: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  IMUsed: 226,

  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  _: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,

  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  RequestEntityTooLarge: 413,
  RequestURITooLong: 414,
  UnsupportedMediaType: 415,
  RequestedRangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  Teapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,

  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
} as const;
