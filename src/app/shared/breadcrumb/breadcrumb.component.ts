import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "../../services/breadcrumb.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems: string[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumb$.subscribe((breadcrumb) => {
      this.breadcrumbItems = breadcrumb;
    });
  }
}
