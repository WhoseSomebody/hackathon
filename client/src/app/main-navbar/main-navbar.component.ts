import { Router } from '@angular/router';
import {Component, Inject} from "@angular/core";

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.pug',
  styleUrls: ['./main-navbar.styl']
})
export class MainNavbarComponent {
  constructor(@Inject('mainCategories') private mainCategories, private router: Router) {
    console.log(mainCategories);
  }

  onSelect(id){
    this.router.navigate(['category', id]);
  }
}
