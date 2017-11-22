// Trzymajcie prosze porządek
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './auth/register/register.component';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskerMaterialModule } from './tasker-material.module';

// Services
import { TokenService } from './auth/authentication/token.service';
import { AuthenticationService } from './auth/authentication/authentication.service';
import { UserService } from './users/user/user.service';
import { AlertService } from './alert/alert.service';

// Interceptors & others
import { JwtInterceptor } from './auth/interceptors/jwt-interceptor';
import { TokenInterceptor } from './auth/interceptors/token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './auth/guard/auth.guard';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TaskerMaterialModule,
    routing
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    TokenService,
    AuthenticationService,
    UserService,
    AlertService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
