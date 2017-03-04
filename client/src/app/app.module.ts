import { SubcategoryComponent } from './subcategory/subcategory.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesService } from './shared/categories.service';
import { AuthService } from './shared/auth.service';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { mainCategories } from './shared/main-categories';
import { FilteredSearchComponent } from './filtered-search/filtered-search.component';
import { VideoPageModule } from './video-page/video-page.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { MaterialModule } from '@angular/material';

import 'hammerjs';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
// Application wide providers
const APP_PROVIDERS = [
  {
    provide: 'mainCategories',
    useValue: mainCategories
  },
  AuthService,
  CategoriesService,
  {
    provide: 'apiName',
    useValue: 'http://localhost:4000'
  }
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    FilteredSearchComponent,
    MainNavbarComponent,
    CategoryComponent,
    SubcategoryComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    VideoPageModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {


}
