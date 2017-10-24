export class User {

  /**
   * constructor
   * @param email
   * @param password
   * @param position
   * @param firstName
   * @param lastName
   * @param agency
   * @param userRole
   */
  constructor (
      public email: String,
      public password: String,
      public position?: String,
      public firstName?: String,
      public lastName?: String,
      public agency?: String,
      public userRole?: String
  ) {}
}
