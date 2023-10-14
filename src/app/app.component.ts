import {Component, OnInit} from '@angular/core';
import {PageNotFoundService} from "./services/page-not-found.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isPageNotFound!: Observable<boolean>;

  constructor(private pageNotFoundService: PageNotFoundService) {
  }

  ngOnInit(): void {
    this.isPageNotFound = this.pageNotFoundService.getNavBarStatusOn404();
  }

}
