import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { CarteiraComponent } from './components/carteira/carteira.component'
import { LoginComponent } from './components/login/login.component'
import { AuthenticationGuard } from './components/login/Authentication.guard'
import { LogoutComponent } from './components/logout/logout.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { AssinaturaComponent } from './components/assinatura/assinatura.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'carteira', component: CarteiraComponent, canActivate: [AuthenticationGuard] },
  { path: 'sobre', component: SobreComponent },
  { path: 'assinatura', component: AssinaturaComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  
  { path: '',   redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }