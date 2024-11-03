import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'Page', component: BodyComponent }, // Ruta para '/Page'
  { path: 'login', component: LoginComponent }, // Ruta para '/Page'
  
  { path: '', redirectTo: '/Page', pathMatch: 'full' }, // Redirección opcional a la página por defecto
  { path: '**', redirectTo: '/Page' } // Manejo de rutas no encontradas


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
