export class Email {

  /**
   * Constructor.
   */
  constructor(
    public emailTo: String,
    public subject: String,
    public text: String,
    public emailFrom: String,
    public emailCC: String,
  ) {

  }
}
