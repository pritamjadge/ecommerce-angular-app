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

  showPassword: string = "password";
  signUpForm!: FormGroup;

  user: User | undefined;

  constructor(private _fb: FormBuilder,
              private _authService: AuthenticationService,
              private _toastr: ToastrService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      'firstName': ['Pritam', [Validators.required]],
      'lastName': ['Jadge', [Validators.required]],
      'emailId': ['pritam.jadge@gmail.com', [Validators.required, Validators.email]],
      'password': ['Pritam@1994', [Validators.required]],
      'confirmPassword': ['Pritam@1994', [Validators.required]],
      'role': [["user"]]
    })
  }

  signUp(formData: any): any {
    console.log(formData);
    if (!(formData.password === formData.confirmPassword))
      return false;

    let username = formData.firstName + " " + formData.lastName;

    this._authService.signUp(new User(username, formData.emailId, formData.password, formData.role)).subscribe({
      next: (resp) => {
        console.log(resp);
        this._router.navigate(['/login']).then();
        this._toastr.success("User Sign Up Successfully..!");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
