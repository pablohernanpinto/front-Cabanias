import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  duracionPromedio: any;
  tarifaPromedio: any;
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ReportesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string,tipoDeBorrado: Number,nombre: String, formulario: any, accion:string}
  ) {}
  ngOnInit() {
    console.log(this.data.message)

    if(this.data.message == '1'){

      this.http.get(' http://localhost:3000/reporte/duracion-avg').subscribe((duracionPromedio: any) => {
        console.log(duracionPromedio)
        this.duracionPromedio = duracionPromedio
      });
    }
    if(this.data.message == '3'){

      this.http.get('http://localhost:3000/reporte/tarifa-avg').subscribe((tarifaPromedio: any) => {
        this.tarifaPromedio = tarifaPromedio
      });
    }



  }

}
