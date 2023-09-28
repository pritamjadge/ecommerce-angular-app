export class User {
  username: string;
  firstName : String;
  lastName : String;
  email: string;
  password: string;
  role: string[];


  constructor(username: string, firstName: string, lastName : string, email: string, password: string, role: string[]) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }

}
