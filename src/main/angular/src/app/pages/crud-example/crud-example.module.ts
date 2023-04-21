import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './containers/forms/forms.component';
import { ListComponent } from './containers/list/list.component';
import { LoginComponent } from './containers/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthguardGuard } from '../../shared/guard/authguard.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forms',
    component: FormsComponent,
  },
  {
    path: 'forms/:id',
    component: FormsComponent,
  },
];

@NgModule({
  declarations: [FormsComponent, ListComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
  ],
})
export class CrudExampleModule {}
