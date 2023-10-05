import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {User} from "../../../models/User";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  signup_reset_btn: boolean = false;

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
      firstName: ['Pritam', [Validators.required]],
      lastName: ['Jadge', [Validators.required]],
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
    this.signup_reset_btn = true;

    const {userName, firstName, lastName, emailId, password, role} = formData;
    const username = `${firstName} ${lastName}`;
    console.log(username);

    const newUser = new User(userName, firstName, lastName, emailId, password, role);

    this._authService.signUp(newUser).subscribe({
      next: (resp) => {
        console.log(resp);
        Swal.fire({
          title: 'Confirmation Email Sent',
          text: 'Please check your email and click on the confirmation link to activate your account.',
          icon: 'success',
          allowOutsideClick: false, // Prevent closing on outside click
        }).then((result) => {
          if (result.isConfirmed) {
            this.navigateToLogin();
          }
        });
        //this.showSuccessMessage("User Sign Up Successfully..!");
      },
      error: (err) => {
        this.signup_reset_btn = false;
        console.log(err);
        let error = err.error.message.replace(/^Error:\s*!/, '');
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
