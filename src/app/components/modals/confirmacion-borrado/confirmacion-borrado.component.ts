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
    @Inject(MAT_DIALOG_DATA) public data: { message: string,tipoDeBorrado: Number,nombre: String }
  ) {}
  ngOnInit() {
  }

  onConfirm(): void {




    if (this.data.tipoDeBorrado === 1){
      console.log('voy a borrar estancia')

      this.http.delete('http://localhost:3000/estancias/'+this.data.message)
      .subscribe(); 
    }
    else{

      this.http.delete('http://localhost:3000/reservas/'+this.data.message)
      .subscribe(); 
    }
    window.location.reload();
  }

  onCancel(): void {
    // Cerramos el diálogo sin emitir un valor
    this.dialogRef.close(false);
  }
}
