import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/components/servicios/sharedService/shared.service';
import { AuthService } from '../servicios/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEstanciaComponent } from '../modals/agregar-estancia/agregar-estancia.component';
import { AgregarUsuarioComponent } from '../modals/agregar-usuario/agregar-usuario.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent {

  isChecked:boolean = true;

  constructor(private router: Router,
              public dialog: MatDialog,

              public sharedService: SharedService,
              public authService: AuthService,
              
  ){

  }
  inicio(){
    this.router.navigate(['/'])
  }
  onToggle(event: MatSlideToggleChange) {
    this.sharedService.isChecked = event.checked; // Actualiza la variable del servicio
  }

  cerrarSesion(){
    this.authService.logout()
    this.router.navigate(['/login']);
  }

  agregarUsuario(){
      this.dialog.open(AgregarUsuarioComponent);
  }
  
}
