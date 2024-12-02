import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];

@Component({
  selector: 'app-informacion-de-pago',
  templateUrl: './informacion-de-pago.component.html',
  styleUrls: ['./informacion-de-pago.component.css']
})
export class InformacionDePagoComponent {
  pago: any[] = [];
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<InformacionDePagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string,tipoDeBorrado: Number,nombre: String, formulario: any, accion:string}
  ) {}


  ngOnInit() {
    const url = 'http://localhost:3000/pagos/';
    this.http.get(url).subscribe((data: any) => {
      console.log(data)
      console.log(this.data.message)
      const resultado = data.find((item: { id_reserva: number; }) => item.id_reserva === Number(this.data.message));
      console.log(resultado,'resultado')
      this.pago = [resultado]
      
    })
  }
  closeDialog() {
    window.location.reload();
  }
  confrimarPago(){
      this.http.put('http://localhost:3000/reservas/confirmar/'+this.data.message,{}).subscribe(
        (data) => {
        
          alert('SE HA CONFIRMADO PAGO');

          window.location.reload(); 
        },
        (error) => {

          console.error(error);
          alert('ERROR EN LA MODIFICACION');
          window.location.reload(); 
        }
      );  
    }
    
  

  displayedColumns: string[] = ['fecha_pago', 'monto_pago', 'metodo_pago', 'estado'];

}
