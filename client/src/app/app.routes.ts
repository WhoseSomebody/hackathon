import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'video', loadChildren: './video-page/video-page.module#VideoPageModule'},
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule'},
  { path: '**',    component: NoContentComponent },
];
