export class Email {
  constructor (
      public emailTo: String,
      public subject: String,
      public text: String,
      public emailFrom?: String,
      public emailCC?: String
  ) {}
}
