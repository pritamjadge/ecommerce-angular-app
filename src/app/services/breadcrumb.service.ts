import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbs: Array<{ label: string, url: string }> = [];

  getBreadcrumbs(): Array<{ label: string, url: string }> {
    return this.breadcrumbs;
  }

  addBreadcrumb(label: string, url: string): void {
    this.breadcrumbs.push({ label, url });
  }

  clearBreadcrumbs(): void {
    this.breadcrumbs = [];
  }

}
