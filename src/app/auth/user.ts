export class User {
// user data record
      constructor (
          public email: String,
          public password: String,
          public position?: String,
          public firstName?: String,
          public lastName?: String,
          public agency?: String,

      ) {}
}
