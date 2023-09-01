import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn!: Observable<boolean>;
  userName!: Observable<string>;

  constructor(private authService: AuthenticationService, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLoggedInStatus();
    this.userName = this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
    this.toastrService.success('Logout Successfully!');
  }

}
