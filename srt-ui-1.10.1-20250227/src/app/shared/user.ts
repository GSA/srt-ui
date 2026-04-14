// Kailun's adding
export class User {
  // user data record

  public id: String = '';
  public email: String = '';
  public password: String = '';
  public position?: String = '';
  public firstName?: String = '';
  public lastName?: String = '';
  public agency?: String = '';
  public userRole?: String = '';
  public tempPassword?: String = '';
  public creationDate?: String = '';

  /**
   * Constructor.
   */
  constructor(user?) {
    this.id = user ? ( (user._id) ? user._id : user.id) : '';
    this.email = user ? user.email : '';
    this.password = user ? user.password : '';
    this.position = user ? user.position : '';
    this.firstName = user ? user.firstName : '';
    this.lastName = user ? user.lastName : '';
    this.agency = user ? user.agency : '';
    this.userRole = user ? user.userRole : '';
    this.tempPassword = user ? user.tempPassword : '';
    this.creationDate = user ? user.creationDate : '';
  }
}
