import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-borrado',
  templateUrl: './confirmacion-borrado.component.html',
  styleUrls: ['./confirmacion-borrado.component.css']
})
export class ConfirmacionBorradoComponent {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ConfirmacionBorradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string,tipoDeBorrado: Number,nombre: String, formulario: any}
  ) {}
  ngOnInit() {
  }

  onConfirm(): void {
    if (this.data.tipoDeBorrado === 1){
      console.log('voy a borrar estancia')

      this.http.delete('http://localhost:3000/estancias/'+this.data.message)
      .subscribe(); 
    }
    if ((this.data.tipoDeBorrado === 2)){

      this.http.delete('http://localhost:3000/reservas/'+this.data.message)
      .subscribe(); 
    }
    if ((this.data.tipoDeBorrado === 3)){

      console.log(this.data.formulario.value,'esta es la impresion')

      if (this.data.formulario) {
        // Aquí puedes añadir la lógica para guardar la reserva
        this.http.post('http://localhost:3000/reservas', this.data.formulario.value).subscribe(
          (data) => {
            alert('SE HA REGISTRADO LA RESERVA');
            console.log(data);
            window.location.reload();
          },
          (error) => {
            console.log(this.data.formulario);
            alert('ERROR AL REGISTRAR LA RESERVA');
            console.error(error);
          }
        );
      } else {
        alert('INGRESO NO VALIDO');
      }
    }
    window.location.reload();
  }

  onCancel(): void {
    // Cerramos el diálogo sin emitir un valor
    this.dialogRef.close(false);
  }
}
