import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BodyComponent } from './components/body/body.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BuscarPorFechaComponent } from './components/buscar-por-fecha/buscar-por-fecha.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { ListadoComponent } from './components/listado/listado.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmacionBorradoComponent } from './components/modals/confirmacion-borrado/confirmacion-borrado.component';
import { AgregarEstanciaComponent } from './components/modals/agregar-estancia/agregar-estancia.component';
import { MatInputModule } from '@angular/material/input';
import { ModificarEstanciaComponent } from './components/modals/modificar-estancia/modificar-estancia.component';
import { LoginComponent } from './components/login/login.component';
import { AgregarReservaComponent } from './components/modals/agregar-reserva/agregar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    BuscarPorFechaComponent,
    ListadoComponent,
    ConfirmacionBorradoComponent,
    AgregarEstanciaComponent,
    ModificarEstanciaComponent,
    LoginComponent,
    AgregarReservaComponent,
    
  ],
  imports: [
    FormsModule ,// Asegúrate de agregar FormsModule aquí

    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    CdkTableModule,
    MatExpansionModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule ,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTabsModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
