import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MainComponent } from './components/pages/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/utilities/sidebar/sidebar.component';
import { NavbarComponent } from './components/utilities/navbar/navbar.component';
import { FooterComponent } from './components/utilities/footer/footer.component';
import { AlertComponent } from './components/utilities/alert/alert.component';
import { CardMainComponent } from './components/utilities/card-main/card-main.component';
import { MisGimnasiosComponent } from './components/pages/mis-gimnasios/mis-gimnasios.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guard/guard';
import { FormGimnasioComponent } from './components/utilities/form-gimnasio/form-gimnasio.component';
import { GimnasioComponent } from './components/pages/gimnasio/gimnasio.component';
import { Gimnasio } from './models/gimnasio';
import { PlanesComponent } from './components/pages/planes/planes.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { FormPlanesComponent } from './components/utilities/form-planes/form-planes.component';
import { MiCuentaComponent } from './components/pages/mi-cuenta/mi-cuenta.component';
import { NecesitoAyudaComponent } from './components/pages/necesito-ayuda/necesito-ayuda.component';
import { AdministrarSociosComponent } from './components/pages/administrar-socios/administrar-socios.component';
import { FormSociosComponent } from './components/utilities/form-socios/form-socios.component';
import { AuthInterceptorService } from './services/interceptor.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'mis-gimnasios', component: MisGimnasiosComponent, canActivate: [AuthGuard]},
  {path: 'gimnasio/:id', component: GimnasioComponent, canActivate: [AuthGuard]},
  {path: 'gimnasio/:id/planes', component: PlanesComponent, canActivate: [AuthGuard]},
  {path: 'gimnasio/:id/planes/:idplan', component: PlanesComponent, canActivate: [AuthGuard]},
  {path: 'gimnasio/:id/planes/agregar', component: PlanesComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:t', component: ResetPasswordComponent}, //Necesita guard? no boludo
  {path: 'mi-cuenta', component: MiCuentaComponent, canActivate: [AuthGuard]},
  {path: 'necesito-ayuda', component: NecesitoAyudaComponent},
  {path: 'gimnasio/:id/administrar-socios', component: AdministrarSociosComponent, canActivate: [AuthGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    CardMainComponent,
    MisGimnasiosComponent,
    RegisterComponent,
    FormGimnasioComponent,
    GimnasioComponent,
    PlanesComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    FormPlanesComponent,
    MiCuentaComponent,
    NecesitoAyudaComponent,
    AdministrarSociosComponent,
    FormSociosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
