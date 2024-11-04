import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usuarios'; // Cambia esto a la URL de tu backend

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<any> {
    console.log(correo,contrasena,'estoy llegando aqui')
    return this.http.post<any>(`${this.apiUrl}/login`, { correo, contrasena });
  }

  saveRol(rol:string){
    localStorage.setItem('rol',rol)
  }
  getRol(): string | null {
    return localStorage.getItem('rol')
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Agrega lógica para verificar la expiración del token si es necesario
  }
}
