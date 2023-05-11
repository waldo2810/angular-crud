import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthInterceptorProvider } from './shared/interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent, DialogComponent, NavigationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
