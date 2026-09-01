/**
 * Authorization headers for raw fetch() calls.
 *
 * Angular's HttpClient gets its bearer token from TokenInterceptor, but raw
 * fetch() bypasses the interceptor entirely. Any fetch() to an authenticated
 * SRT endpoint has to attach the header itself, and this is the one place that
 * knows how.
 *
 * Prefer HttpClient where practical. fetch() is used in a few places for
 * streaming responses and multipart uploads, which is where this helper applies.
 *
 * @param extra additional headers to merge, for example Content-Type. Omit
 *              Content-Type entirely when sending FormData so the browser can
 *              set the multipart boundary itself.
 */
export function authHeaders (extra: Record<string, string> = {}): Record<string, string> {
  const token = localStorage.getItem('token')
  return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra }
}
