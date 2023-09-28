import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {User} from "../../../models/User";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _toastr: ToastrService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signUpForm = this._fb.group({
      userName: ['pritamjadge', [Validators.required]],
      firstName : ['Pritam', [Validators.required]],
      lastName : ['Jadge', [Validators.required]],
      emailId: ['pritam.jadge@gmail.com', [Validators.required, Validators.email]],
      password: ['Pritam@1994', [Validators.required]],
      confirmPassword: ['Pritam@1994', [Validators.required]],
      role: [['user']]
    });
  }

  signUp(formData: any): void {
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const { userName,firstName, lastName, emailId, password, role} = formData;
    const username = `${firstName} ${lastName}`;
    console.log(username);

    const newUser = new User(userName, firstName, lastName, emailId, password, role);

    this._authService.signUp(newUser).subscribe({
      next: (resp) => {
        console.log(resp);
        this.navigateToLogin();
        this.showSuccessMessage("User Sign Up Successfully..!");
      },
      error: (err) => {
        console.log(err);
        let error = err.error.message.replace(/^Error:\s*/, '');
        this.showErrorMessage(error);
      }
    });
  }

  navigateToLogin(): void {
    this._router.navigate(['/login']).then();
  }

  showSuccessMessage(message: string): void {
    this._toastr.success(message);
  }

  private showErrorMessage(error: string) {
    this._toastr.error(error);
  }
}
