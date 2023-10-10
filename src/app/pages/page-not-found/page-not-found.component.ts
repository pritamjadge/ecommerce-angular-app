import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  homePage!: String;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.homePage = this.authService.isLoggedIn() ? 'dashboard' : 'login';
  }

}
