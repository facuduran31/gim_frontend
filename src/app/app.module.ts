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
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'mis-gimnasios', component: MisGimnasiosComponent, canActivate: [AuthGuard]},
  {path: 'gimnasio/:id', component: GimnasioComponent, canActivate: [AuthGuard]},
  {path: 'gimnasio/:id/planes', component: PlanesComponent, canActivate: [AuthGuard]},
  {path: 'gimnasio/:id/planes/agregar', component: FormPlanesComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:t', component: ResetPasswordComponent}, //Necesita guard?
  {path: 'mi-cuenta', component: MiCuentaComponent, canActivate: [AuthGuard]},
  {path: 'necesito-ayuda', component: NecesitoAyudaComponent}
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
    NecesitoAyudaComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
