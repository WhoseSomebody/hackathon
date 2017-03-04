import {Component, Inject} from "@angular/core";

@Component({
  selector: 'main-navbar',
  templateUrl: './main-navbar.pug',
  styleUrls: ['./main-navbar.styl']
})
export class MainNavbarComponent {
  constructor(@Inject('mainCategories') private mainCategories) {
    console.log(mainCategories);
  }
}
