import { Component } from '@angular/core';
import { EnvioDataService } from '../envio-data.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  constructor(private dataService: EnvioDataService){

  }

  datosRecibidos:any = []
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.datosRecibidos = data; // Actualiza con los datos recibidos
    });
    console.log(this.datosRecibidos,'recividos')
  }
}
