import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './containers/forms/forms.component';
import { ListComponent } from './containers/list/list.component';
import { LoginComponent } from './containers/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { IsAuthenticatedGuard } from 'src/app/shared/guard/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forms',
    component: FormsComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'forms/:id',
    component: FormsComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  declarations: [FormsComponent, ListComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    AngularMaterialModule,
  ],
})
export class CrudExampleModule {}
