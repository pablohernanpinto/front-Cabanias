import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnvioDataService } from '../servicios/envioData/envio-data.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/components/servicios/sharedService/shared.service';
import { AgregarEstanciaComponent } from '../modals/agregar-estancia/agregar-estancia.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buscar-por-fecha',
  templateUrl: './buscar-por-fecha.component.html',
  styleUrls: ['./buscar-por-fecha.component.css'],
})




export class BuscarPorFechaComponent {

  data: any = [];
  myForm: FormGroup; // Define la variable myForm como FormGroup
  camasIndividualesList = [0,1,2,3];
  camasDoblesList = [0,1,2];
  enviar:any = []
  reservas: any;
  idFechaAceptada:any = [];
  constructor(private fb: FormBuilder, 
    private http: HttpClient,
    private dataService: EnvioDataService,
    private router: Router,
    public sharedService: SharedService,
    public dialog: MatDialog
  ) {
    this.myForm = this.fb.group({
      fecha_inicio: [''], // Ajustado a "fecha_inicio"
      fecha_termino: [''], // Ajustado a "fecha_termino"
      camas_individuales: [[]], // Inicialización correcta
      camas_dobles: [[]], // Inicialización correcta
      cocina: [false],
      calefont: [false],
    });
  }

  arregloData(){
    if (this.myForm.value.camas_individuales == ''){
      this.myForm.value.camas_individuales = [0]
    }
  }

    // Función para verificar si hay superposición de fechas
  verificarSuperposicion(fechaInicio1: Date, fechaFin1: Date, fechaInicio2: Date, fechaFin2: Date): boolean {

    const inicio1 = new Date(fechaInicio1);
    const fin1 = new Date(fechaFin1);
    const inicio2 = new Date(fechaInicio2);
    const fin2 = new Date(fechaFin2);
    return inicio1 <= fin2 && inicio2 <= fin1;
  }


  retirarFechasNoAptas(){
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.verificarSuperposicion(this.myForm.value.fecha_inicio, this.myForm.value.fecha_termino, this.reservas[i].fecha_inicio, this.reservas[i].fecha_fin) === true) {
        this.idFechaAceptada.push(this.reservas[i].id_estancia);
        console.log(this.idFechaAceptada);
      }      
    }
    const estanciasFiltradas = this.data.filter((data: { id_estancia: any; }) => !this.idFechaAceptada.includes(data.id_estancia));
    this.data = estanciasFiltradas  
  }
  

  onSubmit() {



   // console.log(this.myForm.value.fecha_inicio)
    this.enviar = []
    //this.arregloData()
    let verificacion:boolean
    if(this.myForm.value.camas_individuales == ''){
      this.myForm.value.camas_individuales.push(0)
      this.myForm.value.camas_individuales.push(1)
      this.myForm.value.camas_individuales.push(2)
      this.myForm.value.camas_individuales.push(3)
      
    }
    if(this.myForm.value.camas_dobles==''){
      this.myForm.value.camas_dobles.push(0)
      this.myForm.value.camas_dobles.push(1)
      this.myForm.value.camas_dobles.push(2)

    }

    this.retirarFechasNoAptas()
   

    for (let i = 0; i < this.data.length; i++) {
      
      

      if(this.myForm.value.camas_individuales.includes(this.data[i].camas_individuales)){
        verificacion = true
      }
      else{
        verificacion = false
      }
      if(this.myForm.value.camas_dobles.includes(this.data[i].camas_dobles) && verificacion == true){
        verificacion = true
      }
      else{
        verificacion = false
      }
      if(this.myForm.value.cocina == this.data[i].cocina && verificacion == true){

        verificacion = true
      }
      else{
        verificacion = false
      }
      if(this.myForm.value.calefont == this.data[i].calefont && verificacion == true){
        verificacion = true
      }
      else{
        verificacion = false
      }
      if(verificacion == true){
        this.enviar.push(this.data[i])
        
      }

    }

    this.data= this.enviar

    //console.log(this.enviar,'esteeee esesssssesesse')
    this.dataService.updateData(this.enviar);
  }
  
  limpiarFiltro(){
    window.location.reload();

  }

  agregar(): void {
    const dialogRef = this.dialog.open(AgregarEstanciaComponent);
  }


  ngOnInit() {
    const url = 'http://localhost:3000/estancias';
    this.http.get(url).subscribe((data: any) => {
      this.data = data
      //console.log(this.data,'aquiii')
      this.dataService.updateData(this.data);

    });
    const urlRe = 'http://localhost:3000/reservas';
    this.http.get(urlRe).subscribe((data: any) => {
      this.reservas = data
     // console.log(this.reservas)

    });
  }
}
