// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  SERVER_URL: 'https://srt-server-staging.app.cloud.gov/api',
  EMAIL_NOTIFICATION: true,
  FILE_UPLOAD_API: 'http://srt-server-staging.app.cloud.gov/file/upload',
  USE_CLIENT_EMAIL: true,
  ENVIRONMENT: 'staging'
};
