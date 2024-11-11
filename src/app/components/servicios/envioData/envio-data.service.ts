import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioDataService {
  private dataSubject = new BehaviorSubject<any>(null); // Inicializa con null
  private dataSubjectFiltrados = new BehaviorSubject<any>(null); // Inicializa con null

  data$ = this.dataSubject.asObservable(); // Observable para suscribirse
  dataFiltrado$ = this.dataSubjectFiltrados.asObservable(); // Observable para suscribirse


  envioFiltrados(filtrados: any){
    this.dataSubjectFiltrados.next(filtrados)
  }
  
  updateData(data: any) {
    this.dataSubject.next(data);
  }
  constructor() { }
}
