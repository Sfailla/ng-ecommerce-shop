import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Route, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { NxWelcomeComponent } from './nx-welcome.component'
import { MainContentComponent } from './shared/main-content/main-content.component'
import { SidebarComponent } from './shared/sidebar/sidebar.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { CategoryListComponent } from './pages/category/category-list/category-list.component'
import { BackButtonComponent } from '@nera/ui'
import { CategoryAddComponent } from './pages/category/category-add/category-add.component'
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component'
import { ProductListComponent } from './pages/product/product-list/product-list.component'
import { ProductAddComponent } from './pages/product/product-add/product-add.component'
import { ProductEditComponent } from './pages/product/product-edit/product-edit.component'
import { HelperFns } from '@nera/core'

import { CardModule } from 'primeng/card'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ToastModule } from 'primeng/toast'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ColorPickerModule } from 'primeng/colorpicker'
import { InputSwitchModule } from 'primeng/inputswitch'
import { DropdownModule } from 'primeng/dropdown'
import { EditorModule } from 'primeng/editor'
import { FileUploadModule } from 'primeng/fileupload'
import { RatingModule } from 'primeng/rating'
import { PaginatorModule } from 'primeng/paginator'

const routes: Route[] = [
  {
    path: '',
    component: MainContentComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/add', component: CategoryAddComponent },
      { path: 'categories/edit/:id', component: CategoryEditComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/add', component: ProductAddComponent },
      { path: 'products/edit/:id', component: ProductEditComponent }
    ]
  }
]

const UxModules = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  InputTextModule,
  InputNumberModule,
  InputTextareaModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  FileUploadModule,
  RatingModule,
  PaginatorModule
]

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    MainContentComponent,
    SidebarComponent,
    DashboardComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    BackButtonComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent
  ],
  imports: [
    ...UxModules,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
  ],
  providers: [MessageService, ConfirmationService, HelperFns],
  bootstrap: [AppComponent]
})
export class AppModule {}
