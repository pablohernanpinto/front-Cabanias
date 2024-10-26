import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EnvioDataService } from '../envio-data.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

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
  constructor(private fb: FormBuilder, 
    private http: HttpClient,
    private dataService: EnvioDataService,
    private router: Router,
    public sharedService: SharedService,

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


  onSubmit() {
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
    console.log(this.myForm.value,'estoo')
    console.log(this.enviar)
    this.data= this.enviar
    this.dataService.updateData(this.enviar);
  }
  
  limpiarFiltro(){
    window.location.reload();

  }

  agregar(){
    console.log('aqui')
  }


  ngOnInit() {
    const url = 'http://localhost:3000/estancias';
    this.http.get(url).subscribe((data: any) => {
      this.data = data
      console.log(this.data,'aquiii')
      this.dataService.updateData(this.data);

    });
  }
}
