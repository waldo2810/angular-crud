import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class AngularMaterialModule {}
