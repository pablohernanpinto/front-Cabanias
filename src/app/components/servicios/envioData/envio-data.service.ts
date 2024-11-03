import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioDataService {
  private dataSubject = new BehaviorSubject<any>(null); // Inicializa con null
  data$ = this.dataSubject.asObservable(); // Observable para suscribirse

  
  updateData(data: any) {
    this.dataSubject.next(data);
  }
  constructor() { }
}
