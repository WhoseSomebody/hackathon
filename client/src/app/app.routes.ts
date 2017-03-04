import { SubcategoryComponent } from './subcategory/subcategory.component';
import { CategoryComponent } from './category/category.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { 
    path: '',      
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home',  
    component: HomeComponent 
  },
  {
    path: 'category/:id', 
    component: CategoryComponent
  },
  {
    path: 'category/:categoryId/:subcategoryId',
    component: SubcategoryComponent
  },
  { 
    path: '**',    
    component: NoContentComponent 
  },
];
