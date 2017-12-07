import { ProjectAddComponent } from './project/project-add/project-add.component';
import { MilestoneComponent } from './milestone/milestone.component';
// Trzymajcie prosze porządek
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './auth/register/register.component';
import { YesNoModalComponent } from './modals/yes-no-modal/yes-no-modal.component';

// Modules
import { ProjectModule } from './project/project.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskerMaterialModule } from './tasker-material.module';
import { MilestoneModule } from './milestone/milestone.module';

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

// Swiper
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { MomentModule } from 'angular2-moment';
import { UsersFiltersService } from './task/shared/users-filters.service';
import { TaskService } from './task/shared/task.service';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    YesNoModalComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TaskerMaterialModule,
    MilestoneModule,
    ProjectModule,
    MomentModule,
    routing,
    SwiperModule.forRoot(SWIPER_CONFIG)
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
    UsersFiltersService,
    TaskService,
    AlertService,
    AuthGuard
  ],
  entryComponents: [
    YesNoModalComponent,
    ProjectAddComponent,
    MilestoneComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
