import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AgregarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private formBuilder: FormBuilder
  ) {}

  formulario = this.formBuilder.group({
    nombre:'', 
    apellido:'', 
    rut:'', 
    correo:'', 
    contrasena:'', 
    rol: ''});

  // Inicializar el formulario
  closeDialog() {
    window.location.reload();
  }
  agregarUsuario() {
    if (this.formulario.valid) {
      console.log(this.formulario.value)

      this.http.post('http://localhost:3000/usuarios/registrar', this.formulario.value).subscribe(
        (data) => {
          alert('SE HA REGISTRADO USUARIO');
          console.log(data);
          window.location.reload();
        },
        (error) => {
          console.log(this.formulario.value);
          alert('ERROR AL REGISTRAR USUARIO');
          console.error(error);
        }
      );
    } else {
      alert('INGRESO NO VALIDO');
    }
  }
  ngOnInit() {




  };

};




