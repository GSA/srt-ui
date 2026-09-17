export const environment = {
  // Drives enableProdMode() in main.ts. Must stay true here: without it Angular
  // runs its development-mode change-detection checks in production.
  production: true,
  SERVER_URL: 'https://srt-server.app.cloud.gov/api',
  EMAIL_NOTIFICATION: true,
  // https, not http — a page served over TLS cannot call a plaintext endpoint
  // (browsers block it as mixed content).
  FILE_UPLOAD_API: 'https://srt-server.app.cloud.gov/file/upload',
  ART_API_SERVER:'https://art-api.app.cloud.gov',
  USE_CLIENT_EMAIL: true,
  ENVIRONMENT: 'prod',
  feature_flags: {
    estar: false
  }
  // SERVER_URL: 'http://localhost:3000',
  // EMAIL_NOTIFICATION: true,
  // FILE_UPLOAD_API: 'http://localhost:3000/file/upload'

};
