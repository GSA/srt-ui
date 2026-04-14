export class Email {

  /**
   * constructor
   * @param emailTo
   * @param subject
   * @param text
   * @param emailFrom
   * @param emailCC
   */
  constructor (
      public emailTo: String,
      public subject: String,
      public text: String,
      public emailFrom?: String,
      public emailCC?: String
  ) {}
}
