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

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'mis-gimnasios', component: MisGimnasiosComponent}
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
    MisGimnasiosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
