import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { AuthenticationGuard } from './components/login/Authentication.guard'
import { LogoutComponent } from './components/logout/logout.component';
import { SobreComponent } from './components/sobre/sobre.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'sobre', component: SobreComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  
  { path: '',   redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }