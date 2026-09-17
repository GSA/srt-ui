export const environment = {
  production: false,
  // Local dev now points at the DEV API (was srt-server.app.cloud.gov — PROD!)
  // so local testing exercises dev data, incl. the new My Drafts feature.
  SERVER_URL: "https://srt-server-dev.app.cloud.gov/api",
  EMAIL_NOTIFICATION: true,
  FILE_UPLOAD_API: "http://srt-server.app.cloud.gov/file/upload",
  ART_API_SERVER:'https://art-api.app.cloud.gov',
  needToken: false,
  USE_CLIENT_EMAIL: true,
  ENVIRONMENT: "local",
  feature_flags: {
    estar: false,
  },

  // SERVER_URL: 'http://localhost:3000',
  // EMAIL_NOTIFICATION: true,
  // FILE_UPLOAD_API: 'http://localhost:3000/file/upload'
};
