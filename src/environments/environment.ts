// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // SERVER_URL: 'http://localhost:3000',
  SERVER_URL: 'http://ec2-54-145-198-134.compute-1.amazonaws.com:3000',
  EMAIL_NOTIFICATION: true,
  FILE_UPLOAD_API: 'http://localhost:3000/file/upload'
};
