import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './components/servicios/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'page',component: BodyComponent, canActivate: [authGuard]},

  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirección a la página de inicio de sesión por defecto
  { path: '**', redirectTo: '/login' } // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
