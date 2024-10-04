import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListadoComponent } from './components/listado/listado.component';
import { BodyComponent } from './components/body/body.component';

const routes: Routes = [
  { path: '', component: BodyComponent }, // Ruta por defecto
  { path: 'listado', component: ListadoComponent }, // Ruta para About
  //{ path: 'Buscar', component: PageComponent  }, // ADMIN + USUARIO PRIVILEGIO 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
