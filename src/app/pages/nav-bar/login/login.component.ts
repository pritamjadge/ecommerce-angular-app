import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../../services/authentication.service";
import {LoginResponse} from "../../../models/LoginResponse";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from "../../../services/token-storage.service";
import {BreadcrumbService} from "../../../services/breadcrumb.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginResponse!: LoginResponse;
  passwordStatus!: string;
  passwordShow!: boolean;
  showAlert!: string;
  alertErrorMessage!: string;

  loginForm!: FormGroup;

  constructor(private _fb: FormBuilder,
              private tokenStorage: TokenStorageService,
              private loginService: AuthenticationService,
              private router: Router,
              private toastrService: ToastrService,
              private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.clearBreadcrumb();

    this.loginForm = this._fb.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });

    this.passwordStatus = 'password';
    this.passwordShow = false;
    this.showAlert = 'none';
  }

  showHidePassword() {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passwordStatus = 'password';
    } else {
      this.passwordShow = true;
      this.passwordStatus = 'text';
    }
  }

  onSubmit() {

    this.loginResponse = new LoginResponse(this.loginForm.value['username'], this.loginForm.value['password']);

    if (!(this.loginResponse.username === null || this.loginResponse.username === "") && !(this.loginResponse.password ===
      null || this.loginResponse.password === "")) {
      this.loginService.login(this.loginResponse).subscribe({
        next: (resp) => {
          console.log(JSON.stringify(resp));
          const token = resp.tokenType + " " + resp.accessToken;
          this.tokenStorage.setToken(token);
          this.tokenStorage.setRefreshToken(resp.refreshToken);
          this.loginService.setLocalStorageData(resp);
          this.loginService.setLoggedInStatus(true);
          this.loginService.setFirstName(resp.firstName);
          this.toastrService.success('You have logged in successfully!');
          this.router.navigate(['/dashboard']).then();
        },
        error: (err) => {
          console.log(err.error);
          this.showAlert = 'block';
          if (err.status == 0) {
            this.alertErrorMessage = "Connection not established";
          } else if (err.status == 401 && err.error.message === "Bad credentials") {
            this.alertErrorMessage = err.error.message;
          } else if (err.status == 401 && err.error.message === "User is disabled") {
            this.alertErrorMessage = "Account is not activated.";
          }
        }
      })
    }
    return false;
  }

}
