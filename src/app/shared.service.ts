import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isChecked: boolean = false; // Variable accesible desde cualquier componente
  constructor() { }
}
